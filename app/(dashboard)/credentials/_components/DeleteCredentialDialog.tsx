"use client"

import { Input } from "../../../../components/ui/input"
import { AlertDialog, AlertDialogCancel, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../../components/ui/alert-dialog"
import { useMutation } from "@tanstack/react-query"
import { DeleteWorkflow } from "../../../../actions/workflows/deleteWorkflow"

import React, { useState } from "react"
import { toast } from "sonner"
import { TrashIcon, XIcon } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { DeleteCredential } from "@/actions/credentials/deleteCredential"
interface Props {
    name:string
}
function DeleteCredentialDialog({name }:Props) {
    const [confirmText,setConfirmText] = useState('')
    const [open,setOpen] = useState(false)
    const deleteMutation = useMutation({
        mutationFn:DeleteCredential,
        onSuccess:() => {
            toast.success("Credential deleted successfully", {id:"delete-credential"})
            setConfirmText('')
        },
        onError:() => {
            toast.error("Failed to delete credential", {id:"delete-credential"})
        }
    })
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant='destructive' size='icon'><XIcon size={16} /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        If you delete this credential, you will not be able to recover it.
                        <div className="flex flex-col py-4 gap-2">
                            <p>
                                If you are sure, enter <b>{name}</b> to confirm.
                            </p>
                            <Input type="text" value={confirmText} onChange={(e) => setConfirmText(e.target.value)}/>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setConfirmText('')}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                    disabled={confirmText !== name || deleteMutation.isPending} 
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => {
                        toast.loading("Deleting credential...",{id:"delete-credential"})
                        deleteMutation.mutate(name)
                    }}
                    >
                        Delete
                        </AlertDialogAction>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default DeleteCredentialDialog
