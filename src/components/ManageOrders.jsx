import { Box, Typography, Button } from "@mui/material";

export default function ManageOrders() {
  return (
    <Box>
      <Typography variant="h6" mb={2}>Manage Orders</Typography>

      <Typography>Order #12345 - Pending</Typography>
      <Button size="small" sx={{ mt: 1 }}>
        Update Status
      </Button>
    </Box>
  );
}
