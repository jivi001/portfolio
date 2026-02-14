import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const caseStudies = [
  {
    id: 'smart-allocation',
    title: 'Smart Allocation Engine',
    client: 'EdTech Startup',
    metric: '95% Efficiency Gain',
    summary: 'Automating the internship allocation process for 500+ candidates using a multi-objective optimization algorithm.',
    image: '/media/allocation-thumb.jpg'
  },
  {
    id: 'nids-optimization',
    title: 'Hybrid NIDS Optimization',
    client: 'Cybersecurity Research',
    metric: '99.8% Detection Rate',
    summary: 'Optimizing a Network Intrusion Detection System using Recursive Feature Elimination and Ensemble Learning.',
    image: '/legacy_static/assets/nids-thumb.jpg' 
  }
];

const CaseStudies = () => {
  return (
    <>
      <Helmet>
        <title>Case Studies | Jivitesh</title>
        <meta name="description" content="Deep dives into complex AI and engineering challenges." />
      </Helmet>

      <Section className="pt-32 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">
            Case <span className="text-cyan-400">Studies</span>
          </h1>

          <div className="space-y-12">
            {caseStudies.map((study) => (
              <Card key={study.id} className="group relative overflow-hidden border-slate-800 bg-slate-900/40 p-0">
                 <div className="grid md:grid-cols-2 gap-0">
                    <div className="h-64 md:h-auto bg-slate-800 relative">
                        {/* Placeholder for actual image */}
                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                            {study.id === 'smart-allocation' ? '🧩' : '🛡️'}
                        </div>
                    </div>
                    
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="text-cyan-400 font-mono text-xs mb-4 uppercase tracking-wider">{study.client}</div>
                        <h2 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">{study.title}</h2>
                        <p className="text-slate-400 mb-6 leading-relaxed">{study.summary}</p>
                        
                        <div className="mb-8">
                            <div className="text-3xl font-bold text-white mb-1">{study.metric}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest">Key Result</div>
                        </div>

                        <Button href={`/case-studies/${study.id}`} variant="outline">Read Case Study</Button>
                    </div>
                 </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export default CaseStudies;
