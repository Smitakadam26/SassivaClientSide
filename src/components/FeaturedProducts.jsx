import { Box, Container, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { getFeaturedProducts } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function FeaturedProducts(){
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getFeaturedProducts();

            setFeaturedProducts(data);
        } catch (error) {
            console.error(error);
        }
    };
    return(
        <Container>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(4, 1fr)"
                    },
                    gap: 3,
                    my: 2
                }}>

                    {featuredProducts.map((product) => (
                        <Card key={product._id} sx={{
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 3,
                            boxShadow: 3,
                            transition: "0.3s",
                            position: "relative",
                            height: "100%"
                        }}>
                            <Box
                                onClick={() => navigate('/productDetail/' + product._id)}
                                sx={{ cursor: "pointer", flexGrow: 1, display: "flex", flexDirection: "column" }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.images[0]}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{product.name}</Typography>
                                    <Typography color="text.secondary">
                                        ₹{product.price}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Container>
    )
}