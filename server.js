import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';

const {
  NODE_ENV,
  PORT = "3000"
} = process.env;

config.entry.unshift(`webpack-dev-server/client?http://0.0.0.0:${PORT}/`);
const compiler = webpack(config);

const devServer = new WebpackDevServer(compiler);

devServer.listen(PORT, (err, result) => {
  if(err) {
    throw err;
  }
  console.log(`Listening on 0.0.0.0:${PORT}`);
});