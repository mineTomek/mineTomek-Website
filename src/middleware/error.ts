import type { NextApiResponse } from "next"

export default function createError(errorMessage: string | undefined, res: NextApiResponse, error: Error | undefined = undefined, errorCode: number = 500) {
    const errorStack = error == undefined ? null : (process.env.NODE_ENV === 'production' ? null : (error as Error).stack)

    res.status(errorCode).json({
      message: errorMessage == undefined ? 'An error occurred' : errorMessage,
      stack: errorStack,
    })
}