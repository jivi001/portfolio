import { motion } from 'framer-motion';

const variants = {
  primary: 'btn-premium px-8 py-3',
  secondary: 'border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3 rounded-full font-semibold transition-all',
  outline: 'border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white px-6 py-2 rounded-full text-sm transition-all',
  icon: 'w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-cyan-400 transition-all border border-transparent hover:border-cyan-400/30'
};

const Button = ({ children, variant = 'primary', className = '', href, onClick, ...props }) => {
  const baseClass = `${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a 
        href={href}
        className={baseClass}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={baseClass}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
