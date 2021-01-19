import {Request, Response} from "express";

const errorHandler = require('../utils/errorHandler');
const Actor = require('../models/Actor');
const ActorConcertsMap = require('../models/ActorsConcertsMap');

module.exports.getActors = async (req: Request, res: Response) => {
    try {
        const actors = await Actor.find();
        res.status(200).send(actors);
    } catch (e) {
        errorHandler(res, 404);
    }
};

module.exports.getActorById = async (req: Request, res: Response) => {
    const actorId = req.params.id;
    try {
        const actor = await Actor.findById({ _id: actorId });
        res.status(200).send(actor);
    } catch (e) {
        errorHandler(res, 404);
    }
};

module.exports.getActorsByConcertId = async (req: Request, res: Response) => {
    const concertId = req.params.id;
    try {
        const actorConcertsMappings = await ActorConcertsMap.find({ concert: concertId });
        const actorsIds = actorConcertsMappings.map((mapping: any) => mapping.actor);
        const actors = await Actor.find({_id: actorsIds});
        res.status(200).send(actors);
    } catch (e) {
        errorHandler(res, 404);
    }
};
