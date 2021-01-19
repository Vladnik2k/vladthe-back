import {Request, Response} from "express";

const errorHandler = require('../utils/errorHandler');
const Concert = require('../models/Concert');
const Schedule = require('../models/Schedule');
const ActorConcertsMap = require('../models/ActorsConcertsMap');

module.exports.getConcerts = async (req: Request, res: Response) => {
    try {
        const concerts = await Concert.find();
        res.status(200).send(concerts);
    } catch (e) {
        errorHandler(res, 404);
    }
};

module.exports.getConcertById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const concert = await Concert.findById({ _id: id });
        res.status(200).send(concert);
    } catch (e) {
        errorHandler(res, 404);
    }
};

module.exports.getConcertsByActorId = async (req: Request, res: Response) => {
    const actorId = req.params.id;
    try {
        const actorConcertsMappings = await ActorConcertsMap.find({ actor: actorId });
        const concertsIds = actorConcertsMappings.map((mapping: any) => mapping.concert);
        const concerts = await Concert.find({_id: concertsIds});
        res.status(200).send(concerts);
    } catch (e) {
        errorHandler(res, 404);
    }
};

module.exports.getSchedulesByConcertId = async (req: Request, res: Response) => {
    const concertId = req.params.id;
    try {
        const schedules = await Schedule.find({ concert: concertId });
        res.status(200).send(schedules);
    } catch (e) {
        errorHandler(res, 404);
    }
};

