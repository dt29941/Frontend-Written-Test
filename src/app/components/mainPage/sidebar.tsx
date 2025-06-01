"use client";
import React, { useState, useRef } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react'; 
import { useMediaQuery } from '@mui/material';

export default function Sidebar() {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width:998px)');
  const [menuOpen, setMenuOpen] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null); 

  const handleLogout = () => {
    signOut();
  };

  const handleMenuClick = () => {
    setMenuOpen(true);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div ref={topRef} /> 
      {pathname.length > 1 && (
        <Box
          sx={{
            backgroundColor: '#061121',
            color: 'white',
            width: isMobile ? (menuOpen ? "100vw" : '0') : "250px",
            height: '100%',
            padding: isMobile && !menuOpen ? 0 : '10px',
            boxShadow: 2,
            top: 0,
            left: 0,
            zIndex: 1000,
            transition: 'width 0.3s',
            position: 'relative',
          }}
        >
          {isMobile && !menuOpen ? (
            <Button
              variant="contained"
              onClick={handleMenuClick}
              sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0
              }}
            >
              Menu
            </Button>
          ) : (
            <>
              <Typography variant="h5" className="title" sx={{ marginBottom: '20px', width: isMobile ? '100vw' : "250px" }}>
                Crypto Learner
              </Typography>
             
              <List>
                <ListItem component="a" href="/mainPage">
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem component="a" href="/dashboard">
                  <ListItemText primary="Crypto Dashboard" />
                </ListItem>
                <ListItem component="a" href="/FAQ">
                  <ListItemText primary="FAQ" />
                </ListItem>
                <ListItem onClick={handleLogout} sx={{ cursor: 'pointer' }}>
                  <ListItemText primary="Logout" />
                </ListItem>
                {isMobile && (
                  <Button
                    variant="contained"
                    onClick={() => setMenuOpen(false)} 
                    sx={{
                      width: '100%',
                      position: 'fixed',
                      bottom: 0,
                      backgroundColor: '#d9d9d9',
                      marginLeft: "-10px",
                      color: '#000'
                    }}
                  >
                    Close Menu
                  </Button>
                )}
              </List>
            </>
          )}
        </Box>
      )}
    </>
  );
}