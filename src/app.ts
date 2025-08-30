import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Mercado Publico Scraper API');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
