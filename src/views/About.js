import About from "../components/About/About";
import MiniHero from "../components/Hero/MiniHero.js";

export default function AboutMain() {

  return (
    <>
      <MiniHero heading={'About Us'} noButtons={true} />
      <About />
    </>
  );
}