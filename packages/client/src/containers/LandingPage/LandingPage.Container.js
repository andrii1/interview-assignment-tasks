import React, { useEffect, useState } from 'react';
import { apiURL } from '../../apiURL';
import { Button } from '../../components/Button/Button.component';
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
      <h1>Task manager</h1>
      <div className="tasks-container-outer">
        <div className="tasks-container">
          {tasks.map((task, id) => (
            <div className="task-container" key={task.id}>
              <span>{`${id + 1}. ${task.title} (${task.description})`}</span>
              <Button label="Edit" />
              <Button primary backgroundColor="#F54D4D" label="Delete" />
            </div>
          ))}
          <Button primary label="Add a task" />
        </div>
      </div>
    </div>
  );
};
