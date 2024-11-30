import { FC, useRef } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ConfirmationDialog, { ConfirmationRef } from "./ConfirmationDialog";

const Header: FC = () => {
  const confirmDialogRef = useRef<ConfirmationRef>(null);

  const handleDeleteBoard = () => {
    (confirmDialogRef.current as ConfirmationRef).open();
  };

  return (
    <>
      <div
        className={`h-full flex items-center justify-between px-6 bg-accent`}
      >
        <h1 className="m-0 heading-xl text-primary-foreground">
          Platform Launch
        </h1>
        <div className="flex items-center gap-4">
          <Button>+ Add New Task</Button>
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
      <ConfirmationDialog
        ref={confirmDialogRef}
        title="Delete this board?"
        message="Are you sure you want to delete the 'Platform Launch' board? This action will remove all columns and tasks and cannot be reverted."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />
    </>
  );
};

export default Header;
