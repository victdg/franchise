export class UseCaseResponse {
  public readonly statusCode: number = 200;
  public readonly body: string;

  constructor(statusCode: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.body = JSON.stringify({
      data: data,
      message: message,
    });
    console.log("useCaseResponse::>> ", this.body);
  }
}
