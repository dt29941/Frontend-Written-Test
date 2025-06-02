"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { setCurrency } from '../../../../lib/features/currencySelect/currencySelectSlice';
import { Box, Button, Typography } from '@mui/material';


ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

export default function Priceboard() {
  const dispatch = useAppDispatch();
  const crypto = useAppSelector((state) => state.currencySelect);
  const [prices, setPrices] = useState<{ date: string; bitcoin: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //fetch data from public api
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto.coin}/market_chart?vs_currency=usd&days=7`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        const groupedPrices: Record<string, number[]> = {};
//mapping the price of each day
        data.prices.forEach((priceData: [number, number]) => {
          const date = new Date(priceData[0]).toISOString().split('T')[0];
          if (!groupedPrices[date]) {
            groupedPrices[date] = [];
          }
          groupedPrices[date].push(priceData[1]);
        });

        const pricesData = Object.entries(groupedPrices).map(([date, prices]) => {
          return { date, bitcoin: prices[prices.length - 1] };
        });

        setPrices(pricesData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [crypto.coin]);

  if (loading) {
    return <Box sx={{  mt: 4 }}>Loading...</Box>;
  }

  if (error) {
    return <Box sx={{  mt: 4, color: 'error.main' }}>Error: {error}</Box>;
  }
// use of chart.js
  const chartData = {
    labels: prices.map(price => price.date.slice(5).replace("-", "/")),
    datasets: [
      {
        label: `${crypto.coin.toUpperCase()} Price (USD)`,
        data: prices.map(price => price.bitcoin),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `Price: $${tooltipItem.raw.toFixed(crypto.decimal)}`;
          },
        },
      },
    },
  };
//example data
  const currencies = [
    { txt: "BTC", coin: "bitcoin", decimal: 2, id: 0 },
    { txt: "ETH", coin: "ethereum", decimal: 2, id: 1 },
    { txt: "USDT", coin: "tether", decimal: 7, id: 2 }
  ];

  return (
    <Box sx={{ p: 4, width:"100%", mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Daily Crypto Prices (Last 7 days)
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, mb: 4 }}>
        {currencies.map((currency) => (
          <Button
            key={currency.id}
            variant={currency.id === crypto.id ? 'contained' : 'outlined'}
            onClick={() => dispatch(setCurrency(currency))}
            sx={{
              minWidth: '90px',
              minHeight:'45px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            {currency.txt}
          </Button>
        ))}
      </Box>
      <Box sx={{ width: '100%', height: '400px' }}>
        <Line data={chartData} options={chartOptions} />
      </Box>
       <Typography variant="body2" sx={{ color: '#fff', fontWeight:"600",marginTop:"20px" }}>
                                         *You may hover/click the point in the graph to check price
                                      </Typography>
    </Box>
  );
}