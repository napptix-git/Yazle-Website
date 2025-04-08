
import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  position: string;
  imageSrc: string;
  linkedinUrl?: string;
  bgColor?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  position, 
  imageSrc,
  linkedinUrl,
  bgColor = "bg-[#2f2b3a]" // Darker background color to match screenshot
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="flex flex-col md:flex-row h-full overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${bgColor} p-8 md:w-2/5 relative flex flex-col justify-between`}>
        <div>
          <p className="text-sm text-white/80 mb-6">{position}</p>
          
          <div className="mt-auto">
            <h3 className="text-3xl font-bold text-white mb-1 member-name">{name.split(' ')[0]}</h3>
            <h3 className="text-3xl font-bold text-white">{name.split(' ').slice(1).join(' ')}</h3>
          </div>
        </div>
        
        {linkedinUrl && (
          <div className="mt-8">
            <a 
              href={linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-flex transition-all duration-200 ${isHovered ? 'translate-x-1' : ''}`}
            >
              <ArrowUpRight className="text-white w-6 h-6" />
            </a>
          </div>
        )}
      </div>
      
      <div className="md:w-3/5">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

export default TeamMember;
