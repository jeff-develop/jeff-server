import merge from 'lodash/merge';
import { gql, makeExecutableSchema, IResolvers } from 'apollo-server-koa';

import * as auth from './auth';

const typeDef = gql`
  type Query {
    _version: String
  }
`;

const resolvers: IResolvers = {
  Query: {
    _version: () => '1.0'
  },
};

const schema = makeExecutableSchema({
  typeDefs: [typeDef, auth.typeDefs],
  resolvers: merge(resolvers, auth.resolvers)
});

export default schema;
