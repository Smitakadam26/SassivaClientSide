import { useState, useEffect } from "react";
import {Box,Typography,List,ListItemButton,ListItemText} from "@mui/material";
import Header from "../components/Header";
import { getAllProductsWomenSection } from "../services/api";
import banner5 from "../assests/images/banner5.png";
import Section from "../components/Section";
import Footer from "../components/Footer";


export default function WomenSection() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    getAllProductsWomenSection().then(setProducts);

  }, [wishlist]);
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.type === selectedCategory);
  const Sidebar = () => {
    return (

      <Box
        sx={{
          borderRight: "1px solid #eee",
          position: { md: "sticky" },
          top: { md: 0 },
          height: { md: "100vh" },
          backgroundColor: "#fff",
          p: 2
        }}
      >
        <Typography variant="h6" mb={2}>
          Women Categories
        </Typography>

        <List>
          {[
            { label: "All", value: "all" },
            { label: "Clothing", value: "clothing" },
            { label: "Footwear", value: "footwear" },
            { label: "Beauty", value: "beauty" },
            { label: "Jwellery", value: "jwellery" },
            { label: "Bag", value: "bag" }
          ].map((cat) => (
            <ListItemButton
              key={cat.value}
              selected={selectedCategory === cat.value}
              onClick={() => {setSelectedCategory(cat.value);setMobileOpen(false)}}
              sx={{ borderRadius: 1 }}
            >
              <ListItemText primary={cat.label} />
            </ListItemButton>
          ))}
        </List>

        {!mobileOpen && <Box mt={3}>
          <Box
            component="img"
            src={banner5}
            alt="banner"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              mb: 2
            }}
          />
        </Box>}
      </Box>
    )
  }
  return (
    <>
      <Header />
      <Section filteredProducts={filteredProducts} Sidebar={<Sidebar/>}
      mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} category={"Women"}/>
      <Footer/>
    </>
  );
}
