import app from './app.js';
import { logger } from './utils/logger.js';

const PORT = process.env.APP_PORT || 3003;
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});