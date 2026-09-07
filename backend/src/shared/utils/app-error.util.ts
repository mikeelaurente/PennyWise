export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public status: string = "error",
  ) {
    super(message);
  }
}
