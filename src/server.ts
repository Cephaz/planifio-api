import './config';
import app from './app';
import {PORT} from './utils/secrets';

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
