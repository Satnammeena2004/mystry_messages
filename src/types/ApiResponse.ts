import { Message } from "postcss";


export interface ApiResponseType {
    success:boolean,
    message:string,
    isAcceptMessage?:boolean,
    messages?:Array<Message>
}