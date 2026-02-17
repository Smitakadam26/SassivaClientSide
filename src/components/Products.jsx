import { Typography, Card, CardMedia, IconButton, CardContent, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { fetchWishlist, addToWishlist,removeFromWishlist} from "../services/api";

export default function Products({ filteredProducts, setHovered, hovered }) {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    useEffect(() => {
        fetchWishlist()
            .then((data) => {
                setWishlist(Array.isArray(data) ? data : []);
            })
            .catch(() => {
                setWishlist([]);
            });
    }, [setWishlist]);
    const toggleWishlist = async(product) => {
        const exists = wishlist.some(
            (item) => item._id.toString() === product._id.toString()
        );

        const previous = wishlist;

        try {
            if (exists) {
                setWishlist(prev =>
                    prev.filter(item =>
                        item._id.toString() !== product._id.toString()
                    )
                );

                await removeFromWishlist(product._id);
            } else {
                setWishlist(prev => [...prev, product]);
                await addToWishlist(product._id);
            }
        } catch (error) {
            // rollback if API fails
            setWishlist(previous);
        }
    }
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)"
                },
                gap: 3,
                my: 2
            }}
        >
            {
                filteredProducts.map((product, index) => {
                    const isWishlisted = wishlist.some((item) => item._id === product._id);
                    return (
                        <Card
                            key={product._id}
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

                            <Box
                                onClick={() => navigate('/productDetail/' + product._id)}
                                sx={{ cursor: "pointer", flexGrow: 1, display: "flex", flexDirection: "column" }}
                            >
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
                                    <Typography color="text.secondary" fontWeight={600}>
                                        {product.brand}
                                    </Typography>
                                    <Typography
                                        fontWeight={300}
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
                                    <Typography variant="subtitle2" color="text.secondary">{product.color}</Typography>
                                    <Typography variant="h6" fontWeight={600}>{`₹${product.price}`}</Typography>
                                </CardContent>
                            </Box>

                        </Card>
                    )
                })
            }

        </Box>

    )
}