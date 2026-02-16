import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Divider
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [isLogin,setIsLogin]  = useState(false);
  const { login } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://fashion-eccomerce-web-server.vercel.app/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        password,
        phoneNumber,
        email,
        location,
        gender,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Signup failed");
      return;
    }
    login(result);       
    navigate("/");           

  } catch (err) {
    console.log(err);
  }
};
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("https://fashion-eccomerce-web-server.vercel.app/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials:"include",
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Login failed");
      return;
    }
    login(result);       
    navigate("/");           

  } catch (err) {
    console.log(err);
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:'#ebd8dd',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: 500,
          width: "100%",
          p: 4,
          borderRadius: 3,
        }}
      >
        {isLogin ? (
        <Box component="form" onSubmit={handleLogin}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
         Sign IN
        </Typography> 
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, borderRadius: 2 }}
          >
            Sign In
          </Button>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Typography
            textAlign="center"
            mt={3}
            sx={{ cursor: "pointer", color: "primary.main" }}
            onClick={() => setIsLogin(false)}
          >
            Register
          </Typography>
        </Box>
          ) :
        (
          <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Create Account
        </Typography> 
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                fullWidth
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, borderRadius: 2 }}
          >
            Sign Up
          </Button>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{ borderRadius: 2 }}
          >
            Sign up with Google
          </Button>

          <Typography
            textAlign="center"
            mt={3}
            sx={{ cursor: "pointer", color: "primary.main" }}
            onClick={() => setIsLogin(true)}
          >
            Already have an account? Sign In
          </Typography>
        </Box>
        )}
        
      </Paper>
    </Box>
  );
}
