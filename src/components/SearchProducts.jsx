import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Products from "./Products";
import { Typography } from "@mui/material";
import { fetchSearchProducts } from "../services/api";
export default function SearchProducts() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [products, setProducts] = useState([]);
    const [hovered, setHovered] = useState(false);
    useEffect(() => {
        const timer = setTimeout(async () => {

        fetchSearchProducts(query)
            .then((data) => {
                setProducts((data) ? data : []);
            })
            .catch(() => {
                setProducts([]);
            });
        }, 300);

        return () => clearTimeout(timer);

    }, [query]);

    return (
        <>
            <Header />
            {products.length > 0 ? (
                <Products filteredProducts={products} setHovered={setHovered}
                hovered={hovered} />
            ) : (
                <Typography
                    variant="h5"
                    align="center"
                    sx={{ mt: 5, color: "text.secondary" }}
                >
                    No products found for this search.
                </Typography>
            )}
            
            <Newsletter />
            <Footer />
        </>
    )
}
