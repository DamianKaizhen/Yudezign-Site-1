import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const hasVideo = !!project.videos && project.videos.length > 0;
  const categoryColors = {
    kitchens: 'bg-primary',
    closets: 'bg-primary-light',
    vanities: 'bg-accent',
    custom: 'bg-primary-dark',
    commercial: 'bg-accent-dark',
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className={`${categoryColors[project.category]} text-white text-xs font-semibold px-3 py-1 rounded-full capitalize`}>
            {project.category}
          </span>
        </div>
        {/* Video Play Badge */}
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
          </div>
        )}
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-semibold text-lg">{hasVideo ? 'Watch Video' : 'View Details'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{project.title}</h3>
        {project.location && (
          <p className="text-sm text-neutral-600 mb-3">{project.location}</p>
        )}
        <p className="text-neutral-700 text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Features */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Finish:</span>
            <span className="font-medium text-neutral-900">{project.finish}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Turnaround:</span>
            <span className="font-medium text-primary">{project.turnaroundTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
