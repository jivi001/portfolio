const Footer = () => {
  return (
    <footer className="border-t border-slate-800 py-12 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Jivitesh. Built with React, Tailwind & Vite.</p>
      </div>
    </footer>
  );
};

export default Footer;
