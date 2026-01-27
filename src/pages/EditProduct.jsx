import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllProducts, updateProduct } from "../services/api";

export default function EditProduct() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editImages, setEditImages] = useState(false);
  const [newImages, setNewImages] = useState([]);

  const TYPE_OPTIONS = ["clothing", "footwear", "bag", "accessories", "jwellery"];
  const CATEGORY_OPTIONS = ["women", "men", "kids"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();

        if (Array.isArray(data)) {
          setProducts(data.filter(Boolean));
        } else if (Array.isArray(data?.products)) {
          setProducts(data.products.filter(Boolean));
        } else {
          setProducts([]);
          console.error("Invalid products response:", data);
        }
      } catch (err) {
        console.error("Fetch failed", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct({ ...product });
    setEditImages(false);
    setNewImages([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleChange = (field, value) => {
    setSelectedProduct((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = async () => {
    if (!selectedProduct) return;

    try {
      const formData = new FormData();

      Object.keys(selectedProduct).forEach((key) => {
        if (key !== "images") {
          formData.append(key, selectedProduct[key]);
        }
      });

      if (newImages.length > 0) {
        newImages.forEach((img) => formData.append("images", img));
      } else if (Array.isArray(selectedProduct.images)) {
        selectedProduct.images.forEach((img) =>
          formData.append("images", img)
        );
      }

      const res = await updateProduct(selectedProduct._id, formData);

      if (!res?.product) {
        console.error("Invalid update response:", res);
      }

      setProducts((prev) =>
        prev.map((p) =>
          p && p._id === selectedProduct._id ? res.product : p
        )
      );

      setOpen(false)
    } catch (error) {
      console.error("Product update failed:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Edit / Delete Product
      </Typography>

      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)"
            },
            gap: 3
          }}
        >
          {products
            .filter((p) => p && p.images)
            .map((product) => (
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
              >


                <CardMedia
                  component="img"
                  height={200}
                  image={product.images[1] ? product.images[1] : product.images[0]}
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
                  <Button onClick={() => handleEditClick(product)}>Edit </Button>
                </CardContent>

              </Card>
            ))}
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Product</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2} p={2}>
                {[
                  ["name", "Name"],
                  ["brand", "Brand"],
                  ["price", "Price"],
                  ["quantity", "Quantity"],
                  ["fabric", "Fabric"],
                  ["size", "Size"],
                  ["color","Color"]
                ].map(([field, label]) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      label={label}
                      fullWidth
                      value={selectedProduct?.[field] || ""}
                      onChange={(e) =>
                        handleChange(field, e.target.value)
                      }
                    />
                  </Grid>
                ))}

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Type"
                    fullWidth
                    value={selectedProduct?.type || ""}
                    onChange={(e) => handleChange("type", e.target.value)}
                  >
                    {TYPE_OPTIONS.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Category"
                    fullWidth
                    value={selectedProduct?.category || ""}
                    onChange={(e) =>
                      handleChange("category", e.target.value)
                    }
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography fontWeight={600} mb={1}>
                Images
              </Typography>

              <Box display="flex" gap={1} flexWrap="wrap">
                {selectedProduct?.images?.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    sx={{
                      width: 90,
                      height: 90,
                      objectFit: "cover",
                      borderRadius: 1,
                      border: "1px solid #ddd"
                    }}
                  />
                ))}
              </Box>

              {!editImages && (
                <Button size="small" onClick={() => setEditImages(true)}>
                  Replace Images
                </Button>
              )}

              {editImages && (
                <TextField
                  fullWidth
                  label="New Images (comma separated URLs)"
                  onChange={(e) =>
                    setNewImages(
                      e.target.value
                        .split(",")
                        .map((img) => img.trim())
                    )
                  }
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
