import express from "express";  //express를 import

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

const handleConnection() {}
wss.on("connection", handleConnection)

app.listen(3000);


/* express로 할 일은 view를 설정해주고 render해주는 것이고 나머지는 websocket에서 실시간으로 일어날 것*/
