var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true),
        pathname = urlObj['pathname'],
        query = urlObj['query'];

    //->处理静态资源文件的请求
    var reg = /\.([a-z]+)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = 'text/plain';
        switch (suffix) {
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
        }
        var conFile = 'file is not found!',
            status = 404;
        try {
            conFile = fs.readFileSync('.' + pathname, 'utf8');
            status = 200;
        } catch (e) {
            suffixMIME = 'text/plain';
        }
        response.writeHead(status, {'content-type': suffixMIME + ';charset=utf-8;'});
        response.end(conFile);
        return;
    }

    //->处理API
    var studentData = fs.readFileSync('./json/student.json', 'utf-8');
    studentData = JSON.parse(studentData);

    if (pathname === '/getList') {
        var n = query['n'],
            result = {
                total: Math.ceil(studentData.length / 10),
                data: []
            };
        for (var i = (n - 1) * 10; i <= n * 10 - 1; i++) {
            if (i > studentData.length - 1) {
                break;
            }
            result.data.push(studentData[i]);
        }
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
        return;
    }

    if (pathname === '/getInfo') {
        var id = query['id'];
        studentData.forEach(function (item, index) {
            if (item['id'] == id) {
                result = item;
            }
        });
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
    }
});
server1.listen(8080, function () {
    console.log('server is success,listing on 8080 port!');
});