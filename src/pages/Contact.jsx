import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Contact | Jivitesh</title>
        <meta name="description" content="Get in touch for collaborations, consulting, or freelance projects." />
      </Helmet>

      <Section className="min-h-screen flex items-center pt-24">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto w-full">
            {/* Left Col */}
            <div>
                 <h1 className="text-5xl font-bold mb-6">
                    Let's Build <br/>
                    <span className="gradient-text">Something Great</span>
                </h1>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    I'm currently available for freelance projects and open to new opportunities. 
                    If you have an idea or need help scaling your AI infrastructure, dropping a line is the best way to start.
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

            {/* Right Col - Form */}
            <Card className="p-8">
                {submitted ? (
                     <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-2xl mb-4">
                            ✓
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-slate-400">I'll get back to you within 24 hours.</p>
                        <Button variant="outline" className="mt-8" onClick={() => setSubmitted(false)}>Send Another</Button>
                     </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                required
                                value={formState.name}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                required
                                value={formState.email}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                required
                                rows="4"
                                value={formState.message}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                        <Button type="submit" className="w-full flex justify-center" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                    </form>
                )}
            </Card>
        </div>
      </Section>
    </>
  );
};

export default Contact;
