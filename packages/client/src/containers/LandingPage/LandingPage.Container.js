import React, { useEffect, useState, useCallback } from 'react';
import { apiURL } from '../../apiURL';
import { Button } from '../../components/Button/Button.component';
import './LandingPage.Style.css';

export const LandingPage = () => {
  const [editingTasks, setEditingTasks] = useState([]);
  const [editingTasksTitles, setEditingTasksTitles] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskTitleUpdated, setTaskTitleUpdated] = useState('');
  const [taskDescriptionUpdated, setTaskDescriptionUpdated] = useState('');

  // const fetchTasks = useCallback(() => {
  //   const url = `${apiURL()}/tasks`;
  //   fetch(url, {
  //     headers: {
  //       token: `token ${user?.uid}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((items) => {
  //       setTasks(items);
  //     });
  // }, [user]);

  const fetchTasks = useCallback(() => {
    const url = `${apiURL()}/tasks`;
    fetch(url)
      .then((res) => res.json())
      .then((items) => {
        setTasks(
          items.map((item) => {
            return {
              id: item.id,
              title: item.title,
              description: item.description,
              editing: false,
            };
          }),
        );
      });
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  console.log(tasks);

  // const addTask = (key) => {
  //   fetch(`${apiURL()}/tasks`, {
  //     method: 'POST',
  //     headers: {
  //       token: `token ${user?.uid}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       title: key,
  //       description: description,
  //     }),
  //   }).then((res) => {
  //     if (res.ok) {
  //       fetchTasks();
  //     }
  //   });
  // };

  const addTask = (title, description) => {
    fetch(`${apiURL()}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    }).then((res) => {
      if (res.ok) {
        fetchTasks();
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(taskTitle, taskDescription);
  };

  const updateTask = (tasksId) => {
    const filteredTask = tasks.filter(
      (task) => parseInt(task.id, 10) === parseInt(tasksId, 10),
    );
    fetch(`${apiURL()}/tasks/${tasksId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: filteredTask[0].title,
        description: filteredTask[0].description,
      }),
    }).then((res) => {
      if (res.ok) {
        const newTasks = tasks.map((task) => {
          if (task.id === tasksId) {
            return { ...task, editing: false };
          }
          return task;
        });
        setTasks(newTasks);
      }
    });
  };

  const handleUpdate = (event, id) => {
    event.preventDefault();
    updateTask(id);
  };

  const handleTasksEditing = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, editing: true };
      }
      return task;
    });

    setTasks(newTasks);
  };

  const handleTasksEditingTitle = (id, title) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title };
      }
      return task;
    });

    setTasks(newTasks);
  };

  const handleTasksEditingDescription = (id, description) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, description };
      }
      return task;
    });

    setTasks(newTasks);
  };

  // const handleDeleteTasks = (tasksId) => {
  //   const deleteTasks = async () => {
  //     const response = await fetch(`${apiURL()}/tasks/${tasksId} `, {
  //       method: 'DELETE',
  //       headers: {
  //         token: `token ${user?.uid}`,
  //       },
  //     });

  //     if (response.ok) {
  //       fetchTasks();
  //     }
  //   };

  //   deleteTasks();
  // };

  const handleDeleteTasks = (tasksId) => {
    const deleteTasks = async () => {
      const response = await fetch(`${apiURL()}/tasks/${tasksId} `, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTasks();
      }
    };

    deleteTasks();
  };

  return (
    <section className="landing-page-container">
      <h1>Task manager</h1>
      <div className="tasks-container-wrapper">
        <div className="tasks-container">
          {tasks.map((task, id) => (
            <div className="task-container" key={task.id}>
              {!task.editing && (
                <>
                  <span>{`${id + 1}. ${task.title} (${
                    task.description
                  })`}</span>
                  <Button
                    label="Edit"
                    onClick={() => {
                      handleTasksEditing(task.id);
                    }}
                  />
                </>
              )}
              {task.editing && (
                <>
                  <span>{`${id + 1}.`} </span>
                  <form
                    className="edit-task-form"
                    onSubmit={(event) => {
                      handleUpdate(event, task.id);
                    }}
                  >
                    <label>Task title:</label>
                    <input
                      type="text"
                      required
                      value={task.title}
                      onChange={(e) => {
                        handleTasksEditingTitle(task.id, e.target.value);
                      }}
                    />
                    <label>Task description:</label>
                    <input
                      type="text"
                      required
                      value={task.description}
                      onChange={(e) => {
                        handleTasksEditingDescription(task.id, e.target.value);
                      }}
                    />
                    <Button type="submit" primary label="Save" />
                  </form>
                </>
              )}

              <Button
                primary
                backgroundColor="#F54D4D"
                label="Delete"
                onClick={() => {
                  handleDeleteTasks(task.id);
                }}
              />
            </div>
          ))}
          <form className="add-task-form" onSubmit={handleSubmit}>
            <label>Task title:</label>
            <input
              type="text"
              required
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
              }}
            />
            <label>Task description:</label>
            <input
              type="text"
              required
              value={taskDescription}
              onChange={(e) => {
                setTaskDescription(e.target.value);
              }}
            />
            <Button type="submit" primary label="Add a task" />
          </form>
        </div>
      </div>
    </section>
  );
};
