import { Task } from "../interfaces/Task";

class TaskManager {
  private tasks: Task[] = []
  private nextId: number = 1

  //agregar tarea
  addTask(title: string): void {
    const newTask: Task = {
      id: this.nextId++,
      title: title,
      completed: false,
    };

    this.tasks = [...this.tasks, newTask]
  }

  //eliminar tarea
  deleteTask(id: number): void {
    const indexTask: number = this.tasks.findIndex((task) => task.id === id)
    
    //Valida que exista la tarea
    if (indexTask === -1) {
      return console.error(`La tarea con id ${id} no existe.`)
    }

    this.tasks = this.tasks.filter((task) => task.id !== id)
  }

  //completar tarea
  setCompleteTask(id: number): void {
    const task: Task | undefined = this.tasks.find((task) => task.id === id)

    //Manejo de error
    if (!task) {
      return console.error(`La tarea con id ${id} no existe.`);
    }

    task.completed = true
    this.tasks = this.tasks.map((item) => (item.id === id ? task : item))
  }

  listTasks(): Task[] {
    return this.tasks;
  }
}

export default TaskManager;
