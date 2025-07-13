import "./App.css";
import Hero from "./components/Hero";
import gsap, { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
function App() {
  return (
    <main className="min-h-screen w-screen relative overflow-x-hidden">
      <Hero />
      {/* <div className="bg-amber-400 opacity-0 hover:opacity-100 text-black">hello</div> */}
      <div className="h-screen"></div>
    </main>
  );
}

export default App;
