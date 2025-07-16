import "./App.css";
import About from "./components/About";
import Hero from "./components/Hero";
import gsap, { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
gsap.registerPlugin(ScrollTrigger, SplitText);
function App() {
  return (
    <main className="min-h-screen w-screen relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
