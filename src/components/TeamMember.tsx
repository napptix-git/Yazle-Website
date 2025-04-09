
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
  
  // Split the name into first name and last name
  const nameParts = name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  
  return (
    <div 
      className="flex flex-row h-full overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${bgColor} p-12 w-2/5 relative flex flex-col justify-between`}>
        <div>
          <p className="text-sm text-white/80 mb-20">{position}</p>
        </div>
        
        <div className="flex flex-col">
          <div>
            <h3 className="text-5xl font-bold text-white member-name">{firstName}</h3>
            <h3 className="text-5xl font-bold text-white">{lastName}</h3>
          </div>
          
          {linkedinUrl && (
            <a 
              href={linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 mt-6 transition-all duration-200 ${isHovered ? 'opacity-100 scale-105' : 'opacity-0'}`}
            >
              <ArrowUpRight className="text-white w-8 h-8" />
            </a>
          )}
        </div>
      </div>
      
      <div className="w-3/5">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
      </div>
    </div>
  );
};

export default TeamMember;
