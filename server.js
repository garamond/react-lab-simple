import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';

import Schema from './schema';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';

const {
  NODE_ENV,
  PORT = "3000"
} = process.env;

config.entry.unshift(`webpack-dev-server/client?http://localhost:${PORT}/`);
const compiler = webpack(config);

const devServer = new WebpackDevServer(compiler, {
  setup(app) {
    app.use(bodyParser.json());
    app.use((req, res, next) => {
      if(req.url === '/graphql' && req.method === "POST") {
        // Executing the GraphQL query
        const {query, variables} = req.body;
        graphql(Schema, query, null, variables).then(result => {
          res.send(result);
        });
      } else {
        next();
      }
    });
  }
});

devServer.listen(PORT, (err, result) => {
  if(err) {
    throw err;
  }
  console.log(`Listening on localhost:${PORT}`);
});