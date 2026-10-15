import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Response } from 'express';
import { ProblemDetailsDto } from '../dto/problems-details.dto';

@Catch(HttpException)
export class ProblemDetailsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ProblemDetailsFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    this.logger.error(
      `[ERROR] Status${status} | Method: ${request.method} | Path: ${request.url} | Message: ${exception.message}`,
      exception.stack,
    )
    
    const problemDetails: ProblemDetailsDto = {
      type: 'about:blank',
      title: HttpStatus[status] || 'Error',
      status: status,
      detail:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || 'An error occurred',
      instance: ctx.getRequest().url,
      errors: (exceptionResponse as any).errors || undefined,
    };

    response
    .status(status)
    .header('Content-Type', 'application/problem+json')
    .json(problemDetails);
  }
}