import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  Avatar
} from "@mui/material";
import { updateProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

function EditProfile({ profile, onCancel, onSave }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: profile?.name || "",
    phoneNumber: profile?.phoneNumber || "",
    gender: profile?.gender || "",
    location: profile?.location || ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(profile?.avatar || "");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (image) {
        formData.append("avatar", image);
      }

      const res = await updateProfile(formData);
      onSave(res.user);
      navigate("/Profile");
    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  return (
    <Card sx={{ borderRadius: 3, maxWidth: 500, mx: "auto" }}>
      <CardContent>
        <Typography variant="h6" mb={2} align="center">
          Edit Profile
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Avatar
              src={preview}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Button component="label" variant="text">
              Upload Profile Picture
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              fullWidth
              value={form.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="phoneNumber"
              label="Phone"
              fullWidth
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="gender"
              label="Gender"
              fullWidth
              value={form.gender}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="location"
              label="Location"
              fullWidth
              value={form.location}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <Button fullWidth variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default EditProfile;
