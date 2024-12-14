import { DBContext } from "@/database";
import BoardSchema, { BoardRequestSchema } from "@/database/schemas/board";
import { createBoard } from "@/database/services/board";
import { useToast } from "@/hooks/use-toast";
import { BasicDialogProps } from "@/interfaces/Shared";
import { FC, useContext, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface CreateEditBoardDialogProps extends BasicDialogProps {
  value?: BoardSchema;
}

const CreateEditBoardDialog: FC<CreateEditBoardDialogProps> = ({
  open,
  onClose = () => {},
}) => {
  const db = useContext(DBContext);
  const { toast } = useToast();
  const nameInputRef = useRef<HTMLInputElement>();

  const [isInProgress, setIsInProgress] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  const handleCreateBoard = async () => {
    if (!nameInputRef.current.value) {
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
        name: nameInputRef.current.value,
        columns: [],
      };

      await createBoard(db, board);

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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-accent">
        <DialogHeader className="mb-4">
          <DialogTitle className="heading-l">Add New Board</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1.5 mb-4">
          <Label className="body-m">Board Name</Label>
          <Input
            type="text"
            placeholder="e.g. Web Design"
            ref={nameInputRef}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="body-m">Board Columns</Label>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center gap-3">
              <Input type="text" placeholder="e.g. Todo" />
              <img
                src="/assets/images/icon-cross.svg"
                alt="Cross"
                className="cursor-pointer"
              />
            </div>
            <Button variant="secondary">+ Add New Column</Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full mt-2"
            disabled={isInProgress}
            onClick={handleCreateBoard}
          >
            Create New Board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditBoardDialog;
