
import React, { useState, useEffect, useRef } from 'react';

interface CountUpMetricProps {
  end: number;
  duration: number;
  prefix?: string;
  suffix?: string;
  title: string;
  description?: string;
}

const CountUpMetric: React.FC<CountUpMetricProps> = ({ 
  end, 
  duration, 
  prefix = '', 
  suffix = '', 
  title,
  description
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationStarted = useRef(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1
      }
    );
    
    const currentRef = countRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  useEffect(() => {
    if (isVisible && !animationStarted.current) {
      animationStarted.current = true;
      let startTimestamp: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [isVisible, end, duration]);
  
  // Format large numbers with commas
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return (
    <div 
      ref={countRef} 
      className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 hover:border-[#29dd3b]/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(41,221,59,0.1)]"
    >
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="text-3xl md:text-4xl font-bold text-[#29dd3b] my-4">
        {prefix}{formattedCount}{suffix}
      </div>
      {description && (
        <p className="text-napptix-light-grey text-sm">{description}</p>
      )}
    </div>
  );
};

export default CountUpMetric;
