import { DBContext } from "@/database";
import ColumnSchema from "@/database/schemas/column";
import TaskSchema from "@/database/schemas/task";
import { getColumnsByBoardId } from "@/database/services/column";
import { addOrUpdateTask, getTaskById } from "@/database/services/task";
import { useToast } from "@/hooks/use-toast";
import { StoreDispatchType, StoreSelectorType } from "@/store";
import { fetchTasksByBoard } from "@/store/task";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface TaskDialogProps {
  onClose?: (v: string) => void;
  editedTaskId?: string;
}

interface TaskDialogRef {
  open: () => void;
  close: () => void;
}

const CreateEditTaskDialog = forwardRef<TaskDialogRef | null, TaskDialogProps>(
  ({ onClose = () => {}, editedTaskId = "" }, ref) => {
    const activeBoardId = useSelector<StoreSelectorType, string>(
      (state) => state.board.activeEntity
    );
    const dispatch = useDispatch<StoreDispatchType>();

    const db = useContext(DBContext);
    const { toast } = useToast();

    const [isOpen, setIsOpen] = useState(false);
    const [columns, setColumns] = useState<ColumnSchema[]>([]);
    const [columnsFetched, setColumnsFetched] = useState(false);
    const [isInProgress, setIsInProgress] = useState(false);

    const { control, setValue, reset, handleSubmit } = useForm<TaskSchema>({
      defaultValues: {
        id: "",
        title: "",
        description: "",
        subTasks: [{ title: "", isCompleted: false }],
        boardId: "",
        columnId: "",
      },
    });

    const {
      fields: subTasks,
      remove: removeSubTask,
      append: addSubTask,
    } = useFieldArray<TaskSchema>({
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "subTasks", // unique name for your Field Array
    });

    useImperativeHandle(ref, () => {
      return {
        open() {
          setIsOpen(true);
        },
        close() {
          setIsOpen(false);
          reset();
        },
      };
    });

    useEffect(() => {
      if (isOpen) {
        setColumnsFetched(false);
        (async () => {
          const cols = await getColumnsByBoardId(db, activeBoardId);
          setColumns(cols ?? []);
          if (cols.length) {
            setValue("columnId", cols[0].id);
          }

          if (editedTaskId) {
            const task = await getTaskById(db, editedTaskId);
            setValue("id", task.id);
            setValue("title", task.title);
            setValue("description", task.description);
            setValue("subTasks", task.subTasks);
            setValue("columnId", task.columnId);
            setValue("boardId", task.boardId);
          }

          setColumnsFetched(true);
        })();
      }
    }, [db, activeBoardId, isOpen, setValue, editedTaskId]);

    const handleClose = (value?: string) => {
      setIsOpen(false);
      onClose(value);
      reset();
    };

    const handleCreateEditTask = async (data: TaskSchema) => {
      if (!data) return;

      if (!data.title) {
        toast({
          title: "Error",
          description: "Please give a title to task.",
          variant: "destructive",
        });
        return;
      }

      setIsInProgress(true);

      try {
        const task: TaskSchema = {
          id: data.id,
          title: data.title,
          description: data.description,
          subTasks: data.subTasks.filter((t) => t.title),
          columnId: data.columnId,
          boardId: activeBoardId,
        };

        await addOrUpdateTask(db, task);

        handleClose("Success");
        toast({
          title: "Success",
          description: `Task ${editedTaskId ? "updated" : "added"} successfully.`,
          variant: "success",
        });

        dispatch(fetchTasksByBoard({ db, boardId: activeBoardId }));
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsInProgress(false);
      }
    };

    return (
      <Dialog open={isOpen} onOpenChange={() => isOpen && handleClose()}>
        <DialogContent className="bg-accent">
          <DialogHeader className="mb-4">
            <DialogTitle className="heading-l">
              {editedTaskId ? "Edit" : "Add New"} Task
            </DialogTitle>
          </DialogHeader>
          {columnsFetched && (
            <form onSubmit={handleSubmit(handleCreateEditTask)}>
              <div className="flex flex-col gap-1.5 mb-4">
                <Label className="body-m">Title</Label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="e.g. Take coffee break"
                      required
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-1.5 mb-4">
                <Label className="body-m">Description</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="e.g. it's always good to take a break. This 15 minute break will recharge the batteries a little."
                      style={{ resize: "none" }}
                      required
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-1.5 mb-4">
                <Label className="body-m">Subtasks</Label>
                <div className="flex flex-col gap-3">
                  {subTasks.map((t, tIdx) => (
                    <div
                      key={t.id}
                      className="flex justify-between items-center gap-3"
                    >
                      <Controller
                        name={`subTasks.${tIdx}.title`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            placeholder="e.g. Todo"
                          />
                        )}
                      />
                      <img
                        src="/assets/images/icon-cross.svg"
                        alt="Cross"
                        className="cursor-pointer"
                        onClick={() => removeSubTask(tIdx)}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      addSubTask({ title: "", isCompleted: false })
                    }
                  >
                    + Add New Subtask
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="body-m">Status</Label>
                <Controller
                  name="columnId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      defaultValue={field.value}
                      onValueChange={(value) => setValue("columnId", value)}
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
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={isInProgress}
              >
                {editedTaskId ? "Save Changes" : "Create Task"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);

export default CreateEditTaskDialog;
export type { TaskDialogProps, TaskDialogRef };
