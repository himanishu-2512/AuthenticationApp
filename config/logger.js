const winston = require('winston');
require('winston-mongodb');
require("dotenv").config()

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(),winston.format.json(),winston.format.prettyPrint()),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.MongoDB({
            level: 'info',
            db: process.env.MONGO_URL,
            options: {
                useUnifiedTopology: true
            },
            collection: 'Logger',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
});

// Handle errors from MongoDB transport
logger.transports.forEach((transport) => {
    if (transport instanceof winston.transports.MongoDB) {
        transport.on('error', (error) => {
            console.error('MongoDB Transport Error:', error);
        });
    }
});

module.exports = logger;
