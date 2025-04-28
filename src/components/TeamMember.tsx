
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
  bgColor = "bg-gradient-to-br from-purple-100/20 via-teal-100/20 to-rose-100/20"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="flex flex-col md:flex-row h-full overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${bgColor} p-6 md:w-1/2 lg:w-2/5 relative`}>
        <div className="mb-4">
          <p className="text-sm text-white/80">{position}</p>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white member-name">{name.split(' ')[0]}</h3>
            <h3 className="text-2xl font-bold text-white">{name.split(' ').slice(1).join(' ')}</h3>
          </div>
          
          {linkedinUrl && (
            <a 
              href={linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 transition-all duration-200 ${isHovered ? 'opacity-100 scale-105' : 'opacity-0'}`}
            >
              <ArrowUpRight className="text-white w-6 h-6" />
            </a>
          )}
        </div>
      </div>
      
      <div className="md:w-1/2 lg:w-3/5">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full  md:h-[650px] h-[500px] object-cover transition-transform duration-300 hover:scale-105" 
        />
      </div>
    </div>
  );
};

export default TeamMember;
