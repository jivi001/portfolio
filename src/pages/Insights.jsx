import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

const insights = [
  {
    id: 'scaling-ai',
    title: 'Scaling AI Inference on Serverless Architecture',
    date: 'Oct 12, 2025',
    category: 'DevOps',
    snippet: 'Strategies to reduce cold starts and optimize latency for transformer models deployed on Lambda and Cloudflare Workers.',
    readTime: '5 min read'
  },
  {
    id: 'human-in-loop',
    title: 'The Human-in-the-Loop Pattern for Critical Systems',
    date: 'Sep 28, 2025',
    category: 'AI Ethics',
    snippet: 'Why fully autonomous systems fail in edge cases and how to design graceful handoffs to human operators.',
    readTime: '7 min read'
  }
];

const Insights = () => {
  return (
    <>
      <Helmet>
        <title>Insights | Jivitesh</title>
        <meta name="description" content="Thoughts on AI engineering, system architecture, and tech trends." />
      </Helmet>

      <Section className="pt-32 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">
            Insights <span className="text-slate-500">&</span> <span className="gradient-text">Thoughts</span>
          </h1>

          <div className="space-y-8">
            {insights.map((post) => (
              <Card key={post.id} className="group hover:border-cyan-400/30 transition-colors">
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-4">
                    <Badge variant="purple">{post.category}</Badge>
                    <span className="text-xs font-mono text-slate-500">{post.date} • {post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors cursor-pointer">
                    {post.title}
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                    {post.snippet}
                </p>
                
                <a href={`/insights/${post.id}`} className="text-cyan-400 text-sm font-semibold hover:underline decoration-cyan-400 underline-offset-4">
                    Read Article &rarr;
                </a>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Insights;
