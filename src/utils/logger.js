import { createLogger, format, transports } from 'winston';

const customLevels = {
	levels: {
		critical: 0,
		error: 1,
		warn: 2,
		info: 3,
		debug: 4,
	},
	colors: {
		critical: 'red bold',
		error: 'red',
		warn: 'yellow',
		info: 'green',
		debug: 'blue',
	},
};

const { combine, printf, colorize } = format;

const timestamp = format.timestamp({
	format: () =>
		new Date().toLocaleString('es-UY', {
			timeZone: 'America/Montevideo',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false, // formato 24h
		}),
});

const logFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

const isDev = process.env.NODE_ENV !== 'production';

export const logger = createLogger({
	levels: customLevels.levels,
	format: combine(timestamp, logFormat),
	transports: [
		// Consola: todos los niveles
		new transports.Console({
			level: isDev ? 'debug' : 'info',
			format: combine(colorize({ all: true }), timestamp, logFormat),
		}),
		// Archivo: solo logs "critical"
		new transports.File({
			filename: 'logs/application.log',
			level: 'error',
		}),
	],
});
