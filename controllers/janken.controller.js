import { getJanken } from "../services/janken.service.js";

export const getResult = async (req, res, next) => {
  try {
    const result = await getJanken(req.body);
    console.log(result);
    return res.status(200).json({
      status: 200,
      result: result,
      message: "successfully get Janken!",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};