import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'


import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { createLogger } from '../../utils/logger'
const logger = createLogger('api_calls')

import {getTodoItem, generateUploadUrl} from "../../businessLogic/todos";

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Event Processing', event)

  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)

  // Velidate user owns the requested item.
  const todoItem = await getTodoItem(todoId, userId)

  if (!todoItem) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'This Todo not exist'
      })
    }
  }

  const signedUrl = generateUploadUrl(todoId, userId)
  logger.info('Signed upload url generated', {todoId: todoId, userId: userId, signedUrl: signedUrl})

  return {
    statusCode: 200,
    body: JSON.stringify({
      "uploadUrl": signedUrl
    })
  }
})

handler.use(cors({
  credentials: true
}))
