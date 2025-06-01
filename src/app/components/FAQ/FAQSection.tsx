"use client"
import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQSection() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: "What is Cryptocurrency?",
      answer: "Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates on a decentralized network, typically a blockchain. It allows for secure, peer-to-peer transactions without intermediaries like banks. Bitcoin and Ethereum are popular examples."
    },
    {
      question: "Why Crypto Leaner?",
      answer: "Learning about crypto helps you understand a transformative technology reshaping finance, technology, and investment. It empowers you to make informed decisions about investing, trading, or using crypto, while staying aware of risks and opportunities in a rapidly evolving market."
    },
    {
      question: "How to Trade Crypto?",
      answer: "To trade crypto, start by choosing a reputable exchange (e.g., Binance, Coinbase). Create an account, deposit funds, and select a trading pair (e.g., BTC/USD). Learn basic trading strategies like market or limit orders, and use technical analysis to make informed trades. Always manage risks and start small."
    },
    {
      question: "How to Earn Crypto?",
      answer: "You can earn crypto through various methods: mining (using computing power to validate transactions), staking (locking up coins to support a network), trading (buying low and selling high), or participating in airdrops and rewards programs. Research each method to understand risks and requirements."
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: '20px', backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, margin: '20px 0', textAlign: 'center' }}>
        Frequently Asked Questions
      </Typography>
      <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              backgroundColor: '#1e2a44', // Deep neutral gray for default state
              color: 'white',
              borderRadius: '4px',
              marginBottom: '10px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // Slightly stronger shadow for depth
              '&:before': { display: 'none' }, // Remove default MUI divider
              transition: 'all 0.3s ease-in-out',
              '&:hover': { backgroundColor: '#2c3e50' } // Blue-gray hover effect
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                padding: '10px 20px',
                '& .MuiAccordionSummary-content': { margin: '10px 0' }
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '10px', backgroundColor: '#121212' }}>
              <Typography variant="body1" sx={{ color: '#fff', lineHeight: 1.5,fontWeight:"500", fontSize:"16.5px" }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}