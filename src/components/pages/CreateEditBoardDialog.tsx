import { DBContext } from "@/database";
import { BoardRequestSchema } from "@/database/schemas/board";
import ColumnSchema from "@/database/schemas/column";
import {
  addOrUpdateBoard,
  getBoardWithColumns,
} from "@/database/services/board";
import { bulkDeleteColumns } from "@/database/services/column";
import { useToast } from "@/hooks/use-toast";
import { StoreDispatchType, StoreSelectorType } from "@/store";
import { fetchBoards } from "@/store/board";
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface BoardDialogProps {
  onClose?: (v: string) => void;
  isEditMode?: boolean;
  columnsOnly?: boolean;
}

interface BoardDialogRef {
  open: () => void;
  close: () => void;
}

interface BoardForm {
  id: string;
  name: string;
  columns: ColumnSchema[];
}

const CreateEditBoardDialog = forwardRef<
  BoardDialogRef | null,
  BoardDialogProps
>(({ onClose = () => {}, isEditMode = false, columnsOnly = false }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const db = useContext(DBContext);
  const { toast } = useToast();

  const [isInProgress, setIsInProgress] = useState(false);
  const [removedColumns, setRemovedColumns] = useState([]);

  const activeBoard = useSelector<StoreSelectorType, string>(
    (state) => state.board.activeEntity
  );
  const dispatch = useDispatch<StoreDispatchType>();

  const { control, handleSubmit, reset, setValue, getValues } =
    useForm<BoardForm>({
      defaultValues: {
        name: "",
        columns: [
          {
            id: "column_" + uuidv4(),
            order: 1,
            name: "",
            boardId: "",
          },
        ],
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
      },
      close() {
        setIsOpen(false);
        reset();
      },
    };
  });

  const handleColumnRemove = (columnIdx: number) => {
    const columnId = getValues(`columns.${columnIdx}.id`); // form hook overrides "id" with its own uuid, so will have to access id like this.
    setRemovedColumns((values) => [...values, columnId]);
    removeColumn(columnIdx);
  };

  const fetchBoardById = useCallback(async () => {
    const data = await getBoardWithColumns(db, activeBoard);
    setValue("id", data.id);
    setValue("name", data.name);
    setValue("columns", data.columns);
  }, [db, activeBoard, setValue]);

  useEffect(() => {
    if (isOpen && isEditMode) {
      fetchBoardById();
    }
  }, [isOpen, isEditMode, fetchBoardById]);

  const handleClose = (value?: string) => {
    setIsOpen(false);
    onClose(value);
    reset();
    setRemovedColumns([]);
  };

  const addNewColumn = () => {
    addColumn({
      id: "column_" + uuidv4(),
      order: columns.length + 1,
      name: "",
      boardId: "",
    });
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
        id: data.id,
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

      await addOrUpdateBoard(db, board);
      await bulkDeleteColumns(db, removedColumns);

      handleClose("Success");
      toast({
        title: "Success",
        description: `Board ${isEditMode ? "updated" : "created"} successfully.`,
        variant: "success",
      });

      dispatch(fetchBoards(db));
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
          <DialogTitle className="heading-l">
            {isEditMode ? "Edit" : `Add New`} Board
          </DialogTitle>
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
                  disabled={columnsOnly}
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
                      <Input
                        {...field}
                        type="text"
                        placeholder="e.g. Todo"
                        disabled={columnsOnly && !!column.boardId}
                      />
                    )}
                  />
                  {(!columnsOnly || !column.boardId) && (
                    <img
                      src="/assets/images/icon-cross.svg"
                      alt="Cross"
                      className="cursor-pointer"
                      onClick={() => handleColumnRemove(columnIdx)}
                    />
                  )}
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={addNewColumn}>
                + Add New Column
              </Button>
            </div>
          </div>
          <Button className="w-full mt-3" type="submit" disabled={isInProgress}>
            {isEditMode ? "Save Changes" : "Create New Board"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default CreateEditBoardDialog;
export type { BoardDialogProps, BoardDialogRef };
