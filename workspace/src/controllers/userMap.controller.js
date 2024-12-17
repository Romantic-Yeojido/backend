import { StatusCodes } from "http-status-codes";
import { listUserMemoryLocs } from "../services/userMap.service.js";

export const handleListUserMemoryLocs = async (req, res, next) => {
  const locations = await listUserMemoryLocs(parseInt(req.params.userId));
  res.status(StatusCodes.OK).json({ result: locations });
};
