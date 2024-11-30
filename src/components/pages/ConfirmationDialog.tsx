import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { forwardRef, useImperativeHandle, useState } from "react";

export interface ConfirmationDialogProps {
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onClose?: () => void;
}

export interface ConfirmationDialogRef {
  open: () => void;
  close: () => void;
}

const ConfirmationDialog = forwardRef<
  ConfirmationDialogRef | null,
  ConfirmationDialogProps
>(
  (
    { title, message, confirmButtonText, cancelButtonText, onClose = () => {} },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
      setIsOpen(false);
      onClose();
    };

    useImperativeHandle(ref, () => {
      return {
        open() {
          setIsOpen(true);
        },
        close() {
          setIsOpen(false);
        },
      };
    });

    return (
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger></AlertDialogTrigger>
        <AlertDialogContent className="w-[450px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive heading-l mb-2">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="body-l text-muted-foreground mb-2">
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-between w-full">
            <AlertDialogAction className="w-6/12">
              {confirmButtonText}
            </AlertDialogAction>
            <AlertDialogCancel className="w-6/12" onClick={handleClose}>
              {cancelButtonText}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

export default ConfirmationDialog;
