import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ProjectCard = ({ project }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden group">
      {/* Image Placeholder / Thumbnail */}
      <div className="h-48 bg-slate-800 rounded-t-xl mb-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
        {/* We can Replace with actual img tag when assets are ready */}
        <div className="w-full h-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
         {project.id === 'movie-rec' ? '🎬' : project.id === 'allocation-engine' ? '🎯' : '💻'}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
            {project.title}
            </h3>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
            {project.category.map(cat => (
                <Badge key={cat} variant="cyan" className="text-[10px]">{cat}</Badge>
            ))}
        </div>

        <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
            {project.description}
        </p>

        {project.metrics && (
             <div className="mb-6 grid grid-cols-2 gap-2">
                {project.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-slate-950/50 rounded-lg p-2 text-center border border-slate-800">
                        <span className="text-xs font-mono text-cyan-400 block">{metric}</span>
                    </div>
                ))}
            </div>
        )}

        <div className="flex gap-3 mt-auto">
            {project.repoUrl && (
                <Button variant="outline" href={project.repoUrl} target="_blank" className="flex-1 text-center justify-center">
                    GitHub
                </Button>
            )}
             {project.demoUrl && (
                <Button variant="primary" href={project.demoUrl} target="_blank" className="flex-1 text-center justify-center">
                    Live Demo
                </Button>
            )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
