"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { FormEvent, ReactEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/mainPage/sidebar";
import MainSection from "../../components/mainPage/mainSection";
import React from "react";



export default function mainPage() {

  const router = useRouter()


  return (
<>


<MainSection></MainSection>

</>
  );
}
