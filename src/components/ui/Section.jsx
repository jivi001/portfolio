const Section = ({ id, className = '', children }) => {
  return (
    <section id={id} className={`py-20 px-6 md:px-12 relative ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export default Section;
