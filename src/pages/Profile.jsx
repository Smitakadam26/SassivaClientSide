import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Avatar,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Card,
  CardContent,
  Button,
  Divider,
  IconButton,
  CardMedia
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../assests/images/logo2.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getProfile } from '../services/api';
import EditProfile from "./EditProfile";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WcIcon from '@mui/icons-material/Wc';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from "@mui/icons-material/Edit";
function InfoRow({ icon, label, value }) {
  return (
    <Grid item xs={12} sm={6}>
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <Box sx={{ color: "primary.main" }}>{icon}</Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
          <Typography fontWeight={500}>
            {value}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
function Orders() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>My Orders</Typography>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography>Order </Typography>
            <Typography color="text.secondary">
              Status: Delivered
            </Typography>
            <Button size="small" sx={{ mt: 1 }}>View Details</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography>Order </Typography>
            <Typography color="text.secondary">
              Status: Shipped
            </Typography>
            <Button size="small" sx={{ mt: 1 }}>View Details</Button>
          </CardContent>
        </Card>

      </CardContent>
    </Card>
  );
}
function Addresses() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>Saved Addresses</Typography>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography>Home</Typography>
            <Typography color="text.secondary">
              221B Baker Street, London
            </Typography>
            <Button size="small" sx={{ mt: 1 }}>Edit</Button>
          </CardContent>
        </Card>

        <Button variant="contained">Add New Address</Button>
      </CardContent>
    </Card>
  );
}
function Security() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>Security Settings</Typography>

        <Typography>Email Verified ✔</Typography>

        <Button variant="outlined" sx={{ mt: 2 }}>
          Change Password
        </Button>
      </CardContent>
    </Card>
  );
}
function WishList() {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    exists
      ? setWishlist(wishlist.filter((item) => item._id !== product._id))
      : setWishlist([...wishlist, product]);
  };
  const [hovered, setHovered] = useState(false);
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Wishlist
        </Typography>

        <Grid container spacing={2}>
          {wishlist.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  position: "relative",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)"
                  }
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <IconButton
                  onClick={() => toggleWishlist(product)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "white",
                    zIndex: 1
                  }}
                >
                  <FavoriteIcon color="error" />

                </IconButton>

                <CardMedia
                  component="img"
                  height={200}
                  image={hovered === index && product.images[1] ? product.images[1] : product.images[0]}
                  alt={product.name}
                  sx={{
                    objectFit: "contain",
                    backgroundColor: "white"
                  }}
                />

                <CardContent>
                  <Typography fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {product.price}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </CardContent>
    </Card>
  );
}
function AccountInfo({ profile, onEdit }) {
  if (!profile) return null;

  return (
    <Box>
      <Typography variant="h5" p={2}>
        My Account
      </Typography>
      <Card
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: 4,
        }}
      >

        <Box
          sx={{
            background: "#9c444b",
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "white"
          }}
        >
          <Avatar
            src={profile.avatar}  
            sx={{
              width: 70,
              height: 70,
              bgcolor: "white",
              color: "#ff6a6a",
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            {!profile.avatar && profile.name?.charAt(0)}
          </Avatar>


          <Box>
            <Typography variant="h6" fontWeight="bold">
              {profile.name}
            </Typography>
            <Typography variant="body2">
              {profile.email}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <InfoRow icon={<EmailIcon />} label="Email" value={profile.email} />
            <InfoRow icon={<PhoneIcon />} label="Phone" value={profile.phoneNumber || "—"} />
            <InfoRow icon={<WcIcon />} label="Gender" value={profile.gender || "—"} />
            <InfoRow icon={<LocationOnIcon />} label="Location" value={profile.location || "—"} />
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            fullWidth
            onClick={onEdit}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              py: 1.2
            }}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Box>

  );
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("accountInfo");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    getProfile().then((data) => {
      console.log("Profile set:", data);
      setProfile(data);
    });
  }, []);
  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Grid container spacing={3}>

        <Grid item xs={12} md={3}>
          <Box sx={{ minWidth: 140 }}>
            <img src={Logo} alt="logo" height={100} />
          </Box>
          <Card
            sx={{
              borderRadius: 3,
              background: "#f9e5e5ff",
              position: "sticky",
              top: 90
            }}
          >
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
              <ListItemButton onClick={() => setActiveTab("accountInfo")}>
                <ListItemText primary="Account" />
              </ListItemButton>

              <ListItemButton onClick={() => setActiveTab("orders")}>
                <ListItemText primary="My Orders" />
              </ListItemButton>

              <ListItemButton onClick={() => setActiveTab("wishList")}>
                <ListItemText primary="Wishlist ❤️" />
              </ListItemButton>

              <ListItemButton onClick={() => setActiveTab("address")}>
                <ListItemText primary="Addresses" />
              </ListItemButton>

              <ListItemButton onClick={() => setActiveTab("security")}>
                <ListItemText primary="Security" />
              </ListItemButton>

              <Divider sx={{ my: 1 }} />

              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </List>
          </Card>
        </Grid>

        <Grid item
          xs={12}
          md={9}
          sx={{
            backgroundColor: "#f9e5e5ff",
            borderRadius: 3,
            p: 2
          }}>
          {activeTab === "accountInfo" && !editMode && (
            <AccountInfo
              profile={profile}
              onEdit={() => setEditMode(true)}
            />
          )}

          {activeTab === "accountInfo" && editMode && (
            <EditProfile
              profile={profile}
              onCancel={() => setEditMode(false)}
              onSave={(updatedUser) => {
                setProfile(updatedUser);
                setEditMode(false);
              }}
            />
          )}
          {activeTab === "orders" && <Orders />}
          {activeTab === "address" && <Addresses />}
          {activeTab === "security" && <Security />}
          {activeTab === "wishList" && <WishList />}
        </Grid>

      </Grid>
    </Box>
  );
}
