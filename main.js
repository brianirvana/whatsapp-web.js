// Importamos el módulo de QR para iniciar sesión.
const qrcode = require('qrcode-terminal');

// Importa la función connectToDatabase desde db.js
const connectToDatabase = require('./db');

//
const { Client, LocalAuth, MessageMedia, Buttons, List } = require('whatsapp-web.js');

// const button = new Buttons('!Body', [{id:'1', body:'Aceptar'}, {id:'0', body:'Rechazar'}], 'title', 'footer');

// Test botones
const myGroupName = "BenderAO Online (20 Años! 2004/2024)";

const quotes = {
    method: 'GET',
    url: 'https://type.fit/api/quotes'
};

// Create a new client instance
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: "sessions",
    }),
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
}});

// Descomentar para volver a iniciar sesión o usar npm shell para iniciar sesión con el QR.
 client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
}); 

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Bot loaded.');
    // Llama a la función para iniciar la conexión a la base de datos
    console.log('Iniciando conexión a la db...');
    connectToDatabase();
});

client.on("remote_session_saved", () => {
    console.log('Sesión guardada.')
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("auth_failure", (msg) => {
  console.error("AUTHENTICATION FAILURE", msg);
});


client.on("message", (message) => {
/*     if(message.body === 'list_response'){
    } */
  });
   
// Saludo de bienvenida
client.on('message', async (msg) => {
    if (msg.body.toLowerCase() === 'hola') {

        console.log('Mensaje de ' + msg.from + ': ' + msg.body);
        const chat = await msg.getChat();
        let user = await msg.getContact();

        await chat.sendMessage(`Hola @${user.id.user}`, {
            mentions: [user]
        });

//Test de multiplechoice: (No funciona)
/*          const productsList = new List(
            "Here's our list of products at 50% off",
            "View all products",
            [
              {
                title: "Products list",
                rows: [
                  { id: "apple", title: "Apple" },
                  { id: "mango", title: "Mango" },
                  { id: "banana", title: "Banana" },
                ],
              },
            ],
            "Please select a product"
          );
          // Cambia "recipient" por el número de teléfono del chat individual
          client.sendMessage("recipient", productsList); */

    }
});

client.on("message_create", (message) => {
    if (message.listResponse) {
      message.reply(`You've selected ${message.listResponse}`);
    }
  });

/* 
// Cuando recibe un mensaje:
client.on('message_create', message => {
	if (message.body === '/ping') {
		// reply back "pong" directly to the message
		message.reply('pong');
	}
}); */

// Start your client
client.initialize();