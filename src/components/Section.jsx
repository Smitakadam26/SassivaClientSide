import MenuIcon from "@mui/icons-material/Menu";
import Products from "../components/Products";
import { IconButton, Drawer, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useState } from "react";

export default function Section({Sidebar,filteredProducts,mobileOpen,setMobileOpen,category}) {
    const [hovered, setHovered] = useState(false);
    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem("wishlist")) || []
    );
    const toggleWishlist = (product) => {
        const exists = wishlist.find((item) => item._id === product._id);
        exists
            ? setWishlist(wishlist.filter((item) => item._id !== product._id))
            : setWishlist([...wishlist, product]);
    };
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Box sx={{ p: 4, minHeight: "100vh", display: { xs: "inline", md: "flex" }, gap: 3 }}>
            {isMobile && (
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2
                }}>
                    <IconButton
                        onClick={() => setMobileOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        {category} Categories
                    </Typography>
                </Box>


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
                    {Sidebar}
                </Box>
            )}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
            >
                <Box sx={{ width: 250, p: 2 }}>
                    {Sidebar}
                </Box>
            </Drawer>

            <Box sx={{
                width: { xs: "100%", md: "75%" },
                borderRadius: 3,
                p: 2
            }}>
                <Products
                    setHovered={setHovered}
                    toggleWishlist={toggleWishlist}
                    hovered={hovered}
                    filteredProducts={filteredProducts}
                    wishlist={wishlist}
                />
            </Box>
        </Box>
    )
}