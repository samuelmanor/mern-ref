const app = require('./app'); // actual express application
const config = require('./utils/config');
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});