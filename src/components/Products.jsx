import { Typography, Card, CardMedia, IconButton, CardContent } from "@mui/material"
import { useNavigate } from "react-router-dom"

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function Products({ filteredProducts, setHovered, hovered, toggleWishlist ,wishlist}) {
    const navigate = useNavigate();
    return (
        <>
        {
            filteredProducts.map((product, index) => {
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

                        <Card onClick={() => navigate('/productDetail/'+product._id)}>
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
                        </Card>

                    </Card>
                )
            })
        }

        </>
        
    )
}