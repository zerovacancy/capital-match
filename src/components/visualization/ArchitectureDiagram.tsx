import React from 'react';

interface ArchitectureDiagramProps {
  className?: string;
}

/**
 * Component that displays the system architecture diagram
 */
const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <img 
        src="/assets/images/home/architecture/data-sources/System Architecture Overview.webp" 
        alt="System Architecture Overview" 
        className="w-full h-auto"
        onError={(e) => {
          console.error("Failed to load architecture diagram image");
          const target = e.target as HTMLImageElement;
          target.onerror = null; // Prevent infinite loop
          target.style.display = 'none';
        }}
      />
    </div>
  );
};

export default ArchitectureDiagram;
