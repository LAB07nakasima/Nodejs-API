import express from "express";
import { omikujiRouter } from "./routes/omikuji.route.js";
// ð½ è¿½å  ãããããã®ã«ã¼ãã£ã³ã°ãèª­ã¿è¾¼ã
import { jankenRouter } from "./routes/janken.route.js";
import { weatherRouter } from "./routes/weather.route.js";
// ã¹ã¯ã¬ã¤ãã³ã°ã®ã«ã¼ã¿ãimport!
import { scrapingRouter } from "./routes/scraping.route.js";

// POST ã¡ã½ããã§ãã¼ã¿ãåãåãããã«ã¯ express.urlencoded({ extended: true }) ã¨ JSON ãã¼ã¿ã®æ±ãã§ express.json() ãå¿è¦ã«ãªã
const app = express();

// ð½ è¿½å  POSTã§ãã¼ã¿ãåãåãããã«å¿è¦
app.use(express.urlencoded({ extended: true }));
// ð½ è¿½å  JSONãã¼ã¿ãä½¿ç¨ããããã«å¿è¦
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
//   const omikuji = ["å¤§å", "ä¸­å", "å°å", "å¶", "å¤§å¶"];
//   const min = 0;
//   const max = omikuji.length - 1;
//   const index = Math.floor(Math.random() * (max - min + 1)) + min;
//   console.log(index);
//   res.json({
//     uri: "/omikuji",
//     message: omikuji[index],
//   });
// });


// ð½ è¿½å  ãã¿ããã®ã«ã¼ãã£ã³ã°ãå¤æ´
app.use("/omikuji", (req, res) => omikujiRouter(req, res));

// ð½ è¿½å  ãããããã®ã«ã¼ãã£ã³ã°ãè¿½å 
app.use("/janken", (req, res) => jankenRouter(req, res));

// å¤©æ°ã®ã«ã¼ãã£ã³ã°ãè¿½å 
app.use("/weather", (req, res) => weatherRouter(req, res));

// ã¹ã¯ã¬ã¤ãã³ã°ã®ã«ã¼ãã£ã³ã°ãè¿½å 
app.use("/scraping", (req, res) => scrapingRouter(req, res));

// ãããããã®API
app.get("/janken", (req, res) => {
  res.json({
    uri: "/janken",
    message: "This is Janken URI!",
  });
});


// app.listen ãµã¼ãã¼ç«ã¡ä¸ããã
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

