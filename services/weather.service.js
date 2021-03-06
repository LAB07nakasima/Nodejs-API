import axios from "axios";

// ð½ controllers ããå¥åãããç·¯åº¦çµåº¦ãåãåºã
export const getWeather = async ({ latitude, longitude }) => {
  // console.log(latitude, longitude);

  try {
    const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FTokyo`;
    const weather = (await axios.get(url)).data;
    // âaxios.get(url) ã§å¤©æ°APIãããã¼ã¿åå¾
    const weatherData = weather.daily;
    // console.log(weatherData);
    const keys = Object.keys(weatherData);
    // console.log(keys);

    const fantasticJson = [...new Array(7)].map((x, i) =>
    // mapé¢æ°ï¼éååã®åè¦ç´ ã«å¯¾ãã¦æå®ããåãå¦çãå®è¡ããæ°ããéåãä½æ
      Object.fromEntries(keys.map((x) => [x, weatherData[x][i]]))
      // (keys.map((x) => [x, weatherData[x][i]])) xé ç®ã¨xé ç®ã®å¤i ãåã
      // Object.fromEntries()é¢æ°ï¼ã­ã¼ã¨å¤ã®çµã¿åããã®ãªã¹ãããªãã¸ã§ã¯ãã«å¤æããâéåâ¨ãªãã¸ã§ã¯ã
    );
    // console.log(fantasticJson);
    
    return fantasticJson;
  } catch (e) {
    throw Error("Error while getting Weather.");
  }
};