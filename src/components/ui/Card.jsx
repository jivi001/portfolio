import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      className={`glass-strong rounded-2xl p-6 ${className}`}
      whileHover={hover ? { y: -5, borderColor: 'rgba(34, 211, 238, 0.4)' } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
