import React, { useEffect, useState } from "react";
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Header from "./Header";
import axios from "../services/api";


const Admin = () => {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState('');

    const getCookie = (name) => {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                console.log('Token from cookie:', cookieValue);
                return cookieValue;
            }
        }
        console.error('Token not found or invalid');
        return null;
    };

    useEffect(() => {
        const tokenFromCookie = getCookie('token');
        if (tokenFromCookie) {
            setToken(tokenFromCookie);
        } else {
            console.error('Token not found or invalid');
        }
    }, []);
    const fetchUsers = async () => {
        try {
            const tokenFromCookie = getCookie('token');
            if (!tokenFromCookie) {
                console.error('Token not found or invalid');
                return;
            }
    
            console.log('Token in fetchUsers:', tokenFromCookie);
            const response = await axios.get("/admin/users", {
                headers: {
                    Authorization: `Bearer ${tokenFromCookie}`,
                },
            });
    
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    };

    

    const handleEdit = async (userId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            await axios.put(`/admin/users/${userId}`, {
                status: newStatus,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(`Successfully toggled user status for ID ${userId} to ${newStatus}`);

            fetchUsers();
        } catch (error) {
            console.error(`Error toggling user status for ID ${userId}:`, error.message);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(`Successfully deleted user with ID: ${userId}`);

            fetchUsers();
        } catch (error) {
            console.error(`Error deleting user with ID ${userId}:`, error.message);
        }
    };


    return (
        <Box>
        <Header />
        <Container>
            <h1>All Users</h1>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((user) => (
                <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                    <Button variant="outlined" onClick={() => handleEdit(user._id, user.role)}>
                        Edit Role
                    </Button>
                    <Button variant="outlined" onClick={() => handleEdit(user._id, user.status)}>
                        Edit Status
                    </Button>
                    <Button variant="outlined" onClick={() => handleDelete(user._id)}>
                        Delete
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Container>
    </Box>
    );
};

export default Admin;
