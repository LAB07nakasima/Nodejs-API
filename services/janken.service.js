export const getJanken = async (query) => {
  try {
    // とりあえずテストで指定の手が出るか、結果が出るか確認
    // return { yourHand: query.myhand, comHand: "グー", result: "テスト中";

    const hand = ["グー", "チョキ", "パー"];
    const myIndex = hand.indexOf(query.myhand);
    if (myIndex === -1) return { message: "Invalid hand..." };
    // グーチョキパー以外のテキストが来ると-1を返すという動き
    
    const comIndex = Math.floor(Math.random() * 3);
    const resultSheet = [
      ["Draw", "Win", "Lose"],
      ["Lose", "Draw", "Win"],
      ["Win", "Lose", "Draw"],
    ];
    return {
      yourHand: query.myhand,
      comHand: hand[comIndex],
      result: resultSheet[myIndex][comIndex],
    };

  } catch (e) {
    throw Error("Error while getting Janken");
  }
};