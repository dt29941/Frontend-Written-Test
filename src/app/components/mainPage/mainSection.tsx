"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, TextField, useMediaQuery, Modal, Button } from '@mui/material';

export interface Course {
    img: string;
    title: string;
    txt: string;
}

export default function MainSection() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    const [openModal, setOpenModal] = useState(false);
    const isMobile = useMediaQuery('(max-width:998px)'); 

    const fetchedCourses = [
        {
            img: "/course-1.png",
            title: "Introduction to Crypto Trading",
            txt: "Learn advanced trading techniques to maximize your profits."
        },
        {
            img: "/course-2.png",
            title: "Introduction to Crypto Mining",
            txt: "Explore the world of crypto mining to earn your own crypto."
        }
    ];

    const fetchedPopulars = [
        {
            img: "/popular-1.png",
            title: "DeFi and Smart Contracts",
            txt: "Dive into the decentralized finance ecosystem and smart contracts."
        },
        {
            img: "/popular-2.png",
            title: "NFTs and Digital Art",
            txt: "Explore the exciting world of non-fungible tokens and digital art."
        },
        {
            img: "/popular-3.png",
            title: "Blockchain Explained",
            txt: "Understand the underlying technology behind cryptocurrencies."
        }
    ];

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500); 

        return () => {
            clearTimeout(handler); 
        };
    }, [searchTerm]);

    const filteredCourses = fetchedCourses.filter(course =>
        course.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const filteredPopulars = fetchedPopulars.filter(course =>
        course.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const handleCardClick = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Box sx={{ flexGrow: 1, padding: '10px', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
            <TextField
                variant="outlined"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ marginBottom: '20px', width: '100%', backgroundColor: "white", borderRadius: "8px" }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, margin: '20px 0' }}>
                Your Learning
            </Typography>
            <Grid container spacing={3} sx={{justifyContent: isMobile?"center":"flex-start"}} data-testid="MuiGrid-container">
                {filteredCourses.map((item: Course, index: number) => (
                    <Grid key={index}>
                        <Card 
                            onClick={handleCardClick}
                            sx={{ 
                                backgroundColor: '#ddd', 
                                borderRadius: '12px',
                                height: '100%',
                                maxHeight: "300px",
                                width: "350px",
                                transition: 'transform 0.3s', 
                                '&:hover': { transform: 'scale(1.05)', boxShadow: 3 },
                                cursor: 'pointer'
                            }}
                        >
                            <CardMedia
                                component="img"
                                alt={item.title}
                                height="200"
                                image={item.img}
                                sx={{ borderRadius: '12px 12px 0 0', objectFit: 'cover' }}
                            />
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100px' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#000', flexGrow: 1 }}>
                                    {item.txt}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h4" sx={{ fontWeight: 800, margin: '20px 0' }}>
                Popular Courses
            </Typography>
            <Grid container spacing={3} sx={{justifyContent: isMobile?"center":"flex-start"}} data-testid="MuiGrid-container">
                {filteredPopulars.map((item: Course, index: number) => (
                    <Grid key={index}>
                        <Card 
                            onClick={handleCardClick}
                            sx={{ 
                                backgroundColor: '#ddd', 
                                borderRadius: '12px',
                                height: '100%',
                                maxHeight: "300px",
                                maxWidth: "350px",
                                transition: 'transform 0.3s', 
                                '&:hover': { transform: 'scale(1.05)', boxShadow: 3 },
                                cursor: 'pointer'
                            }}
                        >
                            <CardMedia
                                component="img"
                                alt={item.title}
                                height="200"
                                image={item.img}
                                sx={{ borderRadius: '12px 12px 0 0', objectFit: 'cover' }}
                            />
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#000', flexGrow: 1 }}>
                                    {item.txt}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
          <Modal
  open={openModal}
  onClose={handleCloseModal}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  BackdropProps={{
    sx: {
      transition: 'opacity 0.4s ease-in-out',
      opacity: openModal ? 0.6 : 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
  }}
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: openModal
        ? 'translate(-50%, -50%) scale(1)'
        : 'translate(-50%, -50%) scale(0.7)',
      opacity: openModal ? 1 : 0,
      width: isMobile ? '80%' : "600px",
      bgcolor: '#061733',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)', 
      p: 4,
      textAlign: 'center',
      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-in-out', // Spring-like easing
      transformOrigin: 'center center', 
    }}
  >
    <Typography id="modal-title" variant="h6" component="h2" sx={{ color: 'white', fontWeight: 600 }}>
      Coming Soon
    </Typography>
    <Typography id="modal-description" sx={{ mt: 2, color: 'white', fontSize: '1rem' }}>
      This platform is still under development. Course material will be available soon.
    </Typography>
    
    <Button
      onClick={handleCloseModal}
      variant="contained"
      sx={{
        mt: 3,
        backgroundColor: '#1976d2',
        borderRadius: '8px',
        padding: '8px 16px',
        transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: '#1565c0',
          transform: 'scale(1.05)', 
        },
      }}
    >
      Close
    </Button>
  </Box>
</Modal>
        </Box>
    );
}