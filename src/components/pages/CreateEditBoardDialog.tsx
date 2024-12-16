import { DBContext } from "@/database";
import BoardSchema, { BoardRequestSchema } from "@/database/schemas/board";
import ColumnSchema from "@/database/schemas/column";
import { createBoard } from "@/database/services/board";
import { useToast } from "@/hooks/use-toast";
import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface BoardDialogProps {
  onClose?: (v: string) => void;
  value?: BoardSchema;
}

interface BoardDialogRef {
  open: () => void;
  close: () => void;
}

interface BoardForm {
  name: string;
  columns: ColumnSchema[];
}

const CreateEditBoardDialog = forwardRef<
  BoardDialogRef | null,
  BoardDialogProps
>(({ onClose = () => {} }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const db = useContext(DBContext);
  const { toast } = useToast();

  const [isInProgress, setIsInProgress] = useState(false);

  const { control, handleSubmit, reset } = useForm<BoardForm>({
    defaultValues: {
      name: "",
      columns: [],
    },
  });
  const {
    fields: columns,
    remove: removeColumn,
    append: addColumn,
  } = useFieldArray<BoardForm>({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "columns", // unique name for your Field Array
  });

  useImperativeHandle(ref, () => {
    return {
      open() {
        setIsOpen(true);
        addNewColumn();
      },
      close() {
        setIsOpen(false);
        reset();
      },
    };
  });

  const handleClose = (value?: string) => {
    setIsOpen(false);
    onClose(value);
    reset();
  };

  const addNewColumn = () => {
    addColumn({ id: "column_" + uuidv4(), name: "", boardId: "" });
  };

  const handleCreateBoard = async (data: BoardForm) => {
    if (!data) return;

    if (!data.name) {
      toast({
        title: "Error",
        description: "Please enter board name.",
        variant: "destructive",
      });
      return;
    }

    setIsInProgress(true);

    try {
      const board: BoardRequestSchema = {
        id: "",
        name: data.name,
        columns: data.columns
          .filter((c) => c.name)
          .map((c) => {
            return {
              ...c,
              id: c.id.startsWith("column_") ? "" : c.id,
            };
          }),
      };

      await createBoard(db, board);

      handleClose("Success");
      toast({
        title: "Success",
        description: "Board created successfully.",
        variant: "success",
      });
    } catch (error: any) {
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
          <DialogTitle className="heading-l">Add New Board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateBoard)}>
          <div className="flex flex-col gap-1.5 mb-4">
            <Label className="body-m">Board Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="e.g. Web Design"
                  required
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="body-m">Board Columns</Label>
            <div className="flex flex-col gap-3">
              {columns.map((column, columnIdx) => (
                <div
                  key={column.id}
                  className="flex justify-between items-center gap-3"
                >
                  <Controller
                    name={`columns.${columnIdx}.name`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="text" placeholder="e.g. Todo" />
                    )}
                  />
                  <img
                    src="/assets/images/icon-cross.svg"
                    alt="Cross"
                    className="cursor-pointer"
                    onClick={() => removeColumn(columnIdx)}
                  />
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={addNewColumn}>
                + Add New Column
              </Button>
            </div>
          </div>
          <Button className="w-full mt-3" type="submit" disabled={isInProgress}>
            Create New Board
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default CreateEditBoardDialog;
export type { BoardDialogProps, BoardDialogRef };
