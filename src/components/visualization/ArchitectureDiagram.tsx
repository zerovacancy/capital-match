import React from 'react';

interface ArchitectureDiagramProps {
  className?: string;
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <img 
        src="/assets/images/home/architecture/data-sources/System Architecture Overview.webp" 
        alt="Capital Match System Architecture Overview" 
        className="w-full h-auto"
      />
    </div>
  );
};

export default ArchitectureDiagram;
