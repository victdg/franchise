import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const name = event.queryStringParameters?.name || "Mundo";

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hola, ${name}!`,
        input: event,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : String(error),
      }),
    };
  }
};
