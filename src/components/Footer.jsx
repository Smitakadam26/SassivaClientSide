import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Typography, IconButton, Divider } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#482424", color: "#fff", mt: 5 }}>

      <Box
        sx={{
          backgroundColor: "#fbc9c9",
          py: 2,
          textAlign: "center"
        }}
      >
        <Typography variant="body2">
          Every Day Fresh Product | Free delivery over $70 | Daily Mega Discount | Best price on the market
        </Typography>
      </Box>

      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>

          <Grid xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Men
            </Typography>
            <Typography sx={{ cursor: "pointer", mb: 1 }}>Clothing</Typography>
            <Typography sx={{ cursor: "pointer", mb: 1 }}>Footwear</Typography>
            <Typography sx={{ cursor: "pointer", mb: 1 }}>Accessories</Typography>
            <Typography sx={{ cursor: "pointer" }}>Watches</Typography>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Women
            </Typography>
            <Typography sx={{ cursor: "pointer", mb: 1 }}>Clothing</Typography>
            <Typography sx={{ cursor: "pointer", mb: 1 }}>Footwear</Typography>
            <Typography sx={{ cursor: "pointer", mb: 1 }}>Jwellery</Typography>
            <Typography sx={{ cursor: "pointer", mb: 1 }}>Beauty</Typography>
            <Typography sx={{ cursor: "pointer" }}>Bags</Typography>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Kids
            </Typography>
            <Typography sx={{ cursor: "pointer", mb: 1 }}>Clothing</Typography>
            <Typography sx={{ cursor: "pointer", mb: 1 }}>Footwear</Typography>
            <Typography sx={{ cursor: "pointer", mb: 1 }}>Baby Care</Typography>
            <Typography sx={{ cursor: "pointer" }}>Toys</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Grid xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom>
                Support
              </Typography>

              <Typography
                component={RouterLink}
                to="/about"
                sx={{ textDecoration: "none", color: "inherit", mb: 1, display: "block" }}
              >
                About Us
              </Typography>

              <Typography
                component={RouterLink}
                to="/faq"
                sx={{ textDecoration: "none", color: "inherit", mb: 1, display: "block" }}
              >
                FAQ
              </Typography>

              <Typography
                component={RouterLink}
                to="/terms"
                sx={{ textDecoration: "none", color: "inherit", mb: 1, display: "block" }}
              >
                Terms & Conditions
              </Typography>
               <Typography
                component={RouterLink}
                to="/terms"
                sx={{ textDecoration: "none", color: "inherit", mb: 1, display: "block" }}
              >
                Privacy Policy
              </Typography>
               <Typography
                component={RouterLink}
                to="/terms"
                sx={{ textDecoration: "none", color: "inherit", mb: 1, display: "block" }}
              >
                Contact Us
              </Typography>
            </Grid>
            
          </Grid>

        </Grid>
      </Container>

      <Divider sx={{ backgroundColor: "#333" }} />

      <Container sx={{ py: 3 }}>
        <Grid container alignItems="center">

          <Grid xs={12} md={6}>
            <Typography variant="body2">
              © 202 All rights reserved
            </Typography>
          </Grid>

          <Grid xs={12} md={6} sx={{ textAlign: { xs: "left", md: "right" } }}>
            <IconButton sx={{ color: "#fff" }}>
              <FacebookOutlinedIcon />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <InstagramIcon />
            </IconButton>
          </Grid>

        </Grid>
      </Container>


    </Box>
  );
};

export default Footer;
