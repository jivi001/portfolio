import { Link, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import Button from '../ui/Button';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Insights', path: '/insights' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 glass-strong border-b border-slate-800' : 'py-6 bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-display tracking-tight flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">JV</span>
          Jivitesh
        </Link>
        
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.path} className={`text-sm font-medium transition-colors hover:text-cyan-400 ${location === link.path ? 'text-cyan-400' : 'text-slate-400'}`}>
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Button variant="outline" href="/contact" className="!px-5 !py-2">
              Hire Me
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
