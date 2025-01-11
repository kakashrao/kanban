import { DBContext } from "@/database";
import TaskSchema from "@/database/schemas/task";
import { StoreDispatchType, StoreSelectorType } from "@/store";
import { fetchTasksByBoard } from "@/store/task";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import CreateEditBoardDialog, { BoardDialogRef } from "./CreateEditBoardDialog";
import CreateEditTaskDialog, { TaskDialogRef } from "./CreateEditTaskDialog";
import TaskColumn from "./TaskColumn";
import TaskInfoDialog, { TaskInfoDialogRef } from "./TaskInfoDialog";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { addOrUpdateTask } from "@/database/services/task";
import { useToast } from "@/hooks/use-toast";
import Droppable from "../shared/droppable";

const Tasks: FC = () => {
  const activeBoardId = useSelector<StoreSelectorType, string>(
    (state) => state.board.activeEntity
  );
  const taskStore = useSelector<StoreSelectorType, StoreSelectorType["task"]>(
    (state) => state.task
  );
  const dispatch = useDispatch<StoreDispatchType>();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const db = useContext(DBContext);
  const boardDialogRef = useRef<BoardDialogRef | null>(null);
  const taskInfoDialogRef = useRef<TaskInfoDialogRef | null>(null);
  const taskDialogRef = useRef<TaskDialogRef>();

  const { toast } = useToast();

  const [activeTask, setActiveTask] = useState<TaskSchema | null>(null);

  const fetchTasks = useCallback(() => {
    dispatch(fetchTasksByBoard({ db, boardId: activeBoardId }));
  }, [db, activeBoardId, dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddColumn = () => {
    (boardDialogRef.current as BoardDialogRef).open();
  };

  const handleBoardDialogClose = (result: string) => {
    if (result) {
      fetchTasks();
    }
  };

  const handleShowTaskInfo = (t: TaskSchema) => {
    setActiveTask(t);
    (taskInfoDialogRef.current as TaskInfoDialogRef).open();
  };

  const handleEditTask = () => {
    taskDialogRef.current.open();
  };

  const dropTask = async (event: DragEndEvent) => {
    try {
      const task: TaskSchema = {
        ...(event.active.data.current as TaskSchema),
        columnId: event.over.id as string,
        boardId: activeBoardId,
      };

      await addOrUpdateTask(db, task);
      fetchTasks();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      {activeBoardId && taskStore.entities.length ? (
        <DndContext onDragEnd={dropTask} sensors={sensors}>
          <section className="flex gap-8 bg-content w-full h-full p-7 overflow-auto">
            {taskStore.entities.map((task) => (
              <Droppable key={task.columnId} id={task.columnId}>
                <TaskColumn
                  task={task}
                  onAddColumn={handleAddColumn}
                  onshowTaskInfo={handleShowTaskInfo}
                />
              </Droppable>
            ))}
          </section>
        </DndContext>
      ) : (
        <EmptyTasks onAdd={handleAddColumn} />
      )}
      <CreateEditTaskDialog ref={taskDialogRef} editedTaskId={activeTask?.id} />
      <TaskInfoDialog
        ref={taskInfoDialogRef}
        task={activeTask}
        onEdit={handleEditTask}
      />
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
