import type { NextApiResponse } from 'next'

export default function createError(
  errorMessage: string | undefined,
  errorCode: number = 500,
  error: Error | undefined = undefined
) {
  const errorStack = error == undefined ? null : (error as Error).stack

  return Response.json(
    {
      message: errorMessage == undefined ? 'An error occurred' : errorMessage,
      stack: errorStack,
    },
    { status: errorCode }
  )
}
