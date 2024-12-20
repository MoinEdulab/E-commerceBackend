import express from 'express';
import { AppDataSource } from './data-source';
import { routes as apiRoutes } from './routes';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT || 5000; 

app.use(express.json());
app.use(cors({ origin: '*', credentials: true })); // Enable Cors for browsers
app.use('/api', apiRoutes);
// app.use('',(req,res)=>{res.json('Hello world')})
app.use('/public', express.static(path.join(__dirname, 'public')));
AppDataSource.initialize().then(async () => {
    app.listen(port, () => {
        console.log(`Express is listening at http://localhost:${port}`);
    });
});
