import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Newsletter from "./Newsletter";
import { Box, Typography, Card, CardMedia} from "@mui/material";
import { useNavigate } from "react-router-dom";
import menbanner from "../assests/images/menbanner.webp";
import womenbanner from "../assests/images/womenbanner.webp";
import kidsbanner from "../assests/images/kidsbanner.jpg";
import FeaturedProducts from "../components/FeaturedProducts";
const categories = [
    {
        id: 1,
        name: "Men",
        image: menbanner,
        url: "mensection"
    },
    {
        id: 2,
        name: "Women",
        image: womenbanner,
        surl: "womensection"
    },
    {
        id: 3,
        name: "Kids",
        image: kidsbanner,
        url: "kidsection"
    }
];

export default function Home() {
    
    const navigate = useNavigate();
    const handleCategoryClick = (category) => {
        navigate(`/${category.url}`);
    };

    return (
        <>
            <Header />
            <Banner />

            <Box sx={{ py: 6 }}>
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
            </Box>


            <Typography variant="h4" align="center" gutterBottom>
                Featured Products
            </Typography>
            <FeaturedProducts/>
            <Newsletter />
            <Footer />
        </>
    )
}
