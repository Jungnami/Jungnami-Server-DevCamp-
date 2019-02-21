var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var {PythonShell} = require('python-shell')

//5분마다 기사 크롤링
cron.schedule('*/0.3 * * * *', async () => {
    
  var options = {

    mode: 'text',

    pythonPath: 'crawling/venv/bin/python',

    pythonOptions: ['-u'],

    scriptPath: '',

    args: []

  };


  ///Users/kangsujin/Desktop/autoCrawling/crawling/article_crawler.py
  PythonShell.run('../crawling/article_crawler.py', options, function (err, results) {

    if (err) {
      console.log("err");
      throw err;}

    console.log('results: %j', results);
  
  });
});

module.exports = router;