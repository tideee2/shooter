var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//dataB = {clwidth:300,clheight:400,u1:{x:109,y:10},u2:{x:100,y:150},bullets:{b1:{x:10,y:20,dx:5,dy:5},b2:{x:100,y:120,dx:3,dy:4}}};
var dataB = {x:10,y:25};
function getButton(x,y,msg){

     var qq ={};
     switch (1*msg){
                case 87: //up 'w'
                        y += 5;
                break;
                case 65: //left 'a'
                        x -= 5;
                        break;
                case 83: //bottom 's'
                        y -= 5 ;
                        break;
                case 68: //right 'd'
                        x += 5;
                        break;
        }
        qq.x = x;
        qq.y = y;
        return qq;;
 }
app.get('/', function(req, res){
  res.sendFile('/var/www/html/shooter/index.html');
});
io.on('connection', function(socket){
  socket.on('button', function(msg){
console.log(dataB);
    var datanew = {};
    dataB = getButton(dataB.x,dataB.y,msg);
    console.log(dataB);
     //   move = move + parseInt(msg);
        io.emit('dataX', dataB.x);
       io.emit('dataY', dataB.y);
    });
});
http.listen(1253, function(){
  console.log('listening on *:1253');
});

