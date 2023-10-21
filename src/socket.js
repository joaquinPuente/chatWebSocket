import { Server } from "socket.io";

let io;
let message = [];
let username;

export const init = (httpServer)=>{
    io = new Server(httpServer);


    io.on('connection', (socketClient)=>{
        console.log('connection');
        console.log(`Se ha conectado el cliente ${socketClient.id}`);
    
        socketClient.emit('notification', {message})

        socketClient.broadcast.emit('new-client', { username })

        socketClient.on('new-message', (data) => {
            const { username, text } = data;
            const timestamp = new Date();
            const messageData = { username, text, timestamp };
            message.push(messageData);
            io.emit('notification', { message });
        });        
    
    })


    console.log('Server socket running...');
    
}