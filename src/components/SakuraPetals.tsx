import React, { useEffect, useState } from 'react';

const SakuraPetals: React.FC = () => {
  const [petals, setPetals] = useState<Array<{
    id: number;
    left: string;
    animationDuration: string;
    animationDelay: string;
    size: number;
  }>>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 8}s`,
      animationDelay: `${Math.random() * 8}s`,
      size: 6 + Math.random() * 4,
    }));
    
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal"
          style={{
            left: petal.left,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default SakuraPetals;