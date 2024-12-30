import useWindowDimensions from "@/hooks/windowDimensions";
import { isMobile } from "@/lib/utils";
import { StoreSelectorType } from "@/store";
import { FC, useRef } from "react";
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
import SidePanel from "./SidePanel";

const Header: FC = () => {
  const isDarkTheme = useSelector<StoreSelectorType, boolean>(
    (state) => state.theme.isDarkTheme
  );
  const isPanelOpen = useSelector<StoreSelectorType, boolean>(
    (state) => state.theme.sidePanelOpen
  );

  const confirmDialogRef = useRef<ConfirmationDialogRef>(null);
  const taskDialogRef = useRef(null);

  const { screenWidth } = useWindowDimensions();

  const handleDeleteBoard = () => {
    (confirmDialogRef.current as ConfirmationDialogRef).open();
  };

  const handleCreateTask = () => {
    taskDialogRef.current.open();
  };

  return (
    <div className="flex items-center h-full">
      {!isMobile(screenWidth) && (
        <div
          className={`flex items-center h-[95px] pl-[32px] header-logo border-e theme-border${!isPanelOpen ? " border-b bg-header" : ""}`}
        >
          {isDarkTheme ? (
            <img src="/assets/images/logo-light.svg" alt="Kanban Logo" />
          ) : (
            <img src="/assets/images/logo-dark.svg" alt="Kanban Logo" />
          )}
        </div>
      )}

      <div
        className={`h-full flex items-center justify-between grow border-b theme-border bg-header${isMobile(screenWidth) ? " px-4" : " px-6"}`}
      >
        <div className="flex items-center gap-4">
          {isMobile(screenWidth) && (
            <img src="/assets/images/logo-mobile.svg" alt="Kanban Logo" />
          )}
          <h1 className="m-0 heading-xl text-primary-foreground flex gap-2 items-center">
            Platform Launch
            {isMobile(screenWidth) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    src="/assets/images/icon-chevron-down.svg"
                    alt="down-chevron"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <SidePanel />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {isMobile(screenWidth) ? (
            <Button
              size="icon"
              className="w-[48px] h-[32px] rounded-lg"
              onClick={handleCreateTask}
            >
              <img
                src="/assets/images/icon-add-task-mobile.svg"
                alt="Add Task Icon"
              />
            </Button>
          ) : (
            <Button onClick={handleCreateTask}>+ Add New Task</Button>
          )}
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
      <CreateEditTaskDialog ref={taskDialogRef} />
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
