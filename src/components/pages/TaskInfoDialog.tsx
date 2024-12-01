import { BasicDialogProps } from "@/interfaces/Shared";
import { FC } from "react";
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

const TaskInfoDialog: FC<BasicDialogProps> = ({ open, onClose = () => {} }) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-accent" showCloseIcon={false}>
        <DialogHeader className="mb-4 flex flex-row items-center">
          <DialogTitle className="heading-l pr-3">
            Research pricing points of various competitors and trial different
            business models
          </DialogTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src="/assets/images/icon-vertical-ellipsis.svg"
                alt="Vertical Ellipsis"
                className="cursor-pointer w-[4px]"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-muted-foreground">
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#ea5555]">
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogHeader>
        <p className="body-l text-muted-foreground mb-4">
          We know what we're planning to build for version one. Now we need to
          finalize the first pricing model we'll use. Keep iterating the
          subtasks until we have a coherent proposition.
        </p>

        <div className="flex flex-col gap-1.5 mb-4">
          <Label className="body-m mb-2">Subtasks (2 of 3)</Label>
          <div
            className={`flex items-center gap-3 py-3 rounded px-3 hover:drop-shadow-lg sub-task-info${true ? " completed line-through" : ""}`}
          >
            <Checkbox id="terms" />
            <label htmlFor="terms" className="body-m">
              Research competitive pricing and business models
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="body-m">Current Status</Label>
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
      </DialogContent>
    </Dialog>
  );
};

export default TaskInfoDialog;
