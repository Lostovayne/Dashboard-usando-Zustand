import { useState } from "react";
import { IoAddOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { Task, TaskStatus } from "../../interfaces/task.interface";
import { cn } from "../../libs/utils";
import { useTaskStore } from "../../stores";
import SingleTask from "./SingleTask";

interface Props {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

export const JiraTasks = ({ title, status, tasks }: Props) => {
  // state de zustand
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const removeDraggingTaskId = useTaskStore((state) => state.removeDraggingTaskId);
  const addTask = useTaskStore((state) => state.addTask);
  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {
    await Swal.fire({
      title: "Nueva Tarea",
      input: "text",
      inputLabel: "Ingresa el nombre de la nueva tarea",
      inputPlaceholder: "Tarea 1",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Añadir",
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        addTask(value, status);
      },
      inputValidator: (value) => {
        if (!value) {
          return "Debes Ingresar un Nombre Para la Tarea!";
        }
      },
    });
    // addTask("Nuevo Titulo", value);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
    removeDraggingTaskId();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDragLeave}
      onDragLeave={handleDrop}
      className={cn(
        "relative flex flex-col border-4 bg-white shadow-3xl shadow-shadow-500 !p-4 3xl:p-![18px] bg-clip-border  rounded-[20px] w-full !text-black",
        {
          "border-dotted border-blue-700": isDragging,
        },
        {
          "border-dashed border-emerald-500": isDragging && onDragOver,
        }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center bg-indigo-100 rounded-full w-9 h-9">
            <span className="flex justify-center items-center w-6 h-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 font-bold text-navy-700 text-xl">{title}</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="w-full h-full">
        {tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
