import { DBContext } from "@/database";
import BoardSchema from "@/database/schemas/board";
import { deleteBoard } from "@/database/services/board";
import { useToast } from "@/hooks/use-toast";
import useWindowDimensions from "@/hooks/windowDimensions";
import { isMobile } from "@/lib/utils";
import { StoreDispatchType, StoreSelectorType } from "@/store";
import { boardActions, boardSelectors, fetchBoards } from "@/store/board";
import { FC, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import CreateEditBoardDialog, { BoardDialogRef } from "./CreateEditBoardDialog";
import CreateEditTaskDialog from "./CreateEditTaskDialog";
import SidePanel from "./SidePanel";

const Header: FC = () => {
  const themeStore = useSelector<StoreSelectorType, StoreSelectorType["theme"]>(
    (state) => state.theme
  );
  const activeBoard = useSelector<StoreSelectorType, BoardSchema>((state) =>
    boardSelectors.getActiveBoard(state)
  );
  const dispatch = useDispatch<StoreDispatchType>();

  const db = useContext(DBContext);
  const { toast } = useToast();

  const confirmDialogRef = useRef<ConfirmationDialogRef>(null);
  const taskDialogRef = useRef(null);
  const boardDialogRef = useRef<BoardDialogRef>(null);

  const { screenWidth } = useWindowDimensions();

  const handleEditBoard = () => {
    boardDialogRef.current.open();
  };

  const handleDeleteBoard = async (showDialog: boolean) => {
    if (showDialog) {
      (confirmDialogRef.current as ConfirmationDialogRef).open();
    } else {
      try {
        await deleteBoard(db, activeBoard.id);
        dispatch(boardActions.changeBoard(""));
        dispatch(fetchBoards(db));
        (confirmDialogRef.current as ConfirmationDialogRef).close();
      } catch (error) {
        toast({
          title: "Error",
          description:
            error?.message ?? "Failed to delete board, please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleCreateTask = () => {
    taskDialogRef.current.open();
  };

  return (
    <div className="flex items-center h-full">
      {!isMobile(screenWidth) && (
        <div
          className={`flex items-center h-[95px] pl-[32px] header-logo border-e theme-border${!themeStore.sidePanelOpen ? " border-b bg-header" : ""}`}
        >
          {themeStore.isDarkTheme ? (
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
          {activeBoard && (
            <h1 className="m-0 heading-xl text-primary-foreground flex gap-2 items-center">
              {activeBoard.name}
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
          )}
        </div>
        {activeBoard && (
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
                  <DropdownMenuItem
                    className="text-muted-foreground"
                    onClick={handleEditBoard}
                  >
                    Edit Board
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-[#ea5555]"
                    onClick={() => handleDeleteBoard(true)}
                  >
                    Delete Board
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      {activeBoard && (
        <>
          <CreateEditTaskDialog ref={taskDialogRef} />
          <CreateEditBoardDialog ref={boardDialogRef} isEditMode={true} />
          <ConfirmationDialog
            ref={confirmDialogRef}
            title="Delete this board?"
            message={`Are you sure you want to delete the '${activeBoard?.name ?? ""}' board? This action will remove all columns and tasks and cannot be reverted.`}
            confirmButtonText="Delete"
            cancelButtonText="Cancel"
            onConfirm={() => handleDeleteBoard(false)}
          />
        </>
      )}
    </div>
  );
};

export default Header;
