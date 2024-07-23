import React, { useState, useEffect } from 'react';
import '../Projects/Project.css';
import chartter_logo from '../../assets/chartter_logo.png';
import fridgemate_logo from '../../assets/fridgemate.png'
import ankur from '../../assets/logo_full.png'

const specificRepos = [
  { name: 'chartter', logo: chartter_logo },
  { name:'FridgeMate', logo: fridgemate_logo},
  { name:'AnkurVasani2', logo: ankur}
];

const fetchGitHubProjects = async () => {
  const response = await fetch('https://api.github.com/users/ankurvasani2/repos');
  const data = await response.json();
  return data.filter(repo => specificRepos.some(specificRepo => specificRepo.name === repo.name));
};

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const projects = await fetchGitHubProjects();
      setProjects(projects);
    };

    getProjects();
  }, []);

  const getLogoForRepo = (repoName) => {
    const repo = specificRepos.find(specificRepo => specificRepo.name === repoName);
    return repo ? repo.logo : 'path/to/default_logo.png';
  };

  return (
    <div className="project">
      <div className="head">
        <span>Discover my recent</span>
        <h1>Projects</h1>
      </div>

      <div className="projects">
        {projects.map((project) => (
          <div className="container" key={project.id}>
            <img src={getLogoForRepo(project.name)} alt={project.name} className='logo'/>
            <p className='project-text'>{project.description}</p>
            <div className="project-btns">
              <button onClick={() => window.open(project.html_url, '_blank')}>Github</button>
              {project.homepage && <button onClick={() => window.open(project.homepage, '_blank')}>Visit Project</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
