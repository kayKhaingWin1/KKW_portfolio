import Header from "./components/Header";
import Background from "./components/Background";
import Skill from "./components/Skill";
import ProjectList from "./components/ProjectList";
import Experience from "./components/Experience";
import About from "./components/About";
import ContactForm from "./components/ContactForm";

export default function App() {
  return (
    <div id="scroll-root" className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      <Header />
      <Background />
      <Skill />
      <ProjectList />
      <Experience />
      <About />
      <ContactForm />
    </div>
  );
}
