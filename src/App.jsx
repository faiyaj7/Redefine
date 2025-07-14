import "./App.css";
import About from "./components/About";
import Hero from "./components/Hero";
import gsap, { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
gsap.registerPlugin(ScrollTrigger, SplitText);
function App() {
  return (
    <main className="min-h-screen w-screen relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
}

export default App;
