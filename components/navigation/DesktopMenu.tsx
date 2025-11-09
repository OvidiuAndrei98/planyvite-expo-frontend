"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";
import PlanyviteLogo from "@/public/planyvite_logo.svg";
import { Button } from "../ui/button";
import "./DesktopNavigation.css";

const DesktopMenu = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  return (
    <div className={`home-page-navigation ${scroll ? "fixed" : ""}`}>
      <div>
        <Image src={PlanyviteLogo} alt="logo" width={140} height={140} />
      </div>
      <ul className="homepage-nav-menu">
        <li className="nav-item">
          <Link href="#first-section">Acasă</Link>
        </li>
        <li className="nav-item">
          <Link href="/catalog-furnizori">Catalog Furnizori</Link>
        </li>
        <li className="nav-item">
          <Link href="#features-section">Ești furnizor?</Link>
        </li>
        <li className="nav-item">
          <Link href="#planner-section">Cum funcționează</Link>
        </li>
      </ul>
      <Button
        size="lg"
        onClick={() => {
          window.location.href = "/login";
        }}
      >
        Intră în cont
      </Button>
    </div>
  );
};

export default DesktopMenu;
