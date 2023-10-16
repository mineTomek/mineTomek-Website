import type { NextApiResponse } from 'next'

export default function createError(
  errorMessage: string | undefined,
  res: NextApiResponse,
  errorCode: number = 500,
  error: Error | undefined = undefined
) {
  const errorStack =
    error == undefined
      ? null
      : (error as Error).stack

  res.status(errorCode).json({
    message: errorMessage == undefined ? 'An error occurred' : errorMessage,
    stack: errorStack,
  })
}
