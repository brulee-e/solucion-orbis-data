import { Task } from "../interfaces/Task";

interface TaskListProps {
  tasks: Task[]
  handleDeleteTask: (id: number) => void
  handleCompleteTask: (id: number) => void
}

const TaskList = ({ tasks, handleDeleteTask, handleCompleteTask }: TaskListProps) => {
  
    const completedTasks = tasks.filter((task) => task.completed)
    const incompletedTasks = tasks.filter((task) => !task.completed)

  return (
    <>
      <h2>Tareas completadas</h2>
      <ul>
        {completedTasks.length !== 0 ? completedTasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
          </li>
        )) : <p>Aún no hay tareas</p>}
      </ul>
      <h2>Tareas incompletas</h2>
      <ul>
        {incompletedTasks.length !== 0 ? incompletedTasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => handleCompleteTask(task.id)}>
              Completar
            </button>
          </li>
        )): <p>Aún no hay tareas</p>}
      </ul>
    </>
  );
};

export default TaskList;
