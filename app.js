import express from "express";
import { omikujiRouter } from "./routes/omikuji.route.js";
// 🔽 追加 じゃんけんのルーティングを読み込む
import { jankenRouter } from "./routes/janken.route.js";
import { weatherRouter } from "./routes/weather.route.js";
// スクレイピングのルータをimport!
import { scrapingRouter } from "./routes/scraping.route.js";

// POST メソッドでデータを受け取るためには express.urlencoded({ extended: true }) と JSON データの扱いで express.json() が必要になる
const app = express();

// 🔽 追加 POSTでデータを受け取るために必要
app.use(express.urlencoded({ extended: true }));
// 🔽 追加 JSONデータを使用するために必要
app.use(express.json());

const port = 3001;

app.get("/", (req, res) => {
  res.json({
    uri: "/",
    message: "Hello Node.js!",
  });
});


// app.get("/omikuji", (req, res) => {
//   res.json({
//     uri: "/omikuji",
//     message: "This is Omikuji URI!",
//   });
// });

// app.get("/omikuji", (req, res) => {
//   const omikuji = ["大吉", "中吉", "小吉", "凶", "大凶"];
//   const min = 0;
//   const max = omikuji.length - 1;
//   const index = Math.floor(Math.random() * (max - min + 1)) + min;
//   console.log(index);
//   res.json({
//     uri: "/omikuji",
//     message: omikuji[index],
//   });
// });


// 🔽 追加 おみくじのルーティングを変更
app.use("/omikuji", (req, res) => omikujiRouter(req, res));

// 🔽 追加 じゃんけんのルーティングを追加
app.use("/janken", (req, res) => jankenRouter(req, res));

// 天気のルーティングを追加
app.use("/weather", (req, res) => weatherRouter(req, res));

// スクレイピングのルーティングを追加
app.use("/scraping", (req, res) => scrapingRouter(req, res));

// じゃんけんのAPI
app.get("/janken", (req, res) => {
  res.json({
    uri: "/janken",
    message: "This is Janken URI!",
  });
});


// app.listen サーバー立ち上げよう
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

