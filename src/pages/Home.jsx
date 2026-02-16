import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Newsletter from "./Newsletter";
import { Box, Container, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { getFeaturedProducts } from "../services/api";
import { useNavigate } from "react-router-dom";
import menbanner from "../assests/images/menbanner.webp";
import womenbanner from "../assests/images/womenbanner.webp";
import kidsbanner from "../assests/images/kidsbanner.jpg";
const categories = [
    {
        id: 1,
        name: "Men",
        image: menbanner,
        slug: "mensection"
    },
    {
        id: 2,
        name: "Women",
        image: womenbanner,
        slug: "womensection"
    },
    {
        id: 3,
        name: "Kids",
        image: kidsbanner,
        slug: "kidsection"
    }
];

export default function Home() {
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
    const handleCategoryClick = (category) => {
        navigate(`/${category.slug}`);
    };

    return (
        <>
            <Header />
            <Banner />

            <Box sx={{ py: 6 }}>
                <Container>
                    <Typography variant="h4" align="center" gutterBottom>
                        Shop by Category
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, 1fr)",
                                md: "repeat(3, 1fr)"
                            },
                            gap: 3,
                            mt: 4
                        }}
                    >
                        {categories.map((cat) => (
                            <Card
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat)}
                                sx={{
                                    position: "relative",
                                    cursor: "pointer",
                                    overflow: "hidden",
                                    borderRadius: 3,
                                    "&:hover img": {
                                        transform: "scale(1.05)"
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={cat.image}
                                    alt={cat.name}
                                    sx={{
                                        transition: "0.4s ease"
                                    }}
                                />

                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "rgba(0,0,0,0.4)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: "#fff",
                                            fontWeight: "bold",
                                            textTransform: "uppercase",
                                            letterSpacing: 1
                                        }}
                                    >
                                        {cat.name}
                                    </Typography>
                                </Box>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </Box>


            <Typography variant="h4" align="center" gutterBottom>
                Featured Products
            </Typography>
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
                        <Card sx={{
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
                                        {product.price}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Container>
            <Newsletter />
            <Footer />
        </>
    )
}
