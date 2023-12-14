import { Box, Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/UserSlice";
const Header = () => {
    const {user} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <Box
        height="50px"
        backgroundColor="#03c6fc"
        padding="0 20px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        >
            <Box fontSize="20px" color="#fff" fontWeight="bold">
                <Link to="/home" style={{textDecoration: 'none'}}>Task up</Link>
            </Box>
            <Box display="flex" alignItems="center" gap="10px">
                <Select sx={{boxShadow: 'none', '.MuiOutlinedInput-notchedOutline' : {border: 0}}}
                value={user.name}>
                    <MenuItem value={user.name} disabled>{user.name}</MenuItem>
                    <MenuItem value={user.status} disabled>User Status : {user.status}</MenuItem>
                    <MenuItem onClick={()=> {dispatch(setLogout()); navigate('/')}}>Logout</MenuItem>
                </Select>
            </Box>
        </Box>
    );
};
export default Header;
