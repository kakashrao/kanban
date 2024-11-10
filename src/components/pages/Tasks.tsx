import { FC } from "react";
import { Button } from "../ui/button";

const Tasks: FC = () => {
  const handleAddColumn = () => {
    console.log("Add column");
  };

  return (
    <div className="h-full flex justify-center items-center">
      <EmptyTasks onAdd={handleAddColumn} />
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
