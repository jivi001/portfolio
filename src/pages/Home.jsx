import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import FadeIn from '../components/ui/FadeIn';

const Home = () => {
  return (
    <>
      <Section className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center max-w-4xl mx-auto">
          <FadeIn delay={0.1}>
            <p className="text-cyan-400 font-mono text-sm tracking-widest mb-6">
              AI & DATA SCIENCE ENGINEER
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Building <span className="gradient-text">Scalable & Secure</span><br />
              Intelligent Systems
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Focused on Machine Learning optimization, Cloud infrastructure, and Cybersecurity — 
              where intelligent systems must not only perform, but also scale and defend.
            </p>
          </FadeIn>
          <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/projects">View Selected Work</Button>
            <Button variant="secondary" href="/contact">Let's Collaborate</Button>
          </FadeIn>
        </div>
      </Section>
    </>
  );
};

export default Home;
