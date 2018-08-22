import elasticsearch from 'elasticsearch';

var elasticClient = new elasticsearch.Client({
  host: 'elasticsearch:9200',
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

export default elasticClient;