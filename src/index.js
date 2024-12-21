import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import memory from "./routes/memo.route.js";
import map from "./routes/userMap.route.js";
import userRouter from "./routes/user.router.js"; // 사용자 라우터 추가
import memoryImage from "./routes/memoryImage.route.js";
import userHomeRouter from "./routes/user.home.router.js";
import { configureMiddleware } from "./middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

configureMiddleware(app);

app.use("/api/v1/users/home", userHomeRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(
    {},
    {
      swaggerOptions: {
        url: "/openapi.json",
      },
      explorer: true,
    }
  )
);

app.get("/openapi.json", async (req, res) => {
  const options = {
    openapi: "3.0.0",
    language: "ko-KR",
    disableLogs: true,
    autoHeaders: true,
    autoQuery: true,
    autoBody: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null";
  const routes = [
    "./src/index.js",
    "./src/routes/*.router.js",
    "./src/routes/*.route.js",
  ];

  // 요청의 host와 protocol을 동적으로 가져오기
  const protocol = req.protocol; // http 또는 https
  const host = req.get("host");

  const doc = {
    info: {
      title: "낭만여지도",
      description: "낭만여지도 API request 및 response 테스트",
      version: "1.0.0",
    },
    host: `${protocol}://${host}`, // 요청에 따라 동적 설정
    schemes: [protocol],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      {
        name: "Users",
        description: "사용자 관련 API",
      },
    ],
    definitions: {},
    securityDefinitions: {},
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.use("/api/v1", memory);
app.use("/api/v1/users", map);
app.use("/api/v1", memoryImage);

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  res.json({ userId: userId });
});
