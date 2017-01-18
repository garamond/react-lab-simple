import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';
import path from 'path';

import express from 'express';
import Koa from 'koa';
import convert from 'koa-convert';
import mount from 'koa-mount';
import graphQLHTTP from 'koa-graphql';

import schema from './schema';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// Expose a GraphQL endpoint
const graphQLServer = new Koa();
//graphQLServer.use('/', graphQLHTTP({ schema, graphiql: true, pretty: true}));
graphQLServer.use(mount('/', convert(graphQLHTTP({ schema, graphiql: true, pretty: true }))));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

config.entry.unshift(`webpack-dev-server/client?http://localhost:${APP_PORT}/`);
const compiler = webpack(config);

const app = new WebpackDevServer(compiler, {
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
});

// Serve static resources
app.use('/', express.static(path.resolve(__dirname)));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});