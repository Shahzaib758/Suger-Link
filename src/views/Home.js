import { useEffect } from "react";
import About from "../components/About/About";
import Extra from "../components/Extra/Extra";
import Hero from "../components/Hero";
import HowWork from "../components/HowWork/HowWork";
import Story from "../components/Story/Story";

export default function Home() {

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }, [])
  

  return (
    <>
      <Hero />
      <About />
      <Story />
      <Extra />
      <HowWork />
    </>
  );
}