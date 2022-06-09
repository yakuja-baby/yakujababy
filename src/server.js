import http from "http";
import express from "express";  //express를 import
import WebSocket from "ws";

const app = express();  //express어플리케이션을 구성

app.set("view engine", "pug");  //pug로 view engine을 설정
app.set("views", __dirname + "/views"); //express에 template이 어디있는지 지정함 ->  view 디렉토리 설정(__dirname/view로)
app.use("/public", express.static(__dirname + "/public"));  //public url을 생성해서 유저에게 파일 공유해줌

app.get("/", (_, res) => res.render("home"));  //home.pug를 render해주는 router handler 생성. 
                                                //home으로 가면 request, respons를 받고 res.render(우리가 만든 home을 render함)
                                                //url선언하고 유저가 url로가면 req와 res를 받고 response를 보냄
app.get("/*",(_,res) => res.redirect("/")); //user가 어떤 url로 이동하든지 홈으로 보내줌


const handleListen = () => console.log(`Listening on http://localhost:3000`);
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

/* ----------- V 1.0 ----------- */
/* 아래 주석까지의 방식을 사용하는건 vanilla js할 때만임. event를 listen하고 어딘가에 handler를 만들었을 때만 이렇게 함*/
//function handleConnection(socket){    //소켓은 연결된 브라우저와의 contact라인임. socket을 이용하면 real-time 메세지 주고받기가 가능함. 우리는 이 socket을 저장해야함(최소한 console.log라도 해야함)
//  console.log(socket);                //server.js에도 socket이 있고, app.js에도 socket이 있는데 자바스크립트는 소스명에 따라 구분이 필요함. 
//}                                      //예를 들면 server.js의 socket은 연결된 브라우저를 의미함. 
                                         //app.js의 socket은 서버로의 연결을 뜻함
//wss.on("connection", handleConnection)  //on method에서는 event가 발동하는 것을 기다리는데 지금의 경우엔 그 이벤트가 connection인 것. 그리고 또 function을 받는데 connection 이 이루어지면 작동함.
                                        //또한 on method는 백엔드에 연결된 사람의 정보를 제공해줌. 그게 여기 socket에서 옴.
                                        //소켓은 나(server)와 브라우저 사이의 연결.
/************ 요기까지 *************/
/* ----------- V 1.0 end  ----------- */

/* ----------- V 1.1 start ----------- */
wss.on("connection", (socket) => {  // <- connection 이벤트가 발생하면 socket을 받음
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from the Browser ❌") );
  socket.on("message", message => {
    console.log(message); 
  })
  socket.send("hello!!!");
});

/* ----------- V 1.1 end  ----------- */
server.listen(3000, handleListen);


/* express로 할 일은 view를 설정해주고 render해주는 것이고 나머지는 websocket에서 실시간으로 일어날 것*/
