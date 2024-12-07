import { FC, useState } from "react";

const TaskColumn: FC = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <section className="flex flex-col gap-5 w-[300px] min-w-[300px] h-full">
      <div className={`flex gap-2${false ? " invisible" : ""}`}>
        <span className="colored-point"></span>
        <p className="heading-s uppercase text-muted-foreground">Doing (6)</p>
      </div>
      {tasks.length ? (
        <div className="grow border rounded bg-task-column flex justify-center items-center">
          <p className="heading-xl cursor-pointer">+ New Column</p>
        </div>
      ) : (
        <div className="grow">
          <div className="task-card">
            <h1 className="heading-m text-primary-foreground text-wrap">
              Building UI for Onboarding flow
            </h1>
            <p className="body-m text-muted-foreground">0 of 3 subtasks</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default TaskColumn;
