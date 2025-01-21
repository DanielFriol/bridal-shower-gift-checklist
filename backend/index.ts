import express, { Application } from 'express';
import dotenv from 'dotenv';
import checklistsRoutes from './express/checklist-route';
import cors from 'cors';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;
// Enable CORS for localhost
app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use('/checklists', checklistsRoutes);
