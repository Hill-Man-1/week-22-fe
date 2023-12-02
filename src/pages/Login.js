/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Typography,
    Button,
    useMediaQuery,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import axios from "../services/api";
import { setLogin } from "../redux/UserSlice";

const initialRegisterValues = {
    name: "",
    email: "",
    password: "",
    role: ""
};

const initialLoginValues = {
    email: "",
    password: "",
    role: ""
};

const registerSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Not valid").required("Required"),
    password: Yup.string().required("Required").min(5, "Password must be at least 5 characters long"),
    role: Yup.string().required("Required"),
});

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Not valid").required("Required"),
    password: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
});

const Login = () => {
    const [page, setPage] = useState("login");
    const isLogin = page === "login";
    const isRegister = page === "register";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNotMobile = useMediaQuery("(min-width:768px)");

    const handleLogin = (values, onSubmitProps) => {
        axios.post('/auth/login', values, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            onSubmitProps.resetForm();
            dispatch(setLogin(res.data.user));
    
            if (res.data.user.role === 'admin') {
                navigate('/admin/users');
            } else if (res.data.user.status === 'active') {
                navigate('/home');
            } else {
                alert('User is inactive. Cannot log in.');
            }
        })
        .catch((error) => {
            if (error.response) {
                console.error('Response Error:', error.response.data);
                console.error('Response Status:', error.response.status);
            } else if (error.request) {
                console.error('Request Error:', error.request);
            } else {
                console.error('Error Message:', error.message);
            }
            alert('Error occurred. Please try again.');
        });
        
    };
    
    
    

    const handleRegister = async (values, onSubmitProps) => {
        try {
            const formData = new FormData();
            for (const property of Object.keys(values)) {
                formData.append(property, values[property]);
            }

            const response = await axios.post('http://localhost:5000/auth/register', formData, { withCredentials: true });

            onSubmitProps.resetForm();
            setPage('login');
        } catch (error) {
            handleApiError(error, 'Email is already in use');
        }
    };

    const handleApiError = (error, alertMessage) => {
        if ((error.response && error.response.status === 404) || (error.response && error.response.status === 401)) {
            const requestUrl = error.config?.url || 'unknown';
            console.error(`Resource not found for the specified role: ${requestUrl}`);
            alert(alertMessage);
        } else {
            console.error('An error occurred:', error.message);
        }
    };

    const handleForm = (values, onSubmitProps) => {
        if (isLogin) {
            handleLogin(values, onSubmitProps);
        }
        if (isRegister) {
            handleRegister(values, onSubmitProps);
        }
    };

    return (
        <Formik
            initialValues={isLogin ? initialLoginValues : initialRegisterValues}
            validationSchema={isLogin ? loginSchema : registerSchema}
            onSubmit={handleForm}
        >
            {({
                handleSubmit,
                handleBlur,
                touched,
                setFieldValue,
                values,
                handleChange,
                resetForm,
                errors,
            }) => (
                <Box p="2rem 0" m="2rem auto" width={isNotMobile ? "50%" : "90%"}>
                    <Typography textAlign="center" mb="2rem">
                        Welcome to Taskup
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" gap="30px">
                            {isRegister && (
                                <TextField
                                    label="Enter name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.name) && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            )}
                            <TextField
                                label="Enter email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                label="Enter password"
                                name="password"
                                value={values.password}
                                type="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                            />
                            <InputLabel htmlFor="role-select">Select Role</InputLabel>
                            <Select
                                label="Select Role"
                                name="role"
                                id="role-select"
                                value={values.role}
                                onChange={(e) => {
                                    const selectedRole = e.target.value;
                                    if (selectedRole === 'user' || selectedRole === 'admin') {
                                        handleChange(e);
                                    } else {
                                        console.error('Invalid role selected');
                                    }
                                }}
                                onBlur={handleBlur}
                                error={Boolean(touched.role) && Boolean(errors.role)}
                            >
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </Select>
                            <Button type="submit" m="2rem 0" background="#00d5fa">
                                {isLogin ? "Login" : "Register"}
                            </Button>
                            <Typography
                                onClick={() => {
                                    setPage(isLogin ? "register" : "login");
                                    resetForm();
                                }}
                                variant="h6"
                                textAlign="center"
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                {isLogin ? (
                                    <>Not a user, go to register</>
                                ) : (
                                    <>Already a user, go to login</>
                                )}
                            </Typography>
                        </Box>
                    </form>
                </Box>
            )}
        </Formik>
    );
};

export default Login;
