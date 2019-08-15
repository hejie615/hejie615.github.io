window.onload=function(){
	init();
}
var gameGround;
var SnakeType={
	HEAD:{value:0,url:"./img/head.png"},
	BODY:{value:1,url:"./img/body.png"}
}
//蛇数组
var snake=[];
var props=[];
//行列
var groundWidth=20;
var groundHeight=20;
//每个格子宽高
var squareWidth=30;
var timer;	//运动定时器
var block=true;	//设置在未走入下一格之前只能改变一次方向
//设置运动方向和蛇头旋转角度
var SnakeToward={
    UP: { rotate: 270, x: 0, y: -squareWidth },
    RIGHT: { rotate: 0, x: squareWidth, y: 0 },
    DOWN: { rotate: 90, x: 0, y: squareWidth },
    LEFT: { rotate: 180, x: -squareWidth, y: 0 }
}
//默认运动方向
var nowToward=SnakeToward.RIGHT;
var score=0;	//积分器
var stepTime=350;
//道具的数组
var PropTypeSet=[
	{
		name:"APPLE",
		value:2,
		url:"./img/pingguo.png",
		maxNum:2,
		//当道具被吃 当前位置创建蛇头并把之前蛇头变为蛇身，在道具数组中删除当前道具
		action:function(){
			var temp=createSquare(this.row,this.col,SnakeType.HEAD);
			snake.unshift(temp);
			renderSquare(snake[1],SnakeType.BODY);
			gameGround.removeChild(this.xr);
			props.splice(props.indexOf(this),1);   //indoexOf ???
			score+=10;
		},
		maxCtrl:function(){
			return this.maxNum;
		}
	},
	{
		name:"YINGTAO",
		value:3,
		url:"./img/yingtao.png",
		maxNum:2,
		//当道具被吃 当前位置创建蛇头并把之前蛇头变为蛇身，在道具数组中删除当前道具
		action:function(){
			var temp=createSquare(this.row,this.col,SnakeType.HEAD);
			snake.unshift(temp);
			renderSquare(snake[1],SnakeType.BODY);
			gameGround.removeChild(this.xr);
			props.splice(props.indexOf(this),1);   //indoexOf ???
			score+=15;
		},
		maxCtrl:function(){
			return this.maxNum;
		}
	},
	{
		name:"CAOMEI",
		value:4,
		url:"./img/caomei.png",
		maxNum:2,
		//当道具被吃 当前位置创建蛇头并把之前蛇头变为蛇身，在道具数组中删除当前道具
		action:function(){
			var temp=createSquare(this.row,this.col,SnakeType.HEAD);
			snake.unshift(temp);
			renderSquare(snake[1],SnakeType.BODY);
			gameGround.removeChild(this.xr);
			props.splice(props.indexOf(this),1);   //indoexOf ???
			score+=20;
		},
		maxCtrl:function(){
			return this.maxNum;
		}
	},
]
//道具的构造函数
function Prop(row,col,type){
	this.type=type;
	this.row=row;
	this.col=col;
	this.url=type.url;
	this.action=type.action;
	this.xr=null;
	this.init=function(){
		this.xr=createSquare(this.row,this.col,this.type);
	}

}
//检查道具数组中道具是否够 并创立
function randGenerateProp(){
	for(var i=0;i<PropTypeSet.length;i++){
							//检测数组和value相符合的元素并返回
		var nowLen=props.filter(function (item){
			if(item.type.value==PropTypeSet[i].value){
				return item;
			}
		}).length;
							//检测道具是否达到最大值
		if(nowLen<PropTypeSet[i].maxNum){
			var row,col;
			do{
				row = Math.floor(Math.random() * groundHeight);
                col = Math.floor(Math.random() * groundWidth);
			}while(existsProp(row,col));	//检测道具位置是否重叠
			// console.log(row+"_"+col);
			var prop=new Prop(row,col,PropTypeSet[i]);	//生成新道具
			prop.init();					//渲染新道具
			props.push(prop);
		}
	}
}
//检测道具位置是否重叠函数
function existsProp(row,col){
	var flag=0;
	for(var i=0;i<snake.length;i++){
				if(snake[i].offsetLeft==row&&snake[i].offsetTop==col)
					flag=1;
			}
	for(var i=0;i<props.length;i++){
		if(props[i].row==row&&props[i].col==col&&flag==1)
			return true;
	}

	return false;
}
//初始化函数
function init(){
	gameGround=document.getElementById("gameGround");
	createSnake();
	run();
	document.onkeydown=function(e){
		console.log(e);
		changeDirection(e.which);
	}
}
//创建蛇位置
function createSnake(){
	var head=createSquare(0,3,SnakeType.HEAD);
	var body1=createSquare(0,2,SnakeType.BODY);
	var body2=createSquare(0,1,SnakeType.BODY);
	var body3=createSquare(0,0,SnakeType.BODY);
	snake.push(head,body1,body2,body3);
}
//创建单个元素
function createSquare(row,col,type){
	var square=document.createElement("div");
	square.classList.add("square");
	square.style.left=col*squareWidth+"px";
	square.style.top=row*squareWidth+"px";
	renderSquare(square,type);
	gameGround.appendChild(square);
	return square;

}
//显示元素
function renderSquare(square,type){
	square.typeValue=type.value;
	square.style.backgroundImage="url("+type.url+")";
	square.style.transform = "rotate(" + nowToward.rotate + "deg)";
}
//运动
function run(){
	clearTimeout(timer);
	stepTime=350 - Math.min(Math.floor(score / 100) * 50, 270);
	timer=setTimeout(function(){
		var flag=checkCrash();
		if(flag.result==-1){
			clearTimeout(timer);
			timer=null;
			alert("游戏结束");
			return;
		}else if(flag.result==1){
			//吃掉道具
			flag.target.action();
			block=true;
			document.getElementsByClassName("score")[0].innerHTML=score;
		}else{
			move();
			randGenerateProp()
			block=true;
			// console.log(Math.floor(Math.random() * groundHeight));
			// console.log(Math.floor(Math.random() * groundWidth));
		}
		for (var i = 0; i < PropTypeSet.length; i++) {
            PropTypeSet[i].maxNum = PropTypeSet[i].maxCtrl();
        };
		if(timer!=null){
			run();
		}
	},stepTime);
}
function move(){
	//蛇头变成蛇身
	renderSquare(snake[0],SnakeType.BODY);
	//蛇尾取出
	var temp=snake.pop();
	//蛇尾放到下一步要走的地方
	temp.style.left=snake[0].offsetLeft+nowToward.x+"px";
	temp.style.top=snake[0].offsetTop+nowToward.y+"px";
	//蛇尾放到蛇数组里
	snake.unshift(temp);
	//蛇身渲染成蛇头
	renderSquare(snake[0],SnakeType.HEAD);
}
//改变方向
function changeDirection(which){
	if(!block){
		return;
	}
	block=false;
	if (which==37&&(SnakeToward.LEFT.x&nowToward.x)==0&&(SnakeToward.LEFT.y&nowToward.y)==0) {
		nowToward=SnakeToward.LEFT;
	}else if(which==38&&(SnakeToward.UP.x&nowToward.x)==0&&(SnakeToward.UP.y&nowToward.y)==0){
		nowToward=SnakeToward.UP;
	}else if(which==39&&(SnakeToward.RIGHT.x&nowToward.x)==0&&(SnakeToward.RIGHT.y&nowToward.y)==0){
		nowToward=SnakeToward.RIGHT;
	}else if(which==40&&(SnakeToward.DOWN.x&nowToward.x)==0&&(SnakeToward.DOWN.y&nowToward.y)==0){
		nowToward=SnakeToward.DOWN;
	}
}
//判断游戏是否结束
function checkCrash(){
	//水平方向 右边
	if(snake[0].offsetLeft + nowToward.x + squareWidth > gameGround.clientWidth ||
		//左边       
        snake[0].offsetLeft + nowToward.x < 0){
		return {result:-1,target:null};
			//垂直方向 下边
	}else if(snake[0].offsetTop + nowToward.y + squareWidth > gameGround.clientHeight ||
        		//上边
        snake[0].offsetTop + nowToward.y < 0){
			return {result:-1,target:null};
	}else{
		//蛇头下一步位置是否为蛇身
		for(var i=3;i<snake.length-1;i++){
			if(snake[0].offsetLeft+nowToward.x==snake[i].offsetLeft&&
				snake[0].offsetTop+nowToward.y==snake[i].offsetTop)
				return{result:-1,target:null};
		}
		//蛇头下一步位置是否为道具
		for(var i=0;i<props.length;i++){
			//		蛇位置         下一步位置				道具位置
			if(snake[0].offsetLeft+nowToward.x==props[i].xr.offsetLeft&&
				snake[0].offsetTop+nowToward.y==props[i].xr.offsetTop)
				return{result:1,target:props[i]};
		}
	}
	return 0;
}