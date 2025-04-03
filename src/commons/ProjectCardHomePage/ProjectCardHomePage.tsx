
import React from 'react';

interface ProjectCardHomePageProps {
  src: string;   // Assuming `src` is a string (like an image URL)
  link: string | null;  // Assuming `link` is a string (URL)
  h3: string;    // Assuming `h3` is a string (the content for the h3 tag)
  p: string;     // Assuming `p` is a string (the content for the p tag)
}

const ProjectCardHomePage: React.FC<ProjectCardHomePageProps> = ({ src, link, h3, p }) => {
  return link === null ? (
    <a href="#projects">
      <img className="hover" src={src} alt={`${h3} logo`} />
      <h3>{h3}</h3>
      <p>{p}</p>
    </a>
  ) : (
    <a href={link} target="_blank">
      <img className="hover" src={src} alt={`${h3} logo`} />
      <h3>{h3}</h3>
      <p>{p}</p>
    </a>
  );
}

export default ProjectCardHomePage;
