"use server"
import { CreateCredentialSchemaType } from "@/schema/credential"
import prisma from "@/lib/prisma"
import { createCredentialSchema } from "@/schema/credential"
import { auth } from "@clerk/nextjs/server"
import { symmetricEncrypt } from "@/lib/encryption"

import { revalidatePath } from "next/cache"
export async function CreateCredential(form: CreateCredentialSchemaType){
   const {success,data} =  createCredentialSchema.safeParse(form)
   if(!success) throw new Error("Invalid form data")

    const {userId} = auth()
    if(!userId) throw new Error("Unauthenticated")

        //Encrypt the value
    const encryptedValue = symmetricEncrypt(data.value)

    //Create the credential
    const credential = await prisma.credential.create({
        data: {
            name: data.name,
            value: encryptedValue,
            userId: userId,
        }
    })
    if(!credential) throw new Error("Failed to create credential")

    revalidatePath("/credentials")
}