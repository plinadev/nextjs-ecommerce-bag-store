"use client";

import { useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  AlertDialogCancel,
  AlertDialogDescription,
} from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";

function DeleteDialog({
  id,
  action,
}: {
  id: string;
  action: (id: string) => Promise<{ success: boolean; message: string }>;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const handleDeleteClick = () => {
    startTransition(async () => {
      const res = await action(id);

      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setOpen(false);
      toast.success(res.message);
    });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive" className="ml-2">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete order?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can not be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            size="sm"
            disabled={pending}
            onClick={handleDeleteClick}
          >
            {pending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDialog;
