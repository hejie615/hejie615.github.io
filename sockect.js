//引入一个http标准模块  CommandJS模块标准
const http = require("http");
const fs = require("fs");
const ws = require("socket.io");


const server = http.createServer(function(req,res){

	const html = fs.readFileSync("qd.html")
	res.end(html);
});//创建一个web服务器

const io = ws(server);//基于当前web服务开启socket实例

io.on("connection",function(socket){
	
	//接受客户端所发送的信息
	socket.on("message",function(mes){
		//向所有客户端广播发布的消息
		console.log(mes);
		io.emit("message",mes);
	});
});

server.listen(3000);//web服务监听3000端口


//60分