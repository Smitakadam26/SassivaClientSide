import { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Header from "../components/Header";
import { getAllProductsMenSection } from "../services/api";
import banner5 from "../assests/images/banner5.png"


export default function MenSection() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [hovered, setHovered] = useState(false);
    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem("wishlist")) || []
    );

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        getAllProductsMenSection().then(setProducts);

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
                        Men Categories
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
                        {filteredProducts.map((product, index) => {
                            const isWishlisted = wishlist.some((item) => item._id === product._id);
                            return (
                                <Card
                                    key={product.id}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        transition: "0.3s",
                                        position: "relative",
                                        height: "100%"
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
                                        {isWishlisted ? (
                                            <FavoriteIcon color="error" />
                                        ) : (
                                            <FavoriteBorderIcon />
                                        )}
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

                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            fontWeight={600}
                                            sx={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                wordBreak: "break-word",
                                                minHeight: "3em"
                                            }}
                                        >
                                            {product.name}
                                        </Typography>
                                        <Typography color="text.secondary">{`$${product.price}`}</Typography>
                                    </CardContent>

                                    <Button fullWidth variant="contained" size="small" sx={{ borderRadius: 0 }}>
                                        Add to Cart
                                    </Button>
                                </Card>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </>
    );
}
