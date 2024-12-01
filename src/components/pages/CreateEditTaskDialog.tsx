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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const CreateEditTaskDialog: FC<BasicDialogProps> = ({
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
          <DialogTitle className="heading-l">Add New Task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1.5 mb-4">
          <Label className="body-m">Title</Label>
          <Input type="text" placeholder="e.g. Take coffee break" required />
        </div>
        <div className="flex flex-col gap-1.5 mb-4">
          <Label className="body-m">Description</Label>
          <Textarea
            placeholder="e.g. it's always good to take a break. This 15 minute break will recharge the batteries a little."
            style={{ resize: "none" }}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5 mb-4">
          <Label className="body-m">Subtasks</Label>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center gap-3">
              <Input type="text" placeholder="e.g. Todo" />
              <img
                src="/assets/images/icon-cross.svg"
                alt="Cross"
                className="cursor-pointer"
              />
            </div>
            <Button variant="secondary">+ Add New Subtask</Button>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="body-m">Status</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button className="w-full mt-2">Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditTaskDialog;
