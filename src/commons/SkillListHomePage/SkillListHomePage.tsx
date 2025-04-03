// src/commons/SkillListHomePage/index.tsx
import React from 'react';

interface SkillListHomePageProps {
  src: string | HTMLImageElement | null;
  skill: string;
}

const SkillListHomePage: React.FC<SkillListHomePageProps> = ({ src, skill }) => {
  return (
    <span>
      <img src={src ? (typeof src === 'string' ? src : '') : ''} alt="Checkmark icon" />
      <p>{skill}</p>
    </span>
  );
};

export default SkillListHomePage;
