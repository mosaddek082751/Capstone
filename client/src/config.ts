// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'a9cw7u6s7d'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-mosaddek2751.auth0.com',            // Auth0 domain
  clientId: 'TNYv0sZenu1RewSvH3LUFO4MYR81CfC0',          // Auth0 client id
  callbackUrl: 'http://capstone-serverless-mosaddek082751.s3-website-us-east-1.amazonaws.com/callback'
}
