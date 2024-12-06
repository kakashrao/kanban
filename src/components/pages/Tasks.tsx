import { FC, useState } from "react";
import { Button } from "../ui/button";
import TaskColumn from "./TaskColumn";
import TaskInfoDialog from "./TaskInfoDialog";

const Tasks: FC = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddColumn = () => {
    console.log("Add column");
    setTasks([]);
  };

  return (
    <div
      className="h-full flex justify-center items-center"
      onClick={() => setOpen(true)}
    >
      {tasks.length ? <TaskColumn /> : <EmptyTasks onAdd={handleAddColumn} />}
      <TaskInfoDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

const EmptyTasks: FC<{ onAdd: () => void }> = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 text-muted-foreground">
      <p className="heading-l">
        The board is empty. Create a new column to get started.
      </p>
      <Button>+ Add New Column</Button>
    </div>
  );
};

export default Tasks;
