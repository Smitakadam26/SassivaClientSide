import { useState } from "react";
import {
  Box, Grid, Card, CardContent, Typography, Drawer, List, ListItemButton, ListItemText, Divider,
  useTheme, useMediaQuery, IconButton
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ManageOrders from "./ManageOrders";
import { useAuth } from "../context/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import logo from '../assests/images/logo.png';
const drawerWidth = 200;

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("addProduct");
  const { logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case "addProduct":
        return <AddProduct />;
      case "editProduct":
        return <EditProduct />;
      case "orders":
        return <ManageOrders />;
      default:
        return <AddProduct />;
    }
  };
  const Sidebar = () => {
    return (
      <Box sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        }
      }}>
        <Box sx={{ minWidth: 50 }}>
          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{
              height: {
                xs: 40,
                sm: 50,
                md: 60,
                lg: 70
              },
              width: "auto",
              mt:2
            }}
          />
        </Box>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Admin Panel
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: "#333" }} />

        <List>
          <ListItemButton onClick={() =>{ setActivePage("addProduct");setMobileOpen(false)}}>
            <ListItemText primary="➕ Add Product" />
          </ListItemButton>

          <ListItemButton onClick={() => {setActivePage("editProduct");setMobileOpen(false)}}>
            <ListItemText primary="✏️ Edit / Delete Product" />
          </ListItemButton>

          <ListItemButton onClick={() => {setActivePage("orders");setMobileOpen(false)}}>
            <ListItemText primary="📦 Manage Orders" />
          </ListItemButton>

          <Divider sx={{ backgroundColor: "#333", my: 1 }} />

          <ListItemButton onClick={logout}>
            <ListItemText primary="🚪 Logout" />
          </ListItemButton>
        </List>
      </Box >
    )
  }
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
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
          <Sidebar />
        </Box>
      )}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Sidebar />
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 4,backgroundColor: "#f4f6f8" }}>

        <Grid container spacing={3} mb={4}>
          <StatCard title="Total Orders" value="1,245" icon={<ShoppingCartIcon />} />
          <StatCard title="Total Users" value="856" icon={<PeopleIcon />} />
          <StatCard title="Products" value="342" icon={<InventoryIcon />} />
          <StatCard title="Revenue" value="$12,430" icon={<AttachMoneyIcon />} />
        </Grid>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>{renderContent()}</CardContent>
        </Card>

      </Box>
    </Box>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ fontSize: 40 }}>{icon}</Box>
          <Box>
            <Typography color="text.secondary">{title}</Typography>
            <Typography variant="h5" fontWeight="bold">
              {value}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
