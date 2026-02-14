const variants = {
  cyan: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  slate: 'bg-slate-800 text-slate-400 border-slate-700'
};

const Badge = ({ children, variant = 'slate', className = '' }) => {
  const variantClass = variants[variant] || variants.slate;
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border ${variantClass} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
