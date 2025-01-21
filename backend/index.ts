import express, { Application } from 'express';
import dotenv from 'dotenv';
import checklistsRoutes from './express/checklist-route';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/checklists', checklistsRoutes);
