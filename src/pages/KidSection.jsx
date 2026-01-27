import Header from "../components/Header";
import { Box,Typography,List,ListItemText,ListItemButton } from "@mui/material";
import Products from "../components/Products";
import banner5 from "../assests/images/banner5.png";
import { useState,useEffect } from "react";
import { getAllProductsKidSection } from "../services/api";
export default function KidSection() {
    const [products, setProducts] = useState([]);
        const [selectedCategory, setSelectedCategory] = useState("all");
        const [hovered, setHovered] = useState(false);
        const [wishlist, setWishlist] = useState(
            JSON.parse(localStorage.getItem("wishlist")) || []
        );
    
        useEffect(() => {
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            getAllProductsKidSection().then(setProducts);
    
        }, [wishlist]);
    
        const filteredProducts =
            selectedCategory === "all"
                ? products
                : products.filter((p) => p.type === selectedCategory);
    
        const toggleWishlist = (product) => {
            const exists = wishlist.find((item) => item._id === product._id);
            exists
                ? setWishlist(wishlist.filter((item) => item._id !== product._id))
                : setWishlist([...wishlist, product]);
        };
    return (
        <>
            <Header />
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <Box
                    sx={{
                        width: 280,
                        flexShrink: 0,
                        borderRight: "1px solid #eee",
                        position: "sticky",
                        top: 0,
                        height: "100vh",
                        overflowY: "auto",
                        backgroundColor: "#fff",
                        p: 2
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        Kids Categories
                    </Typography>

                    <List>
                        {[
                            { label: "All", value: "all" },
                            { label: "Clothing", value: "clothing" },
                            { label: "Footwear", value: "footwear" },
                            { label: "Accessories", value: "accessories" },
                            { label: "Watches", value: "watches" },
                        ].map((cat) => (
                            <ListItemButton
                                key={cat.value}
                                selected={selectedCategory === cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                sx={{ borderRadius: 1 }}
                            >
                                <ListItemText primary={cat.label} />
                            </ListItemButton>
                        ))}
                    </List>

                    <Box mt={3}>
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
                    </Box>
                </Box>

                <Box sx={{ flex: 1, overflowY: "auto", p: 4 }}>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
                            gap: 3
                        }}
                    >
                        <Products
                            setHovered={setHovered}
                            toggleWishlist={toggleWishlist}
                            hovered={hovered}
                            filteredProducts={filteredProducts}
                            wishlist={wishlist}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}