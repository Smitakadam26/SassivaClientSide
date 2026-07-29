import {
  AppBar,
  Toolbar,
  Box,
  styled,
  InputBase,
  IconButton,
  Container,
  alpha,
  Stack,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

import Navbar from "../components/Navbar";
import Logo from "../assests/images/logo.png";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  backgroundColor: alpha(theme.palette.grey[100], 1),
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 1),

  "&:hover": {
    boxShadow: theme.shadows[1],
  },

  "&:focus-within": {
    boxShadow: theme.shadows[2],
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,

  "& .MuiInputBase-input": {
    width: "100%",
    padding: theme.spacing(1),
  },
}));

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [query, setquery] = useState("");

  const handleClick = () => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/Profile");
      }
    } else {
      navigate("/Signup");
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              alignItems: "center",
              gap: 2,
              py: 1,
            }}
          >

            <Box>
              <Box
                component="img"
                src={Logo}
                alt="logo"
                sx={{
                  height: {
                    xs: 40,
                    sm: 50,
                    md: 60,
                    lg: 70,
                  },
                  width: "auto",
                }}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Search>

                <StyledInputBase
                  placeholder="Search products, brands & more..."
                  value={query}
                  onChange={(e) => setquery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />

                <Button
                  onClick={handleSearch}
                  sx={{
                    ml: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  <SearchIcon
                  sx={{
                    color: "text.secondary",
                    mr: 1,
                  }}
                />
                </Button>
              </Search>
            </Box>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              {!isMobile && (
                <IconButton onClick={handleClick}>
                  <PermIdentityOutlinedIcon />
                </IconButton>
              )}
            </Stack>
          </Toolbar>

          <Navbar />
        </Container>
      </AppBar>
    </>
  );
}