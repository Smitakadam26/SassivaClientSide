import { Box,Container,Typography,TextField,Button } from "@mui/material";

export default function Newsletter(){
    return(
        <Box sx={{ py: 6 }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Subscribe to Our Newsletter
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Enter your email"
              variant="outlined"
            />
            <Button variant="contained">Subscribe</Button>
          </Box>
        </Container>
      </Box>
    )
}