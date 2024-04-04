/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from "uuid";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Task, TaskStatus } from "../../interfaces/task.interface";
import { immer } from "zustand/middleware/immer";

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

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
  },

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

    //? usando immer como middleware
    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    //? Requiere instalación de immer
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask;
    //   })
    // );

    //? Forma nativa de usar el estado
    //   set((state) => ({
    //     tasks: {
    //       ...state.tasks,
    //       [newTask.id]: newTask,
    //     },
    //   }));
  },

  setDragginTaskId: (taskId: string): void => {
    if (get().draggingTaskId === taskId) return;
    set({ draggingTaskId: taskId });
  },
  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  changeTaskStatus: (taskId: string, status: TaskStatus): void => {
    // set((state) => {
    //   const tasks = { ...state.tasks };
    //   tasks[taskId].status = status;
    //   return { tasks };
    // });

    //? usando immer
    set((state) => {
      state.tasks[taskId].status = status;
    });
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().changeTaskStatus(taskId!, status);
    // get().removeDraggingTaskId();
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(immer(storeApi), {
      name: "task-stor",
    })
  )
);
