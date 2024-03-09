import { JiraTasks } from "../../components";
import { useTaskStore } from "../../stores";

export const JiraPage = () => {
  const pendindTasks = useTaskStore((state) => state.getTaskByStatus("open"));
  const inProgressTasks = useTaskStore((state) => state.getTaskByStatus("in-progress"));
  const doneTasks = useTaskStore((state) => state.getTaskByStatus("done"));

  // console.log(pendindTasks, inProgressTasks, doneTasks);

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
        <JiraTasks title="Pendientes" value="open" tasks={pendindTasks} />

        <JiraTasks title="Avanzando" value="in-progress" tasks={inProgressTasks} />

        <JiraTasks title="Terminadas" value="done" tasks={doneTasks} />
      </div>
    </>
  );
};
