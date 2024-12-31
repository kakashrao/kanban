import { StoreSelectorType } from "@/store";
import { FC, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import CreateEditBoardDialog, { BoardDialogRef } from "./CreateEditBoardDialog";
import TaskColumn from "./TaskColumn";
import TaskInfoDialog from "./TaskInfoDialog";

const Tasks: FC = () => {
  const boardDialogRef = useRef<BoardDialogRef | null>(null);

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([1, 2, 3, 4, 5, 6, 7, 7, 8, 8]);

  const handleAddColumn = () => {
    (boardDialogRef.current as BoardDialogRef).open();
  };

  return (
    <div className="h-full flex justify-center items-center">
      {!tasks.length ? (
        <section className="flex gap-8 bg-content w-full h-full p-7 overflow-auto">
          {tasks.map((task) => (
            <TaskColumn onAddColumn={handleAddColumn} />
          ))}
        </section>
      ) : (
        <EmptyTasks onAdd={handleAddColumn} />
      )}
      <TaskInfoDialog open={open} onClose={() => setOpen(false)} />
      <CreateEditBoardDialog
        ref={boardDialogRef}
        columnsOnly={true}
        isEditMode={true}
      />
    </div>
  );
};

const EmptyTasks: FC<{ onAdd: () => void }> = ({ onAdd = () => {} }) => {
  const activeBoardId = useSelector<StoreSelectorType, string>(
    (state) => state.board.activeEntity
  );

  return (
    <div className="flex flex-col justify-center items-center gap-6 text-muted-foreground px-2 text-center">
      {activeBoardId ? (
        <>
          <p className="heading-l">
            The board is empty. Create a new column to get started.
          </p>
          <Button onClick={onAdd}>+ Add New Column</Button>
        </>
      ) : (
        <>
          <p className="heading-l">This page is empty, but not for long!</p>
          <p className="body-m">Create new board to get started.</p>
        </>
      )}
    </div>
  );
};

export default Tasks;
