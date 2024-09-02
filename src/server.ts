import './config';
import express, {Express} from 'express';
import {PORT} from './utils/secrets';

const app: Express = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
