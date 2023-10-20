import {init} from './socket.js';
import app from './app.js';

const PORT = 8080;
const httpServer = app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});

init(httpServer);