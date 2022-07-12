// controllers/scraping.controller.js

import { getJsonData } from "../services/scraping.service.js";

export const getResult = async (req, res, next) => {
  try {
    const result = await getJsonData({});
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully get getJsonData!",
    });
  } catch (e) {
    return res.status(500).json({ status: 500, message: e.message });
  }
};
