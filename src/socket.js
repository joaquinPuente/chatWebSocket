import { Server } from "socket.io";

let socketServer;

export const init = (httpServer)=>{
    socketServer = new Server(httpServer);
    
}