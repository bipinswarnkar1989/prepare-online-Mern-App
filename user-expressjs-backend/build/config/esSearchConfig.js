'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elasticClient = new _elasticsearch2.default.Client({
  host: 'localhost:9200',
  log: 'info'
});

elasticClient.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well in elasticsearch');
  }
});

exports.default = elasticClient;
//# sourceMappingURL=esSearchConfig.js.map