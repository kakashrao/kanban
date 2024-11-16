import { FC } from "react";
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

type CreateBoardFCType = {
  open: boolean;
  onClose?: () => void;
};

const CreateBoardDialog: FC<CreateBoardFCType> = ({
  open,
  onClose = () => {},
}) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-accent">
        <DialogHeader className="mb-4">
          <DialogTitle className="heading-l">Add New Board</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1.5 mb-4">
          <Label className="body-m">Name</Label>
          <Input type="text" placeholder="e.g. Web Design" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="body-m">Columns</Label>
          <div className="flex flex-col gap-2.5">
            <Input type="text" placeholder="e.g. Todo" />
            <Button variant="secondary">+ Add New Column</Button>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full mt-2">Create New Board</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoardDialog;
