import MiniHero from "../components/Hero/MiniHero";
import HowWork from "../components/HowWork/HowWork";

export default function HowWorkMain() {

  return (
    <>
      <MiniHero heading={'How it Works'} noButtons={true} />
      <HowWork />
    </>
  );
}