import axios from "axios"



export  const getSession = async()=>{
 const session =await axios.get("/api/auth/session");
 return session.data;
}