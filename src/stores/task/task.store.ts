/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { Task, TaskStatus } from "../../interfaces/task.interface";

interface TaskState {
  tasks: Record<string, Task>;
  //metodos
  getTaskByStatus: (status: TaskStatus) => Task[];
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
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
});

export const useTaskStore = create<TaskState>()(devtools(storeApi));
