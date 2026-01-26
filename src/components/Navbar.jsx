import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  Stack,
  Typography,
  Container
} from '@mui/material';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function ResponsiveNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: { xs: 'none', md: 'flex'} 
            }}
          >
            <Button component={Link} to="/" color='black' >
              Home
            </Button>
            <Button component={Link} to="/mensection" color='black'>
              Men
            </Button>
            <Button component={Link} to="/womensection" color='black'>
              Women
            </Button>
            <Button component={Link} to="/kidsection" color='black'>
              Kids
            </Button>
          </Stack>

          <Box
            sx={{
              display: { xs: 'flex', md: 'none' } 
            }}
          >
            <Button
              startIcon={<ListOutlinedIcon />}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleOpen}
            >
              <Typography fontWeight={600}>All Categories</Typography>
            </Button>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem component={Link} to="/" onClick={handleClose}>
                Home
              </MenuItem>
              <MenuItem component={Link} to="/mensection" onClick={handleClose}>
                Men
              </MenuItem>
              <MenuItem component={Link} to="/womensection" onClick={handleClose}>
                Women
              </MenuItem>
              <MenuItem component={Link} to="/kidsection" onClick={handleClose}>
                Kids
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
  );
}
