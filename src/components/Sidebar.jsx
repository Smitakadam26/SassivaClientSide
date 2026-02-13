import { useState, useEffect } from "react";
import {
    Box,
    Avatar,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    Card,
    CardContent,
    Divider,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../assests/images/logo.png";
import { getProfile } from '../services/api';


export default function Sidebar({setActiveTab,setMobileOpen}) {
    const navigate = useNavigate();
    const {logout} =useAuth();
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        getProfile().then((data) => {
            setProfile(data);
        });
    }, []);
    const handleLogout = () => {
        logout();
        navigate('/');
    }
    return (
        <>
            <Box>
                <img src={Logo} alt="logo" height={75} />
            </Box>

            <Card sx={{ borderRadius: 3, background: "#f9e5e5ff" }}>
                <CardContent sx={{ textAlign: "center" }}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            margin: "auto",
                            mb: 2,
                            bgcolor: "primary.main"
                        }}
                    >
                        {profile?.name?.[0]}
                    </Avatar>

                    <Typography variant="h6">{profile?.name}</Typography>
                </CardContent>

                <Divider />

                <List>
                    <ListItemButton onClick={() => {setActiveTab("accountInfo");setMobileOpen(false)}}>
                        <ListItemText primary="Account" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {setActiveTab("orders");setMobileOpen(false)}}>
                        <ListItemText primary="My Orders" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {setActiveTab("wishList");setMobileOpen(false)}}>
                        <ListItemText primary="Wishlist ❤️" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {setActiveTab("address");setMobileOpen(false)}}>
                        <ListItemText primary="Addresses" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {setActiveTab("security");setMobileOpen(false)}}>
                        <ListItemText primary="Security" />
                    </ListItemButton>

                    <Divider sx={{ my: 1 }} />

                    <ListItemButton onClick={handleLogout}>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </List>
            </Card>
        </>
    )
}

