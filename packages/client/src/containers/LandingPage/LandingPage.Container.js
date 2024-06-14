import React, { useEffect, useState } from 'react';
import { apiURL } from '../../apiURL';
import './LandingPage.Style.css';

export const LandingPage = () => {
  const [tasks, setTasks] = useState([]);
  const [exampleResources, setExampleResources] = useState([]);
  useEffect(() => {
    async function fetchExampleResources() {
      const response = await fetch(`${apiURL()}/exampleResources`);
      const examples = await response.json();
      setExampleResources(examples);
    }

    fetchExampleResources();
  }, []);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(`${apiURL()}/tasks`);
      const examples = await response.json();
      setTasks(examples);
    }

    fetchTasks();
  }, []);

  return (
    <div className="landing-page-container">
      <span>Landing Page</span>
      {exampleResources.map((example) => (
        <div key={example.id}>{example.title}</div>
      ))}
      {tasks.map((example) => (
        <div key={example.id}>{example.title}</div>
      ))}
    </div>
  );
};
