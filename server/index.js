/*
* @Author: Shubham Bansal
* @Date:   2018-02-05 21:55:08
* @Last Modified by:   Shubham Bansal
* @Last Modified time: 2018-02-08 03:39:48
*/
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';

import { Resolvers } from './data/resolvers';
import { Schema } from './data/schema';
import { Mocks } from './data/mocks';

const GRAPHQL_PORT = 8080;
const app = express();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  name: Resolvers,
});

// we can comment out this code for mocking data
// we're using REAL DATA now!
// addMockFunctionsToSchema({
//   schema: executableSchema,
//   mocks: Mocks,
//   preserveResolvers: true,
// });

// `context` must be an object and can't be undefined when using connectors
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  context: {}, // atleast (!) an empty object
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

const graphQLServer = createServer(app);

graphQLServer.listen(GRAPHQL_PORT, () => console.log(`GraphQL Server is now running on http:://localhost:${GRAPHQL_PORT}/graphql`));
