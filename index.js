import { ApolloServer, gql } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageProductionDefault
} from "apollo-server-core";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import "dotenv/config";
import typeDefs from "./src/auth/schemas/TypeDefs";
import resolvers from "./src/auth/schemas/Resolvers";
const DB_URL = process.env.MONGO_URI || "mongodb://localhost:27017/fidia";
const APP_PORT = process.env.PORT || 4000;

const startServer = async (typeDefs, resolvers) => {
  const app = express();

  app.get("/", async (req, res) => {
    res.redirect("https://studio.apollographql.com/graph/fidia-graph/explorer?variant=current");
  });

  try {
    await mongoose.connect(DB_URL);
    console.log("mongo connected");
  } catch (error) {
    console.log({ message: error.message });
  }

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageProductionDefault({
        graphRef: process.env.APOLLO_GRAPH_REF,
        footer: false
      })
    ]
  });

  await server.start();
  server.applyMiddleware({ app });

  await new Promise((resolve) =>
    httpServer.listen({ port: APP_PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

startServer(typeDefs, resolvers);
