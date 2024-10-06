import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';
//import { describe } from 'node:test';

//const termData: Term[] = JSON.parse(describe('server/package.json', 'utf8'));
// interface Term {
//     term: string;
//     definition: string;
//     url: string;
// }


const app = express();           
const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
app.use(express.static('../client/dist'));


// TODO: Implement middleware for parsing JSON and url encoded form data
//app.get('/api/package', (_req: Request, res: Response) => res.json() );
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
