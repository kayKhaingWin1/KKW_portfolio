

import Header from "./components/Header";
import Background from "./components/Background";
import Skill from "./components/Skill";
import ProjectList from "./components/ProjectList";
import About from "./components/About";
import ContactForm from "./components/ContactForm";

export default function App() {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      <Header />

      <section id="home" className="snap-start min-h-screen">
        <Background />
      </section>

      <section id="skills" className="snap-start min-h-screen">
        <Skill />
      </section>

      <section id="projects" className="snap-start min-h-screen">
        <ProjectList />
      </section>

      <section id="about" className="snap-start min-h-screen">
        <About />
      </section>

      <section id="contact" className="snap-start min-h-screen">
        <ContactForm />
      </section>
    </div>
  );
}
