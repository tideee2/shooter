var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//dataB = {clwidth:300,clheight:400,u1:{x:109,y:10},u2:{x:100,y:150},bullets:{b1:{x:10,y:20,dx:5,dy:5},b2:{x:100,y:120,dx:3,dy:4}}};

var dataB = {x:0,y:0,x1:0,y1:0};
function getButton(x,y,x1,y1,msg,user){ //change position of players
  var qq ={};
  if (user === "u1"){ //move player 1
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
  }
  if (user === "u2"){ //move player 2
    switch (1*msg){
        case 87: //up 'w'
            y1 += 5;
        break;
        case 65: //left 'a'
            x1 -= 5;
        break;
        case 83: //bottom 's'
            y1 -= 5 ;
        break;
        case 68: //right 'd'
            x1 += 5;
        break;
    }
  }
  qq.x = x;
  qq.y = y;
  qq.x1 = x1;
  qq.y1 = y1;
  return qq;
 }
app.get('/', function(req, res){ //if you developer, change this link
  res.sendFile('/var/www/html/shooter/index.html'); // real patch to your project
});
io.on('connection', function(socket){
  var user = "0";
  socket.on('user', function(msg){ //get information about user
    user = msg;
    return user;
  });
  socket.on('button', function(msg){ //get information about moving players
    var datanew = {};
    dataB = getButton(dataB.x,dataB.y,dataB.x1,dataB.y1,msg, user);
    //console.log(dataB);

    //send info to html block
    io.emit('dataX', dataB.x);
    io.emit('dataY', dataB.y);
    io.emit('dataX1', dataB.x1);
    io.emit('dataY1', dataB.y1);
    });
 
});
http.listen(1253, function(){
  console.log('listening on *:1253');
});

