import './App.css';
import Header from './components/Header';
import Task from './components/Task';
import AddTask from './components/AddTask';
import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/todos';

function App() {
  const [tasks, setTasks] = useState([]);
  const [pinnedTask, setPinnedTask] = useState([]);
  const [unpinnedTask, setUnpinnedTask] = useState([]);
  const [editable, setEditable] = useState(null);
  const [pinnedId, setPinedId] = useState(null);

  const getTasks = () => {
    axios.get(URL).then((resp) => {
      setTasks(resp.data);
    });
  };

  const addTask = (task) => {
    axios.post(URL, task).then(() => getTasks());
  };

  const editTask = (task) => {
    console.log(task, 'before');
    if (!tasks.find((el) => el.id === task.id)) return;
    console.log(task, 'after');
    axios.put(`${URL}/${task.id}`, task).then(() => getTasks());
  };

  const removeTask = (id) => {
    axios.delete(`${URL}/${id}`).then(() => getTasks());
  };

  const onFormReset = () => {
    setEditable(null);
  };

  const onPin = (id) => {
    setPinedId(id === pinnedId ? null : id);
  };

  useEffect(() => {
    setPinnedTask(tasks.filter((el) => el.id === pinnedId));
    setUnpinnedTask(tasks.filter((el) => el.id !== pinnedId));
  }, [pinnedId, tasks]);

  useEffect(() => {
    getTasks();
  }, []);

  const onEdit = (id) => {
    const element = tasks.find((el) => el.id === id);
    setEditable(element ? element.id : null);
    window.scrollTo(0, 0);
  };

  return (
    <div className='container-sm d-flex flex-column justify-content-center align-items-center p-4 gap-3'>
      <Header />
      <AddTask
        onSubmit={addTask}
        editData={tasks.find((el) => el.id === editable)}
        onEdit={editTask}
        onReset={onFormReset}
      />
      {pinnedTask &&
        pinnedTask.map((el) => (
          <Task
            key={el.id}
            data={el}
            onRemove={() => removeTask(el.id)}
            onPin={() => onPin(el.id)}
            onEdit={() => onEdit(el.id)}
            pinned
          />
        ))}
      {unpinnedTask.map((el) => (
        <Task
          key={el.id}
          data={el}
          onRemove={() => removeTask(el.id)}
          onPin={() => onPin(el.id)}
          onEdit={() => onEdit(el.id)}
        />
      ))}
    </div>
  );
}

export default App;
