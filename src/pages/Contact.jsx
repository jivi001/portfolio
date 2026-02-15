import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Jivitesh</title>
        <meta name="description" content="Get in touch for cybersecurity and AI/ML consulting, projects, and opportunities." />
      </Helmet>

      <Section className="min-h-screen flex items-center pt-24">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto w-full">
            {/* Left Col */}
            <div>
                 <h1 className="text-5xl font-bold mb-6">
                    Let's Collaborate on <br/>
                    <span className="gradient-text">Secure AI Solutions</span>
                </h1>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    I'm available for consulting, freelance projects, and full-time opportunities in cybersecurity and AI/ML engineering. 
                    Whether you need threat detection systems, ML infrastructure, or security architecture—let's discuss how I can help.
                </p>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400">
                             ✉️
                        </div>
                        <div>
                            <div className="text-sm text-slate-500 font-mono">EMAIL</div>
                            <a href="mailto:jiviteshgd28@gmail.com" className="text-white hover:text-cyan-400 transition-colors">jiviteshgd28@gmail.com</a>
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400">
                             🔗
                        </div>
                        <div>
                            <div className="text-sm text-slate-500 font-mono">SOCIAL</div>
                            <div className="flex gap-4">
                                <a href="https://www.linkedin.com/in/jivi001/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors">LinkedIn</a>
                                <a href="https://github.com/jivi001" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors">GitHub</a>
                                <a href="https://www.instagram.com/exu_01/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors">Instagram</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Col - Direct Email CTA */}
            <Card className="p-8 flex flex-col justify-center">
                <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                        📧
                    </div>
                    <h2 className="text-3xl font-bold text-white">Ready to Connect?</h2>
                    <p className="text-slate-400 text-lg">
                        Click the button below to send me an email directly. I typically respond within 24 hours.
                    </p>
                    <a 
                        href="mailto:jiviteshgd28@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Jivitesh%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss..."
                        className="inline-block"
                    >
                        <Button className="w-full sm:w-auto px-8 py-4 text-lg">
                            📨 Email Me
                        </Button>
                    </a>
                    <div className="pt-6 border-t border-slate-700">
                        <p className="text-sm text-slate-500 mb-3">Or connect with me on:</p>
                        <div className="flex justify-center gap-4">
                            <a 
                                href="https://www.linkedin.com/in/jivi001/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors text-sm"
                            >
                                LinkedIn
                            </a>
                            <a 
                                href="https://github.com/jivi001" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors text-sm"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
      </Section>
    </>
  );
};

export default Contact;
