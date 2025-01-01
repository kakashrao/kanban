import { DBContext } from "@/database";
import { StoreDispatchType, StoreSelectorType } from "@/store";
import { fetchTasksByBoard } from "@/store/task";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import CreateEditBoardDialog, { BoardDialogRef } from "./CreateEditBoardDialog";
import TaskColumn from "./TaskColumn";
import TaskInfoDialog from "./TaskInfoDialog";

const Tasks: FC = () => {
  const activeBoardId = useSelector<StoreSelectorType, string>(
    (state) => state.board.activeEntity
  );
  const taskStore = useSelector<StoreSelectorType, StoreSelectorType["task"]>(
    (state) => state.task
  );
  const dispatch = useDispatch<StoreDispatchType>();

  const db = useContext(DBContext);
  const boardDialogRef = useRef<BoardDialogRef | null>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasksByBoard({ db, boardId: activeBoardId }));
  }, [dispatch, db, activeBoardId]);

  const handleAddColumn = () => {
    (boardDialogRef.current as BoardDialogRef).open();
  };

  const handleBoardDialogClose = (result: string) => {
    if (result) {
      dispatch(fetchTasksByBoard({ db, boardId: activeBoardId }));
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      {activeBoardId && taskStore.entities.length ? (
        <section className="flex gap-8 bg-content w-full h-full p-7 overflow-auto">
          {taskStore.entities.map((task) => (
            <TaskColumn
              key={task.columnId}
              task={task}
              onAddColumn={handleAddColumn}
            />
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
        onClose={handleBoardDialogClose}
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
