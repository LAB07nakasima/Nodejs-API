import { getWeather } from "../services/weather.service.js";

export const getResult = async (req, res, next) => {
   // ð½ GETã§éä¿¡ããããã¼ã¿ãåãåã
   console.log(req.query);
   // ð½ ç·¯åº¦çµåº¦ãåãåºãï¼ãã¼ã¿ããªãå ´åã«ã¯æ±äº¬ã®å¤ãè¨­å®ï¼
   const latitude = req.query.latitude ?? 35.6785;
   const longitude = req.query.longitude ?? 139.6823;
  try {
    // ð½ ç·¯åº¦çµåº¦ããµã¼ãã¹ã®é¢æ°ã«å¥åããï¼åå²ä»£å¥ãä½¿ç¨ï¼
    const result = await getWeather({ latitude, longitude });
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully get Weather!",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};