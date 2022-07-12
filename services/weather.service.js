import axios from "axios";

// 🔽 controllers から入力された緯度経度を取り出す
export const getWeather = async ({ latitude, longitude }) => {
  // console.log(latitude, longitude);

  try {
    const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FTokyo`;
    const weather = (await axios.get(url)).data;
    // ↑axios.get(url) で天気APIからデータ取得
    const weatherData = weather.daily;
    // console.log(weatherData);
    const keys = Object.keys(weatherData);
    // console.log(keys);

    const fantasticJson = [...new Array(7)].map((x, i) =>
    // map関数：配列内の各要素に対して指定した同じ処理を実行し、新しい配列を作成
      Object.fromEntries(keys.map((x) => [x, weatherData[x][i]]))
      // (keys.map((x) => [x, weatherData[x][i]])) x項目とx項目の値i を取る
      // Object.fromEntries()関数：キーと値の組み合わせのリストをオブジェクトに変換する★配列⇨オブジェクト
    );
    // console.log(fantasticJson);
    
    return fantasticJson;
  } catch (e) {
    throw Error("Error while getting Weather.");
  }
};