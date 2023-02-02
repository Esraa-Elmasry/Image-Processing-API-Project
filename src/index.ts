import express from 'express';
import logger from './middleware/logger';
import router from './routes/index';


const app = express();
const port =  3000;

app.use(express.json());
app.use(logger);


app.use("/api",router)

app.get('/', (req:express.Request, res:express.Response) => {
   res.status(200).send("connected");
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

 
export default app;