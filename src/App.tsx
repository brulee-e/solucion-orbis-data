import { useState } from "react";
import TaskManager from "./components/TaskManager";
import TaskList from "./components/TaskList";
import { Task } from "./interfaces/Task";
import { Toaster, toast } from "sonner";
import "./App.css";

const App = () => {
  const [taskManager] = useState(new TaskManager());
  const [tasks, setTasks] = useState<Task[]>(taskManager.listTasks());
  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask !== "") {
      taskManager.addTask(newTask);
      setTasks(taskManager.listTasks());
      setNewTask("");
      toast.success("Tarea agregada");
    } else {
      return toast.warning("Ingresa el nombre de la tarea");
    }
  };

  const handleDeleteTask = (id: number) => {
    const isTaskExist = taskManager.listTasks().find((task) => task.id === id);

    if (!isTaskExist) {
      toast.error("La tarea no existe");
      return;
    }

    taskManager.deleteTask(id);
    setTasks(taskManager.listTasks());
    toast.success("Tarea eliminada");
  };

  const handleCompleteTask = (id: number) => {
    taskManager.setCompleteTask(id);
    setTasks(taskManager.listTasks());

    const istaskComplete = tasks.find((task) => task.id === id);

    if (!istaskComplete?.completed) {
      return toast.error("Ha ocurrido un error al intentar completar la tarea");
    }

    toast.success("Tarea completada");
  };

  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.preventDefault();
    toast.warning("Ingresa el nombre de la tarea");
  };

  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <h1>Task Manager</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onInvalid={handleInvalid}
          required
        />
        <button type="submit">Crear tarea</button>
      </form>
      <TaskList
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        handleCompleteTask={handleCompleteTask}
      />
    </div>
  );
};

export default App;
