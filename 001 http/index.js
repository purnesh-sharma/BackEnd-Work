const http = require('http');
const obj = require('./support')

// console.log(http);

http.createServer((req,res)=>{

    console.log(req.method);
    console.log(req.url);
    // res.end('hello test')

    if(req.url=== "/purnesh"){
        res.end('hello purnesh')
    }
    if(req.url === '/greet'){
        // res.end('hello world')
    }

    if(req.url === '/greet' && req.method === 'GET'){
        res.end('hello get greet')
    }

    if(req.url === '/greet' && req.method === 'POST'){
        res.end(JSON.stringify(obj));
    }

   
}).listen(3200);

