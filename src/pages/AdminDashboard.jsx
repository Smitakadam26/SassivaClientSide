import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ManageOrders from "./ManageOrders";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 260;

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("addProduct");
  const { logout } = useAuth();

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

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f9e5e5ff"
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Admin Panel
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: "#333" }} />

        <List>
          <ListItemButton onClick={() => setActivePage("addProduct")}>
            <ListItemText primary="➕ Add Product" />
          </ListItemButton>

          <ListItemButton onClick={() => setActivePage("editProduct")}>
            <ListItemText primary="✏️ Edit / Delete Product" />
          </ListItemButton>

          <ListItemButton onClick={() => setActivePage("orders")}>
            <ListItemText primary="📦 Manage Orders" />
          </ListItemButton>

          <Divider sx={{ backgroundColor: "#333", my: 1 }} />

          <ListItemButton onClick={logout}>
            <ListItemText primary="🚪 Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 4 }}>

        <Grid container spacing={3} mb={4}>
          <StatCard title="Total Orders" value="1,245" icon={<ShoppingCartIcon />} />
          <StatCard title="Total Users" value="856" icon={<PeopleIcon />} />
          <StatCard title="Products" value="342" icon={<InventoryIcon />} />
          <StatCard title="Revenue" value="$12,430" icon={<AttachMoneyIcon />} />
        </Grid>

        {/* ---- DYNAMIC CONTENT ---- */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>{renderContent()}</CardContent>
        </Card>

      </Box>
    </Box>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
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
