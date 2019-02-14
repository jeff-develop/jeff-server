import { gql, IResolvers } from 'apollo-server-koa';
import * as authCtrl from '../controller/auth.ctrl';

const typeDefs = gql`
  type AuthUser {
    email: String
    name: String
  },
  type Token {
    accessToken: String
    refreshToken: String
  },
  type Auth {
    user: AuthUser
    token: Token
    error: Boolean
    code: String
  },
  type Mutation {
    requestEmailLogin(email: String!, password: String!): Auth
    requestEmailRegister(email: String!, password: String!, name: String!): Auth
  }
`;

interface Login {
  email: string;
  password: string;
};

interface Register {
  email: string;
  password: string;
  name: string;
};

const resolvers: IResolvers = {
  Mutation: {
    requestEmailLogin: async (_: any, params: Login) => authCtrl.requestEmailLogin(params),
    requestEmailRegister: async(_: any, params: Register) => authCtrl.requestEmailRegister(params)
  }
}

export {
  typeDefs,
  resolvers
};
