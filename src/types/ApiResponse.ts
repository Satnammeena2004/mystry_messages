import { MessageType } from "@/models/User";



export interface ApiResponseType {
    success:boolean,
    message:string,
    isAcceptMessage?:boolean,
    messages?:MessageType[]
}