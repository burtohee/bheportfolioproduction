// src/commons/SkillListHomePage/index.tsx
import React from 'react';

interface SkillListHomePageProps {
  src: string  | undefined;
  skill: string;
}

const SkillListHomePage: React.FC<SkillListHomePageProps> = ({ src, skill }) => {
  return (
    <span>
      <img src={src} alt="Checkmark icon" />
      <p>{skill}</p>
    </span>
  );
};

export default SkillListHomePage;
