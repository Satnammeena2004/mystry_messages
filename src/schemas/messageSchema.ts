import {z} from "zod"
        

export const messageSchema = z.object({
    content:z.string().min(2,"kuch to likh bhai").max(100,"kuch jyada nhi ho gya bhaiyya"),
    createdAt:z.date().optional()
})