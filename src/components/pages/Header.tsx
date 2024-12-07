import { StoreSelectorType } from "@/store";
import { FC, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ConfirmationDialog, {
  ConfirmationDialogRef,
} from "./ConfirmationDialog";
import CreateEditTaskDialog from "./CreateEditTaskDialog";

const Header: FC = () => {
  const isDarkTheme = useSelector<StoreSelectorType, boolean>(
    (state) => state.theme.isDarkTheme
  );
  const isPanelOpen = useSelector<StoreSelectorType, boolean>(
    (state) => state.theme.sidePanelOpen
  );

  const confirmDialogRef = useRef<ConfirmationDialogRef>(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const handleDeleteBoard = () => {
    (confirmDialogRef.current as ConfirmationDialogRef).open();
  };

  const handleCreateTask = () => {
    setTaskDialogOpen(true);
  };

  return (
    <div className="flex items-center h-full">
      <div
        className={`flex items-center h-[95px] pl-[32px] w-[300px] border-e theme-border${!isPanelOpen ? " border-b" : ""}`}
      >
        {isDarkTheme ? (
          <img src="/assets/images/logo-light.svg" alt="Kanban Logo" />
        ) : (
          <img src="/assets/images/logo-dark.svg" alt="Kanban Logo" />
        )}
      </div>

      <div
        className={`h-full flex items-center justify-between grow px-6 bg-header border-b theme-border`}
      >
        <h1 className="m-0 heading-xl text-primary-foreground">
          Platform Launch
        </h1>
        <div className="flex items-center gap-4">
          <Button onClick={handleCreateTask}>+ Add New Task</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src="/assets/images/icon-vertical-ellipsis.svg"
                alt="Vertical Ellipsis"
                className="cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-muted-foreground">
                  Edit Board
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-[#ea5555]"
                  onClick={handleDeleteBoard}
                >
                  Delete Board
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CreateEditTaskDialog
        open={taskDialogOpen}
        onClose={() => setTaskDialogOpen(false)}
      />
      <ConfirmationDialog
        ref={confirmDialogRef}
        title="Delete this board?"
        message="Are you sure you want to delete the 'Platform Launch' board? This action will remove all columns and tasks and cannot be reverted."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />
    </div>
  );
};

export default Header;
