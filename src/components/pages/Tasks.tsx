import { FC, useState } from "react";
import { Button } from "../ui/button";
import TaskColumn from "./TaskColumn";
import TaskInfoDialog from "./TaskInfoDialog";

const Tasks: FC = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([1, 2, 3, 4, 5, 6, 7, 7, 8, 8]);

  const handleAddColumn = () => {
    console.log("Add column");
    setTasks([]);
  };

  return (
    <div
      className="h-full flex justify-center items-center"
      onClick={() => setOpen(true)}
    >
      {!tasks.length ? (
        <section className="flex gap-8 bg-content w-full h-full p-7 overflow-auto">
          {tasks.map((task) => (
            <TaskColumn />
          ))}
        </section>
      ) : (
        <EmptyTasks onAdd={handleAddColumn} />
      )}
      <TaskInfoDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

const EmptyTasks: FC<{ onAdd: () => void }> = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 text-muted-foreground px-2 text-center">
      <p className="heading-l">
        The board is empty. Create a new column to get started.
      </p>
      <Button>+ Add New Column</Button>
    </div>
  );
};

export default Tasks;
