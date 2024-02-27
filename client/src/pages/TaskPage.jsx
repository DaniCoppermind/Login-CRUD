/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";

function TaskPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {tasks.lenngth === 0 && <h1>No tasks yet, please add a new task</h1>}

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-2">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </>
  );
}

export default TaskPage;
