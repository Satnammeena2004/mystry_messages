import {z} from "zod"
        

export const verifySchema = z.object({
    code:z.string().min(5 ,"atleast 5 characters").max(8)
})