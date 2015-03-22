var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  cl_c = {clwidth:300,clheight:400,u1:{x:10,y:10},u2:{x:100,y:150},bullets:{b1:{x:10,y:20,dx:5,dy:5},b2:{x:100,y:120,dx:3,dy:4}}};
  action_array = {action:'buttonPush',newbullets:{user:'u1',mx:15,my:20},usergo:{user:'u1',button:65}}
  console.log('start coords');
  //console.log('-------'+cl_c[cl_c.newbullets.user].x+'------');
 // console.log(Object.size(cl_c.bullets));
  console.log(cl_c);
  console.log('-----------------------');
  var new_c = getAction(cl_c,action_array);
  console.log(new_c);
  //response.write(new_c);
  response.write('qqq');
  response.end();
}).listen(8888);

function getAction(data,action_data){
		switch (action_data.action){
			case 'buttonPush':
				data = getButton(data,action_data);
				break;
			case 'mouseClick':
				data = newBullet(data,action_data);console.log('q');
				break;
		}
		data = newCoords(data);
		return data;
}

function newCoords(cl_c){
	/*
	cl_c.u1.x = ((cl_c.u1.x-cl_c.u1.dx>=0)&&(cl_c.u1.x+cl_c.u1.dx<=cl_c.clwidth) ? cl_c.u1.x + cl_c.u1.dx : cl_c.u1.x);//new x coords user1
	cl_c.u1.y = ((cl_c.u1.y-cl_c.u1.dy>=0)&&(cl_c.u1.y+cl_c.u1.dy<=cl_c.clheight) ? cl_c.u1.y + cl_c.u1.dy : cl_c.u1.y); //new y coords user1
	cl_c.u2.x = ((cl_c.u2.x-cl_c.u2.dx>=0)&&(cl_c.u2.x+cl_c.u2.dx<=cl_c.clwidth) ? cl_c.u2.x + cl_c.u2.dx : cl_c.u1.x);//new x coords user2
	cl_c.u2.y = ((cl_c.u2.y-cl_c.u2.dy>=0)&&(cl_c.u2.y+cl_c.u2.dy<=cl_c.clheight) ? cl_c.u2.y + cl_c.u2.dy : cl_c.u1.y);//new y coords user2
	*/
	for (var key in cl_c.bullets){
		cl_c.bullets[key].dx = ((cl_c.bullets[key].x + cl_c.bullets[key].dx<=0)|| (cl_c.bullets[key].x + cl_c.bullets[key].dx>=cl_c.clwidth )) ? -cl_c.bullets[key].dx : cl_c.bullets[key].dx;
		cl_c.bullets[key].dy = ((cl_c.bullets[key].y + cl_c.bullets[key].dy<=0)|| (cl_c.bullets[key].y + cl_c.bullets[key].dy>=cl_c.clwidth )) ? -cl_c.bullets[key].dy : cl_c.bullets[key].dy;
		cl_c.bullets[key].x += cl_c.bullets[key].dx;
		cl_c.bullets[key].y += cl_c.bullets[key].dy;
	}//new coords of all bullets;
	
	return cl_c;
}

function getButton(dataB,dataA){
	switch (dataA.usergo.button){
		case 87: //up 'w'
			dataB[dataA.usergo.user].y += 5;
		break;
		case 65: //left 'a'
			dataB[dataA.usergo.user].x -= 5;
			break;
		case 83: //bottom 's'
			dataB[dataA.usergo.user].y -= 5 
			break;
		case 68: //right 'd'
			dataB[dataA.usergo.user].x += 5;
			break;
	}
	return dataB;
}

function newBullet(dataM,dataA){
	newb_user_x = dataM[dataA.newbullets.user].x; //x mouse coords
	newb_user_y = dataM[dataA.newbullets.user].y; //y mouse coords
	var nb ={};

	var mmm = Math.sqrt(Math.pow(Math.abs(newb_user_x - dataA.newbullets.mx),2)+Math.pow(Math.abs(newb_user_y - dataA.newbullets.my),2)); //hypotenuse between mouse and user
	nb.dx = Math.round(Math.abs(newb_user_x - dataA.newbullets.mx)/mmm*10); //x speed new bullet
	nb.dy = Math.round(Math.abs(newb_user_y - dataA.newbullets.my)/mmm*10); //y speed new bullet
	nb.x = newb_user_x+nb.dx; //x coords new bullet
	nb.y = newb_user_y+nb.dy; //y coords new bullet
	//delete dataM.newbullets; //delete newbullets array from coords arr
	dataM.bullets['b'+ parseInt(Object.size(dataM.bullets)+1)] = nb; //add new bullet to coords array
	return dataM;
}
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};