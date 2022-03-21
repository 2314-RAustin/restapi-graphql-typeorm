import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { PingResolver } from './resolvers/ping';
import { ProductResolver } from './resolvers/productResolver';
import { buildSchema } from 'type-graphql';

export async function startServer() {
    const app = express();

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PingResolver, ProductResolver]
        }),
        context: ( req: Request, res: Response ) => ({ req, res })
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    return app;
}

