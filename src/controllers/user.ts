import {Request, Response} from "express";

const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../configs');

const salt = bcrypt.genSaltSync(10);

module.exports.login = async (req: Request, res: Response) => {
    const candidate = await User.findOne({email: req.body.email});

    if (!candidate) {
        errorHandler(res, 403);
        return;
    }

    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (!passwordResult) {
        errorHandler(res, 401);
        return;
    }

    const token = jwt.sign({ email: candidate.email, userId: candidate._id }, keys.jwtId, { expiresIn: 60 * 60 * 24 });
    res.status(200).json({ token: `${token}` });
};

module.exports.register = async (req: Request, res: Response) => {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        errorHandler(res, 400);
        return;
    }
    passValidation(req.body.password);
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, salt),
    });

    try {
        await user.save();
        res.status(201).json({ success: true });
    } catch (e) {
        errorHandler(res, 400);
    }
};

module.exports.getUserDetails = async (req: any, res: Response) => {
    try {
        const userDetails = await User.findOne({email: req.user.email});
        userDetails.password = undefined;
        res.status(200).json(userDetails);
    } catch (e) {
        errorHandler(res, 400);
    }
};


module.exports.changePassword = async (req: any, res: Response) => {
    try {
        passValidation(req.body.password);
        await User.findOneAndUpdate({email: req.user.email}, { password: bcrypt.hashSync(req.body.password, salt)});
        res.status(200).json({ success: true });
    } catch (e) {
        errorHandler(res, 400);
    }
};

// ToDo
const passValidation = (password: string): void => {
    if (false) {
        throw new Error();
    }
};
