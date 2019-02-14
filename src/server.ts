import Koa from 'koa';
import { ApolloServer, gql } from 'apollo-server-koa';
import database from './database';

import schema from './graphql/schema';

class Server {
  private app: Koa;
  private apolloServer: ApolloServer | null = null;

  constructor() {
    this.app = new Koa();

    this.setApolloServer();
  }

  private setApolloServer(): void {
    this.apolloServer = new ApolloServer({ schema });
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
