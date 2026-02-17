import { useState, useEffect } from "react";
import {
  Box, Grid, Avatar, Typography, Card, CardContent, Button, Divider, IconButton,
  Drawer, useMediaQuery
} from "@mui/material";
import { getProfile } from '../services/api';
import EditProfile from "./EditProfile";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WcIcon from '@mui/icons-material/Wc';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from "@mui/icons-material/Edit";
import Products from "../components/Products";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../components/Sidebar";
import { fetchWishlist } from "../services/api";

function InfoRow({ icon, label, value }) {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
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
    <Box>
      <Typography variant="h6" mt={2}>My Orders</Typography>

      <Card sx={{ my: 2 }}>
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

    </Box>
  );
}
function Addresses() {
  return (
    <Box>
      <Typography variant="h6" mt={2}>Saved Addresses</Typography>

      <Card sx={{ my: 2 }}>
        <CardContent>
          <Typography>Home</Typography>
          <Typography color="text.secondary">
            221B Baker Street, London
          </Typography>
          <Button size="small" sx={{ mt: 1 }}>Edit</Button>
        </CardContent>
      </Card>
      <Button variant="contained">Add New Address</Button>
    </Box>
  );
}
function Security() {
  return (
    <Box>
      <Typography variant="h6" mt={2}>Security Settings</Typography>

      <Typography>Email Verified ✔</Typography>

      <Button variant="outlined" sx={{ mt: 2 }}>
        Change Password
      </Button>
    </Box>
  );
}
function WishList() {
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    fetchWishlist()
      .then((data) => {
        setWishlist(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setWishlist([]);
      });
  }, [wishlist]);
  const toggleWishlist = (product) => {
    
  };
  const [hovered, setHovered] = useState(false);
  return (
    <Box>
      <Typography variant="h6" mt={2}>
        Wishlist
      </Typography>

      <Products
        setHovered={setHovered}
        toggleWishlist={toggleWishlist}
        hovered={hovered}
        filteredProducts={wishlist}
        wishlist={wishlist}
      />
    </Box>
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
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data);
    });
  }, []);

  return (
    <Box sx={{ p: { md: 4 }, minHeight: "100vh", display: "flex", gap: 3 }}>

      {isMobile && (
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{ position: "fixed", top: 40, right: 40, zIndex: 1200 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {!isMobile && (
        <Box
          sx={{
            width: "25%",
            alignSelf: "flex-start",
            position: "sticky",
            top: 20,
          }}
        >
          <Sidebar setActiveTab={setActiveTab} setMobileOpen={setMobileOpen} />
        </Box>
      )}

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Sidebar setActiveTab={setActiveTab} setMobileOpen={setMobileOpen} />
        </Box>
      </Drawer>

      <Box
        sx={{
          width: { xs: "100%", md: "75%" },
          backgroundColor: "#f9e5e5ff",
          borderRadius: 3,
          p: 2
        }}
      >
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

      </Box>

    </Box>
  );
}
