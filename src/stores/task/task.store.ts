/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { Task, TaskStatus } from "../../interfaces/task.interface";
import { v4 as uuidv4 } from "uuid";

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;
  //metodos
  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;
  setDragginTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    "ABC-1": {
      id: "ABC-1",
      title: "Task 1",
      status: "open",
    },
    "ABC-2": {
      id: "ABC-2",
      title: "Task 2",
      status: "in-progress",
    },
    "ABC-3": {
      id: "ABC-3",
      title: "Task 3",
      status: "open",
    },

    "ABC-4": {
      id: "ABC-4",
      title: "Task 4",
      status: "open",
    },
  },

  /**
   * Returns an array of tasks with the specified status.
   * @param status The status to filter tasks by.
   * @returns An array of tasks with the specified status.
   */
  getTaskByStatus: (status: TaskStatus): Task[] => {
    const tasks: Task[] = Object.values(get().tasks);
    return tasks.filter((task: Task) => task.status === status);
  },

  addTask: (title: string, status: TaskStatus) => {
    const newTask = {
      id: uuidv4(),
      title,
      status,
    };

    set((state) => ({
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask,
      },
    }));
  },

  /**
   * Sets the ID of the task being dragged.
   * @param taskId The ID of the task being dragged.
   * @returns void
   */
  setDragginTaskId: (taskId: string): void => {
    if (get().draggingTaskId === taskId) return;
    set({ draggingTaskId: taskId });
  },
  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  /**
   * Changes the progress of a task.
   * @param taskId The ID of the task to change the progress of.
   * @param status The new status of the task.
   * @returns void
   */
  changeTaskStatus: (taskId: string, status: TaskStatus): void => {
    set((state) => {
      const tasks = { ...state.tasks };
      tasks[taskId].status = status;
      return { tasks };
    });
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().changeTaskStatus(taskId!, status);
    // get().removeDraggingTaskId();
  },
});

export const useTaskStore = create<TaskState>()(devtools(storeApi));
