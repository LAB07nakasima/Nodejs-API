// services/scraping.service.js

//axiosをimport 
import axios from "axios";

export const getJsonData = async (query) => {
  try {
    const url = "https://gsacademy.jp/about/";
    // axios.getでurlのデータを取得
    const html = (await axios.get(url)).data;

    // replaceAll()
    // 改行（\n と \r）タブ（\t）を空文字に置換.正規表現は /条件/ と記述し，g は条件に合うものをすべて抽出
    const minimizedHtml = html.replaceAll(/\n|\r|\t/g, "");
    const textJa = minimizedHtml.match(
      
      // (?=fug)fugの前.(?<=hoge)hogeの後.+?何文字でもおk.正規表現は/条件/で書くが，指定したい条件の中に / が存在する場合は直前に \ を入れる./gは当てはまるの全部!の意味
      // .match() で検索

      /(?<=<\/figure><p>)[\s\S]+?(?=<\/p><\/div>)/g
    );

    const textEn = minimizedHtml
      .match(
        /(?<=png" alt=")[\s\S]+?(?=" class="-of -cover lazyload"><\/figure)/g
      )
      // &quot; を' に置換する
      .map((x) => x.replaceAll(/&quot;/g, "'"));


    const imgUrl = minimizedHtml
      .match(
        // / と . はエスケープが必要！
        /\/uploads\/about_credo_0[1234567]\.png/g
      )
      // 画像 URL は先頭に https://gsacademy.jp をつけてフルパスに
      .map((x) => `https://gsacademy.jp${x}`);
      
    const credoJson = [...new Array(7)].map((x, i) => ({
      // map((x, i)でiはindexなのでi=i番目を指す
      credo_no: i + 1,
      text_ja: textJa[i],
      text_en: textEn[i],
      img_url: imgUrl[i],
    }));
  
    return credoJson;

  } catch (e) {
    throw Error("Error while getting HTML.");
  }
};
