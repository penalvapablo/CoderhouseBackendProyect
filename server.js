import express from 'express';
import exphbs from 'express-handlebars';
import cors from 'cors';
import routes from './routes/index.js';
import './config/db.js';
import config from './config/index.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { Server } from 'socket.io';
import httpModule from 'http';

/**
 * -------------- GENERAL SETUP ----------------
 */

const app = express();
const httpServer = httpModule.Server(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors(`${config.cors}`));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Sessions
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongodb,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: false,
    cookie: {
      // maxAge: 10000, //10 segundo
      maxAge: Number(config.cookie_max_age), // 10 minutos
    },
    rolling: true,
  })
);

//  app.engine(
//   'handlebars',
//   exphbs({
//     extname: 'hanblebars',
//     defaultLayout: 'home.handlebars',
//     layoutsDir: __dirname + '/views/layouts',
//     partialsDir: __dirname + '/views/partials',
//   })
// );

// app.set('view engine', 'handlebars');
// app.set('views', __dirname + '/views');

/**
 * -------------- PRUEBAS ----------------
 */

/**
 * -------------- RUTES ----------------
 */
routes(app);

/**
 * -------------- Global variables ----------------
 */
const PORT = config.port;

/**
 * -------------- SERVER ----------------
 */
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor inicializado en el puerto ${PORT}`);
});

server.on('error', (err) => {
  console.log('Error del servidor.' + err);
});
process.on('exit', (code) => {
  console.log('Exit code -> ' + code);
});
