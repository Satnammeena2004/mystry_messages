import {z} from "zod"
        

export const verifySchema = z.object({
    code:z.string().min(6 ,"atleast 6 characters")
})