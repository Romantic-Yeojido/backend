import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import map from "./routes/map.route.js";
import userRouter from "./routes/user.router.js"; // 사용자 라우터 추가

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
      explorer : true
    }
  )
);

app.get("/openapi.json", async (req, res) => {
  const options = {
    openapi: "3.0.0",
    language: 'ko-KR',
    disableLogs: true,
    autoHeaders: true,
    autoQuery: true,
    autoBody: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null";
  const routes = [
    "./src/index.js",
    "./src/routes/*.router.js",  // 사용자 관련 라우터 경로 추가


  ];
  const doc = {
    info: {
      title: "낭만여지도",
      description: "낭만여지도 API request 및 response 테스트",
      version : '1.0.0'
    },
    host: "localhost:3000",
    basePath: "/api/v1",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{
      name: "Users",
      description: "사용자 관련 API"
    }],
    definitions: {},
    securityDefinitions: {}
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.use("/api/v1/users", map);
