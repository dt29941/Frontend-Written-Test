"use client";
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';

import React from 'react';
import Priceboard from '../../components/dashboard/priceBoard';


ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

export default function Dashboard() {


  return (
 <Priceboard/>
  );
}