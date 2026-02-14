export const projects = [
  {
    id: 'movie-rec',
    title: 'Movie Recommendation System',
    category: ['AI/ML', 'Data Science'],
    description: 'Hybrid recommendation engine combining collaborative filtering (SVD) and content-based filtering (TF-IDF). Processes 100k+ ratings to deliver personalized suggestions.',
    tech: ['Python', 'Scikit-learn', 'Flask', 'Pandas'],
    metrics: ['RMSE: 0.89', 'Latency: <50ms'],
    image: '/media/movie-rec-thumb.jpg', // Placeholder path
    repoUrl: 'https://github.com/jivi001/Movie-Recommendation-System',
    demoUrl: null,
    featured: true
  },
  {
    id: 'hybrid-nids',
    title: 'Hybrid NIDS',
    category: ['AI/ML', 'Cybersecurity'],
    description: 'Network Intrusion Detection System combining Random Forest and Isolation Forest for robust anomaly detection. Features optimized preprocessing and real-time threat analysis.',
    tech: ['Python (Scikit-learn)', 'Pandas', 'Flask', 'Docker'],
    metrics: ['99% Detection Rate', 'Low False Positives'],
    image: '/media/nids-thumb.jpg', 
    repoUrl: 'https://github.com/jivi001/Hybrid-NIDS',
    demoUrl: null,
    featured: true
  },
  {
    id: 'allocation-engine',
    title: 'Smart Allocation Engine',
    category: ['AI/ML', 'Full Stack'],
    description: 'Multi-objective optimization system for internship allocation. Uses cosine similarity to match candidate skills with role requirements while adhering to fairness constraints.',
    tech: ['Python', 'FastAPI', 'React', 'MongoDB'],
    metrics: ['96% Match Rate', '95% Time Reduction'],
    image: '/media/allocation-thumb.jpg', 
    repoUrl: 'https://github.com/jivi001/PM-internship-AI-engine-prototype',
    demoUrl: null,
    featured: true
  },
  {
    id: 'portfolio-v2',
    title: 'Portfolio V2',
    category: ['Full Stack', 'Frontend'],
    description: 'Previous iteration of this portfolio. Focused on CSS animations and clean HTML/JS structure.',
    tech: ['HTML', 'Tailwind', 'JavaScript'],
    metrics: ['100 Lighthouse Perf'],
    image: '/media/portfolio-v2.jpg',
    repoUrl: 'https://github.com/jivi001/portfolio',
    demoUrl: null,
    featured: false
  }
];

export const categories = ['All', 'AI/ML', 'Data Science', 'Cybersecurity', 'Full Stack', 'Frontend'];
