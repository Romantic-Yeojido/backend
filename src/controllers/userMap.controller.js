import { StatusCodes } from "http-status-codes";
import { bodyToNewPin } from "../dtos/userMap.dto.js";
import { createNewPin } from "../services/userMap.service.js";
import {
  listUserMemoryLocs,
  ItemLocMemeory,
} from "../services/userMap.service.js";

export const handleListUserMemoryLocs = async (req, res, next) => {
  try {
    const locations = await listUserMemoryLocs(parseInt(req.params.userId));
    res.status(StatusCodes.OK).json({
      success: true,
      result: locations,
    });
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: err.message,
    });
  }
};

export const handleItemLocMemory = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const { latitude, longitude } = req.query;
    const memory = await ItemLocMemeory(userId, latitude, longitude);
    res.status(StatusCodes.OK).json({
      success: true,
      result: memory,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};

export const handleAddNewLoc = async (req, res, next) => {
  try {
    const pinLoc = await createNewPin(bodyToNewPin(req.body));
    res.status(StatusCodes.OK).json({
      success: true,
      result: pinLoc,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};
