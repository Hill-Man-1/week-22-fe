import React, { useEffect, useState } from "react";
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Header from "./Header";
import axios from "../services/api";

const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/admin/users");
            setUsers(response.data.user);
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    };

    const handleEdit = async (userId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        await axios.put(`/admin/users/${userId}`, {
            status: newStatus,
        });
        console.log(`Successfully toggled user status for ID ${userId} to ${newStatus}`);

        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user._id === userId ? { ...user, status: newStatus } : user
            )
            );
        } catch (error) {
            console.error(`Error toggling user status for ID ${userId}:`, error.message);
        }
    };

    const handleEditRole = async (userId, currentRole) => {
        try {
            const newRole = currentRole === 'user' ? 'admin' : 'user';
        await axios.put(`/admin/users/${userId}`, {
            role: newRole,
        });
        console.log(`Successfully toggled user role for ID ${userId} to ${newRole}`);

        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user._id === userId ? { ...user, role: newRole } : user
            )
            );
        } catch (error) {
            console.error(`Error toggling user status for ID ${userId}:`, error.message);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`/admin/users/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            console.log(`Successfully deleted user with ID: ${userId}`);
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
                    <Button variant="outlined" onClick={() => handleEditRole(user._id, user.role)}>
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
