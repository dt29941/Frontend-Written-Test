"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError(result.error);
      setOpen(true);
    } else {
      router.push("/mainPage");
    }
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setError(null);
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Image Layer */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/25101.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />
      {/* Overlay Layer */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.15)', // Lighter overlay
          zIndex: 1,
          pointerEvents: 'none', // Ensure no click interference
        }}
      />
      {/* Form Layer */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          zIndex: 2,
          pointerEvents: 'none', // Disable pointer events on container
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            padding: '20px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(45deg, #2196f3, #0033ff)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': { transform: 'scale(1.02)' },
            pointerEvents: 'auto', // Enable pointer events on form
          }}
        >
          <Typography component="h1" variant="h5" sx={{ color: '#000000' }}>
            Crypto Learner - Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%', pointerEvents: 'auto' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                background: "white",
                borderRadius: "8px",
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#2196f3' },
                  '&.Mui-focused fieldset': { borderColor: '#0033ff', boxShadow: '0 0 8px rgba(0, 51, 255, 0.3)' },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                background: "white",
                borderRadius: "8px",
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#2196f3' },
                  '&.Mui-focused fieldset': { borderColor: '#0033ff', boxShadow: '0 0 8px rgba(0, 51, 255, 0.3)' },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0', transform: 'scale(1.02)' },
                transition: 'all 0.2s ease-in-out',
                borderRadius: '8px',
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ zIndex: 3 }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error || "Invalid credentials. Please try again."}
        </Alert>
      </Snackbar>
    </Box>
  );
}