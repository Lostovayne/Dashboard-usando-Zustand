import { IoReorderTwoOutline } from "react-icons/io5";
import { Task } from "../../interfaces/task.interface";

interface Props {
  task: Task;
}

/**
 * Renders a single task.
 * @param {Props} props - The props object.
 * @param {Task} props.task - The task object.
 * @returns {JSX.Element} The rendered single task.
 */
const SingleTask = ({ task }: Props): JSX.Element => {
  return (
    <div
      draggable
      onDragStart={() => console.log("onDragStart", task.id)}
      onDragEnd={() => console.log("onDragEnd")}
      className="flex justify-between items-center mt-5 p-2"
    >
      <div className="flex justify-center items-center gap-2">
        <p className="font-bold text-base text-navy-700">{task.title}</p>
      </div>
      <span className="w-6 h-6 text-navy-700 cursor-pointer">
        <IoReorderTwoOutline />
      </span>
    </div>
  );
};
export default SingleTask;
