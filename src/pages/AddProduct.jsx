import { useState } from "react";
import {Box,TextField,Button,Typography,Grid,Select,MenuItem,FormControl,InputLabel} from "@mui/material";


export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    color: "",
    quantity: "",
    size: "",
    packof: "",
    fabric: "",
    brand: "",
    type: "",
    price: "",
    category: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
  const res = await fetch("https://fashion-eccomerce-web-server.vercel.app/product/add", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();
  console.log("Full response:", data); // 👈 ADD THIS

  if (!res.ok) {
    console.error("Backend error:", data); // 👈 ADD THIS
    throw new Error(JSON.stringify(data));
  }

  console.log("Success:", data);
} catch (err) {
  console.error("Frontend Error:", err);
}

    alert("Product added successfully!");
  }
  return (
    <Box>
      <Typography variant="h6" mb={3}>
        Add New Product
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField name="name" label="Product Name" fullWidth onChange={handleChange} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField name="brand" label="Brand" fullWidth onChange={handleChange} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField name="fabric" label="Fabric" fullWidth onChange={handleChange} />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField name="size" label="Size" fullWidth onChange={handleChange} />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField name="color" label="Color" fullWidth onChange={handleChange} />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField name="quantity" label="Quantity" type="number" fullWidth onChange={handleChange} />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField name="packof" label="Pack Of" type="number" fullWidth onChange={handleChange} />
        </Grid>

        <Grid item xs={12}>
          <TextField name="price" label="Price" type="number" fullWidth onChange={handleChange} />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select name="category" value={product.category} label="Category" onChange={handleChange}>
              <MenuItem value="women">Women</MenuItem>
              <MenuItem value="men">Men</MenuItem>
              <MenuItem value="kids">Kids</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {product.category === 'women' && (<Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select name="type" value={product.type} label="Type" onChange={handleChange}>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="footwear">Footwear</MenuItem>
              <MenuItem value="beauty">Beauty</MenuItem>
              <MenuItem value="jwellery">Jwellery</MenuItem>
              <MenuItem value="bag">Bag</MenuItem>
            </Select>
          </FormControl>
        </Grid>)}

        {product.category === 'men' && (<Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select name="type" value={product.type} label="Type" onChange={handleChange}>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="footwear">Footwear</MenuItem>
              <MenuItem value="accessories">Accessories</MenuItem>
              <MenuItem value="watches">Watches</MenuItem>
            </Select>
          </FormControl>
        </Grid>)}
        {product.category === 'kids' && (<Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select name="type" value={product.type} label="Type" onChange={handleChange}>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="footwear">Footwear</MenuItem>
              <MenuItem value="toys">Toys</MenuItem>
              <MenuItem value="babycare">Babycare</MenuItem>
            </Select>
          </FormControl>
        </Grid>)}

        <Grid item xs={12}>
          <input type="file" multiple onChange={(e) => setImages([...e.target.files])} />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Add Product
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
