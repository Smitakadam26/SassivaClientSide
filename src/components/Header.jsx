import {
    AppBar, Toolbar, Box, styled, InputBase, IconButton, Container, alpha, Stack,
    useTheme, useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Navbar from "../components/Navbar";
import Logo from '../assests/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from 'react';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey[100], 1),
    border: `1px solid ${theme.palette.grey[300]}`,
    transition: theme.transitions.create(['width', 'box-shadow']),
    width: '100%',
    maxWidth: 280,

    '&:hover': {
        boxShadow: theme.shadows[1],
    },

    '&:focus-within': {
        maxWidth: 360,
        boxShadow: theme.shadows[2],
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    position: 'absolute',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1.2, 1, 1.2, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
}))

export default function Header() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [searchText,setSearchText] = useState("");
    const [products,setProducts] = useState([]);
    const handleClick = () => {
        if (user) {
            if (user.role === "admin") {
                navigate("/admin");
            }
            else {
                navigate("/Profile");
            }
        } else {
            navigate("/Signup");
        }
    };
    useEffect(()=>{
        if(searchText.trim() === ""){
            setProducts([]);
            return;
        }

        const timer = setTimeout(async () => {

            const response = await fetch(
                `https://sassivaserver.vercel.app/search?q=${searchText}`
            );

            const data = await response.json();
            console.log(data);
            setProducts(data);

        }, 300); 

        return () => clearTimeout(timer);

    }, [searchText]);
    return (
        <>
            <AppBar position="sticky" color="inherit" elevation={1}>
                <Container maxWidth="lg" sx={{ display: { xs: "flex", sm: "inline" } }}>
                    <Toolbar
                        sx={{
                            display: { xs: 'inline', sm: "flex" },
                            alignItems: 'center',
                            gap: 2
                        }}
                    >

                        <Box sx={{ minWidth: 50 }}>
                            <Box
                                component="img"
                                src={Logo}
                                alt="logo"
                                sx={{
                                    height: {
                                        xs: 40,
                                        sm: 50,
                                        md: 60,
                                        lg: 70
                                    },
                                    width: "auto"
                                }}
                            />
                        </Box>


                        <Box sx={{ flexGrow: 1 }}>

                            <Search sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>

                                <SearchIconWrapper>
                                    <SearchIcon fontSize="small" />
                                </SearchIconWrapper>

                                <StyledInputBase
                                    placeholder="Search products, brands & more…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />

                            </Search>


                            {
                                products.map(product => (
                                    <div key={product._id}>
                                        {product.name}
                                    </div>
                                ))
                            }

                        </Box>
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{ minWidth: 200, justifyContent: 'flex-end' }}
                        >


                            {!isMobile && <Box>
                                <IconButton aria-label="account" onClick={handleClick}>
                                    <PermIdentityOutlinedIcon />
                                </IconButton>
                            </Box>}
                        </Stack>
                    </Toolbar>

                    <Navbar />
                </Container>
            </AppBar>
        </>
    )
}