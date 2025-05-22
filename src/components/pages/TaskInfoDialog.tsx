import { DBContext } from "@/database";
import ColumnSchema from "@/database/schemas/column";
import TaskSchema from "@/database/schemas/task";
import { getColumnsByBoardId } from "@/database/services/column";
import { addOrUpdateTask, deleteTaskById } from "@/database/services/task";
import { useToast } from "@/hooks/use-toast";
import { StoreDispatchType, StoreSelectorType } from "@/store";
import { fetchTasksByBoard } from "@/store/task";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ConfirmationDialog, {
  ConfirmationDialogRef,
} from "./ConfirmationDialog";

interface TaskInfoDialogProps {
  task: TaskSchema;
  onClose?: (v: string) => void;
  onEdit?: () => void;
}

interface TaskInfoDialogRef {
  open: () => void;
  close: () => void;
}

const TaskInfoDialog = forwardRef<
  TaskInfoDialogRef | null,
  TaskInfoDialogProps
>(({ onClose = () => {}, task, onEdit }, ref) => {
  useImperativeHandle(ref, () => {
    return {
      open() {
        setIsOpen(true);
      },
      close() {
        setIsOpen(false);
      },
    };
  });

  const [currentTask, setCurrentTask] = useState<TaskSchema>();
  const [isOpen, setIsOpen] = useState(false);
  const [columns, setColumns] = useState<ColumnSchema[]>([]);
  const [columnsFetched, setColumnsFetched] = useState(false);

  const activeBoardId = useSelector<StoreSelectorType, string>(
    (state) => state.board.activeEntity
  );
  const dispatch = useDispatch<StoreDispatchType>();

  const confirmDialogRef = useRef<ConfirmationDialogRef>(null);
  const db = useContext(DBContext);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setColumnsFetched(false);
      (async () => {
        const cols = await getColumnsByBoardId(db, activeBoardId);
        setColumns(cols ?? []);
        setColumnsFetched(true);
      })();
    }
  }, [db, activeBoardId, isOpen]);

  useEffect(() => {
    if (task) {
      setCurrentTask(task);
    }
  }, [task]);

  const handleClose = (value?: string) => {
    setIsOpen(false);
    onClose(value);
  };

  const handleDeleteTask = async (showDialog: boolean) => {
    if (showDialog) {
      (confirmDialogRef.current as ConfirmationDialogRef).open();
    } else {
      try {
        await deleteTaskById(db, task.id);
        dispatch(fetchTasksByBoard({ db, boardId: activeBoardId }));
        (confirmDialogRef.current as ConfirmationDialogRef).close();
        setIsOpen(false);
      } catch (error) {
        toast({
          title: "Error",
          description:
            error?.message ?? "Failed to delete task, please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const updateTaskInfo = async (info: TaskSchema) => {
    try {
      await addOrUpdateTask(db, info);
      setCurrentTask(info);
      dispatch(fetchTasksByBoard({ db, boardId: activeBoardId }));
    } catch (error) {
      toast({
        title: "Error",
        description:
          error?.message ?? "Failed to update task, please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => isOpen && handleClose()}>
      {currentTask && (
        <DialogContent className="bg-accent" showCloseIcon={false}>
          <DialogHeader className="mb-4 flex flex-row justify-between items-center">
            <DialogTitle className="heading-l pr-3">
              {currentTask.title}
            </DialogTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="dropdown-trigger-box">
                  <img
                    src="/assets/images/icon-vertical-ellipsis.svg"
                    alt="Vertical Ellipsis"
                    className="cursor-pointer w-[4px]"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="text-muted-foreground"
                    onClick={() => (setIsOpen(false), onEdit())}
                  >
                    Edit Task
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-[#ea5555]"
                    onClick={() => handleDeleteTask(true)}
                  >
                    Delete Task
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogHeader>
          <p className="body-l text-muted-foreground mb-4">
            {currentTask.description}
          </p>

          {currentTask.subTasks?.length && (
            <div className="flex flex-col gap-1.5 mb-4">
              <Label className="body-m mb-2">Subtasks (2 of 3)</Label>
              {currentTask.subTasks.map((t, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 py-3 rounded px-3 hover:drop-shadow-lg sub-task-info${t.isCompleted ? " completed line-through" : ""}`}
                >
                  <Checkbox
                    id="terms"
                    checked={t.isCompleted}
                    onCheckedChange={() =>
                      updateTaskInfo({
                        ...currentTask,
                        subTasks: currentTask.subTasks.map((st, stIdx) => ({
                          ...st,
                          isCompleted:
                            idx === stIdx ? !st.isCompleted : st.isCompleted,
                        })),
                      })
                    }
                  />
                  <label htmlFor="terms" className="body-m">
                    {t.title}{" "}
                  </label>
                </div>
              ))}
            </div>
          )}
          {columnsFetched && (
            <div className="flex flex-col gap-2">
              <Label className="body-m">Current Status</Label>
              <Select
                defaultValue={currentTask.columnId}
                onValueChange={(value) =>
                  updateTaskInfo({ ...currentTask, columnId: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {columns.map((col) => (
                      <SelectItem key={col.id} value={col.id}>
                        {col.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          <ConfirmationDialog
            ref={confirmDialogRef}
            title="Delete this task?"
            message={`Are you sure you want to delete the '${currentTask?.title ?? ""}' task ${currentTask?.subTasks?.length ? "and its subtasks" : ""}? This action cannot be reversed.`}
            confirmButtonText="Delete"
            cancelButtonText="Cancel"
            onConfirm={() => handleDeleteTask(false)}
          />
        </DialogContent>
      )}
    </Dialog>
  );
});

export default TaskInfoDialog;
export type { TaskInfoDialogRef };
