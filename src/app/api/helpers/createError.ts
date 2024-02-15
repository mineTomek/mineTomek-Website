export default function createError(
  errorMessage: string | undefined,
  errorCode: number = 500,
  error: Error | undefined = undefined
) {
  const stack = error == undefined ? null : (error as Error).stack

  const message =
    errorMessage == undefined ? 'An error occurred' : errorMessage

  return Response.json(
    {
      message,
      stack,
    },
    { status: errorCode, statusText: message }
  )
}
