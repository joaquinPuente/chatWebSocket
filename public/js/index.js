(function () {
    const socket = io();
    let username;

    //form-message
    const formMessage = document.getElementById('form-message');
    //input-message
    const inputMessage = document.getElementById('input-message');
    //log-message
    const logMessage = document.getElementById('log-message');

    formMessage.addEventListener('submit', (event)=>{
        event.preventDefault();

        const text = inputMessage.value;
        socket.emit('new-message', {username,text})
        inputMessage.value ='';
        inputMessage.focus();

    })

    function updateLogMessage(message) {
        logMessage.innerText = '';
        message.forEach((msg) => {
            const p = document.createElement('p');
            const timestamp = new Date(msg.timestamp);
            const formattedTime = timestamp.toLocaleString();
            p.innerHTML = `(${formattedTime}) - ${msg.username}: ${msg.text}`;
            logMessage.appendChild(p);
        });
    }

    function scrollToBottom() {
        const logMessage = document.getElementById('log-message');
        logMessage.scrollTop = logMessage.scrollHeight;
    }

    socket.on('notification', ({message}) => {
        updateLogMessage(message);
        scrollToBottom();
    })

    socket.on('new-client', (data) => {
        if (data.username) {
            Swal.fire({
                text: `Nuevo usuario conectado: ${data.username}`,
                toast: true,
                position: 'top-right',
            });
        } else {
            Swal.fire({
                text: 'Nuevo usuario conectado',
                toast: true,
                position: 'top-right',
            });
        }
    });

    Swal.fire({
        title: 'Identificate por favor',
        input: 'text',
        inputLabel: 'Ingresa tu username',
        allowOutsideClick: false,
        inputValidator: (value)=>{
            if(!value){
                return 'Necesitamos que ingreses un username para continuar';
            }
        },
    })
    .then((result) => {
        username = result.value.trim();
        console.log(`Hola ${username}`);
    }).catch((err) => {
        console.log(`No se obstuvo username - Error: ${err}`);
    });


})();