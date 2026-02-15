export const projects = [
  {
    id: 'hybrid-nids',
    title: 'Hybrid Network Intrusion Detection System',
    category: ['AI/ML', 'Cybersecurity'],
    description: 'Production-grade ML system combining Random Forest (supervised) and Isolation Forest (unsupervised) for detecting known attacks and zero-day anomalies. Features optimized preprocessing, SMOTE balancing, and real-time threat analysis.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'Docker'],
    metrics: ['99.2% Detection Rate', '2.1% False Positive Rate', 'Real-time Analysis'],
    image: '/media/nids-thumb.jpg', 
    repoUrl: 'https://github.com/jivi001/Network-IDS-ML',
    demoUrl: null,
    featured: true
  },
  {
    id: 'movie-rec',
    title: 'Hybrid Movie Recommendation System',
    category: ['AI/ML', 'Data Science'],
    description: 'Intelligent recommendation engine combining collaborative filtering (SVD) and content-based filtering (TF-IDF). Processes 100k+ ratings to deliver personalized movie suggestions with low latency.',
    tech: ['Python', 'Scikit-learn', 'Flask', 'Pandas', 'NumPy'],
    metrics: ['RMSE: 0.89', 'Latency: <50ms', '100k+ Ratings Processed'],
    image: '/media/movie-rec-thumb.jpg',
    repoUrl: 'https://github.com/jivi001/Movie-Recommendation-System',
    demoUrl: null,
    featured: true
  },
  {
    id: 'allocation-engine',
    title: 'AI-Powered Smart Allocation Engine',
    category: ['AI/ML', 'Full Stack'],
    description: 'Multi-objective optimization system for PM Internship Scheme allocation. Uses cosine similarity and TF-IDF for intelligent candidate-role matching while ensuring fairness constraints and geographic distribution.',
    tech: ['Python', 'FastAPI', 'React', 'Firebase', 'Scikit-learn'],
    metrics: ['96% Match Accuracy', '95% Time Reduction', 'Multi-stage ML Pipeline'],
    image: '/media/allocation-thumb.jpg', 
    repoUrl: 'https://github.com/jivi001/PM-internship-AI-engine-prototype',
    demoUrl: null,
    featured: true
  },
  {
    id: 'route-ai',
    title: 'Route AI - Smart Logistics Platform',
    category: ['AI/ML', 'Full Stack'],
    description: 'AI-powered logistics route optimization platform combining Dijkstra\'s algorithm with Google Gemini AI for intelligent delivery planning across Indian cities. Features toll calculation and real-time route analysis.',
    tech: ['Python', 'Flask', 'React', 'Google Gemini AI', 'NetworkX'],
    metrics: ['Multi-city Support', 'AI Command Center', 'Real-time Optimization'],
    image: '/media/route-ai-thumb.jpg',
    repoUrl: 'https://github.com/jivi001/logistics_optimizer_desktop',
    demoUrl: null,
    featured: true
  },
  {
    id: 'kokoro',
    title: 'KOKORO - Mental Wellness Mirror',
    category: ['AI/ML', 'Full Stack'],
    description: 'Privacy-first GenAI journaling prototype with emotion analysis. Features local-first encrypted storage, real-time sentiment tracking using Gemini AI, and contextual wellness insights via WebSocket updates.',
    tech: ['Node.js', 'Express', 'React', 'MongoDB', 'Google Gemini', 'Socket.io'],
    metrics: ['Real-time Analysis', 'End-to-End Encryption', 'Privacy-First Design'],
    image: '/media/kokoro-thumb.jpg',
    repoUrl: 'https://github.com/jivi001/kokoro',
    demoUrl: null,
    featured: false
  },
  {
    id: 'portfolio-v2',
    title: 'Portfolio V2',
    category: ['Frontend'],
    description: 'Previous iteration of portfolio website. Clean HTML/CSS/JS implementation with focus on performance optimization and modern animations.',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript'],
    metrics: ['100 Lighthouse Performance', 'Responsive Design'],
    image: '/media/portfolio-v2.jpg',
    repoUrl: 'https://github.com/jivi001/portfolio',
    demoUrl: null,
    featured: false
  }
];

export const categories = ['All', 'AI/ML', 'Cybersecurity', 'Data Science', 'Full Stack', 'Frontend'];
