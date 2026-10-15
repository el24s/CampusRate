import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
        ),
        transports:[
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'logs/app.log' }),
        ],
    });
    
    use(req: Request, res: Response, next: NextFunction){
        const startTime = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - startTime;

            this.logger.info({
                timestamp: new Date().toISOString(),
                method: req.method,
                path: req.originalUrl,
                statusCode: res.statusCode,
                duration: `${duration}ms`,
            });

        });
        next();
    }
    
}