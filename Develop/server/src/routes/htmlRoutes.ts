import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.get('*', (_req, res) => {                          //get '*' a specify route that matches any path
    res.sendFile(path.join(__dirname, 'index.html'));   //send the specified file to 'index.html' as a response
});                                                      //BE SURE TO ADJUST FILE PATH OF index.html based on location of your dir

export default router;
