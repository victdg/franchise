import { Constants } from "../constants/Constants";
import { BadRequestException } from "../exceptions/BadRequestException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { TechnicalErrorException } from "../exceptions/TechnicalException";
import { UseCaseResponse } from "../model/UseCaseResponse";

export class DomainErrorMapper {
  static toUseCaseResponse(error: unknown): UseCaseResponse {
    if (error instanceof BadRequestException)
      return new UseCaseResponse(
        Constants.BAD_REQUEST_STATUS_CODE,
        Constants.BAD_REQUEST_ERROR_MESSAGE
      );
    if (error instanceof TechnicalErrorException)
      return new UseCaseResponse(
        Constants.SERVICE_UNAVAILABLE_STATUS_CODE,
        Constants.SERVICE_UNAVAILABLE_MESSAGE
      );
    if (error instanceof NotFoundException)
      return new UseCaseResponse(
        Constants.NOT_FOUND_STATUS_CODE,
        Constants.NOT_FOUND_MESSAGE
      );
    const message =
      error instanceof Error
        ? error.message
        : Constants.INTERNAL_SERVER_ERROR_MESSAGE;
    return new UseCaseResponse(
      Constants.INTERNAL_SERVER_ERROR_STATUS_CODE,
      message
    );
  }
}
