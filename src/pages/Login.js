/* eslint-disable no-mixed-operators */
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
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
    MenuItem
} from "@mui/material";
import axios from '../services/api'
import { setLogin } from "../redux/UserSlice";

const initialRegisterValues = {
    name: "",
    email: "",
    password: "",
    role:""
};

const initialLoginValues = {
    email: "",
    password: "",
    role:""
};

const registerSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Not valid").required("Required"),
    password: Yup.string().required('Required').min(5, 'Password must be at least 5 characters long'),
    role: Yup.string().required('Required')
});

const loginScehma = Yup.object().shape({
    email: Yup.string().email("Not valid").required("Required"),
    password: Yup.string().required("Required"),
    role: Yup.string().required('Required')
});

const Login = () => {
    const [page, setPage] = useState("login");
    const isLogin = page === "login";
    const isRegister = page === "register";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNotMobile = useMediaQuery("(min-width:768px)");

    const handleLogin = (values, onSubmitProps) => {
        axios.post('/auth/login', values)
            .then((res) => {
                onSubmitProps.resetForm();
                dispatch(setLogin(res.data.user));
                if (res.data.user.role === 'admin') {
                navigate('/admin/users');
                } else if (res.data.user.status === 'active') {
                dispatch(setLogin(res.data.user));
                navigate('/home');
                } else {
                alert('User is inactive. Cannot log in.');
                }
            })
            .catch((error) => {
                if (error.response && (error.response.status === 404 || error.response.status === 401)) {
                console.error('Resource not found for the specified role:', error.config.url);
                alert('Data Not Found');
                } else {
                console.error('An error occurred:', error.message);
                }
            });
        };

    const handleRegister = (values , onSubmitProps) => {
        let formData = new FormData()
        for(const property of Object.keys(values)) {
            formData.append(property , values[property])
        }
    axios.post('/auth/register' , formData).then((res) => {
        onSubmitProps.resetForm()
        setPage('login')
    }).catch((error) => {
        if (error.response && error.response.status === 500) {
            console.error('Resource not found for the specified role:', error.config.url);
            alert('Email is already in use')
        } else {
            console.error('An error occurred:', error.message);
        }})
    }

    const handleForm = (values, onSubmitProps) => {
        if(isLogin) handleLogin(values, onSubmitProps)
        if(isRegister) handleRegister(values, onSubmitProps)
    };

    return (
        <Formik
        initialValues={isLogin ? initialLoginValues : initialRegisterValues}
        validationSchema={isLogin ? loginScehma : registerSchema}
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
                    <>
                    <TextField
                    label="Enter name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    />
                    </>
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
                autoComplete="current-password"
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
