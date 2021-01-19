import {Response} from "express";

module.exports = (res: Response, status: number) => {
    res.status(status).json({ success: false })
};
