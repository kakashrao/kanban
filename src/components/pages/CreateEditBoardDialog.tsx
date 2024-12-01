import { BasicDialogProps } from "@/interfaces/Shared";
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

const CreateEditBoardDialog: FC<BasicDialogProps> = ({
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
          <Label className="body-m">Board Name</Label>
          <Input type="text" placeholder="e.g. Web Design" required />
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
          <Button className="w-full mt-2">Create New Board</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditBoardDialog;
