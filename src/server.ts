import Koa from 'koa';
import { ApolloServer, gql } from 'apollo-server-koa';
import database from './database';

import * as authCtrl from './controller/auth.ctrl';

class Server {
  private app: Koa;
  private apolloServer: ApolloServer | null = null;

  constructor() {
    this.app = new Koa();

    this.setApolloServer();
  }

  private setApolloServer(): void {
    const typeDefs = gql`
      type Query {
        hello: String
        good: String
      },
      type User {
        email: String
        name: String
      },
      type Token {
        accessToken: String
        refreshToken: String
      },
      type Auth {
        user: User
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

    const resolvers = {
      Query: {
        good: () => 'Hello world!'
      },
      Mutation: {
        requestEmailLogin: async (_: any, params: Login) => authCtrl.requestEmailLogin(params),
        requestEmailRegister: async(_: any, params: Register) => authCtrl.requestEmailRegister(params)
      }
    };

    this.apolloServer = new ApolloServer({ typeDefs, resolvers });
    this.apolloServer.applyMiddleware({ app: this.app });
  }

  private async connectDatabase(): Promise<void> {
    try {
      console.log('Try connect database');
      await database();
      console.info('Success connection database');
    } catch (error) {
      console.error('Fail connection database');
      console.error(`Error Message: ${error.message}`);
      throw new Error(error);
    }
  }

  public async start(port: string = "4000"): Promise<void> {
    await this.connectDatabase();
    this.app.listen(port);
    console.log(`Jeff-Server application is up and running on port ${port}`);
  }
}

export default Server;
