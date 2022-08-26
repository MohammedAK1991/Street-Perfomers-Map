import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 8080;

// Use Helmet for security
app.use(helmet());

// Accept JSON parsing.
app.use(express.json());

// Enable all CORS requests.
app.use(cors());

app.listen(port, () => console.info(`Qoala API listening on port ${port}!`));
