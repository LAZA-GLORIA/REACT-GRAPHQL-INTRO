import "reflect-metadata";
import { buildSchema } from "type-graphql";
import dataSource from "./db";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { BookResolver } from "./resolvers/BookResolver";

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [BookResolver],
  });
  const {
    ApolloServerPluginLandingPageLocalDefault,
  } = require("apollo-server-core");

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  // The `listen` method launches a web server.
  //un objet que je desctructure donc le type a la forme d'un objet
  await server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

  // app.listen(5001, () => {
  //   console.log("Listen on port 5001");
  // });
};

start();
