import {
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  Rating,
  Card,
  CardMedia,
  Accordion,
  AccordionDetails,
  AccordionSummary,

} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import Header from "../components/Header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
      setActiveImage(data.images?.[0]);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography p={4}>Loading...</Typography>;
  }

  return (
    <>
      <Header />
      <Box sx={{ p: { xs: 2, md: 6 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="420"
                image={activeImage || "/placeholder.png"}
                sx={{ objectFit: "cover" }}
              />
            </Card>

            <Box display="flex" gap={2} mt={2}>
              {product.images?.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img}
                  onClick={() => setActiveImage(img)}
                  sx={{
                    width: 80,
                    height: 80,
                    cursor: "pointer",
                    borderRadius: 2,
                    border:
                      activeImage === img
                        ? "2px solid #1976d2"
                        : "1px solid #ddd",
                    objectFit: "cover"
                  }}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={600}>
              {product.name}
            </Typography>

            <Typography color="text.secondary" mt={1}>
              Brand: <strong>{product.brand}</strong>
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography variant="body2">(128 reviews)</Typography>
            </Box>

            <Typography variant="h5" color="primary" mt={2}>
              ₹ {product.price}
            </Typography>

            <Box mt={2}>
              {product.quantity > 0 ? (
                <Chip label="In Stock" color="success" />
              ) : (
                <Chip label="Out of Stock" color="error" />
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Accordion sx={{ mt: 3 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>Product Details</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {[
                    ["Name", product.name],
                    ["Brand", product.brand],
                    ["Category", product.category],
                    ["Type", product.type],
                    ["Color", product.color || "N/A"],
                    ["Size", product.size],
                    ["Pack Of", product.packof],
                    ["Fabric", product.fabric || "N/A"],
                    ["Quantity Available", product.quantity]
                  ].map(([label, value]) => (
                    <Box
                      key={label}
                      sx={{
                        display: "flex",
                        gap: 2
                      }}
                    >
                      <Typography sx={{ minWidth: 150, fontWeight: 600 }}>
                        {label}:
                      </Typography>
                      <Typography>{value}</Typography>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>

            </Accordion>


            <Divider sx={{ my: 3 }} />

            <Typography variant="h6">Description</Typography>
            <Typography color="text.secondary" mt={1}>
              Premium quality product designed for comfort and durability.
              Perfect for daily wear and special occasions.
            </Typography>

            <Box display="flex" gap={2} mt={4}>
              <Button
                variant="contained"
                size="large"
                disabled={product.quantity === 0}
              >
                Add to Cart
              </Button>

              <Button
                variant="outlined"
                size="large"
                disabled={product.quantity === 0}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>

  );
}
