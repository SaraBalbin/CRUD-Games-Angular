// Se debe ejecutar en la terminar npm i @types/express @types/morgan @types/cors -D
import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors'; 

import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';

class Server{
    public app: Application;

    constructor(){
        this.app = express();
        this.config(); // Configura la app
        this.routes(); // Define rutas
    }

    config(): void{
        // Si ya hay un puerto lo toma, si no toma el 3000
        this.app.set('port', process.env.PORT || 3000); 
        this.app.use(morgan('dev')); // Muestra que piden los clientes
        this.app.use(cors()); // Pedir datos al servidor
        this.app.use(express.json()); // Aceptar formatos json de aplicaciones cliente
        this.app.use(express.urlencoded({extended: false})); // Enviar desde formulario html
    }

    routes():void{
        // Se definen las rutas
        this.app.use(indexRoutes);
        // Se añade prefijo '/api/games', para acceder a las rutas de gamesRoutes, el 
        // usuario debe colocar el prefijo especificado
        this.app.use('/api/games', gamesRoutes); 

    }

    start():void{
        this.app.listen(this.app.get('port'), () =>{
            console.log('Server on port ', this.app.get('port'))
        })
    }
}

const server = new Server();
server.start();