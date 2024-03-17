import { useState } from "react";
import { IoCheckmarkCircleOutline, IoEllipsisHorizontalOutline } from "react-icons/io5";
import { Task, TaskStatus } from "../../interfaces/task.interface";
import { useTaskStore } from "../../stores";
import SingleTask from "./SingleTask";
import { cn } from "../../libs/utils";

interface Props {
  title: string;
  tasks: Task[];
  value: TaskStatus;
}

export const JiraTasks = ({ title, value, tasks }: Props) => {
  // state de zustand
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const draggingTaskId = useTaskStore((state) => state.draggingTaskId);
  const changeTaskStatus = useTaskStore((state) => state.changeTaskStatus);
  const [onDragOver, setOnDragOver] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);

    if (draggingTaskId) {
      changeTaskStatus(draggingTaskId!, value);
    }
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

        <button>
          <IoEllipsisHorizontalOutline />
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
