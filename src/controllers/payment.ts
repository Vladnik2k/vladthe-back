import {Response} from "express";

const errorHandler = require('../utils/errorHandler');
const Payment = require('../models/Payments');
const Concert = require('../models/Concert');
const Schedule = require('../models/Schedule');
const User = require('../models/User');
const mail = require('../utils/emails/email');
const parser = require('../utils/parser');

module.exports.createPayment = async (req: any, res: Response) => {
    try {
        const schedule = await Schedule.findById({ _id: req.body.scheduleId });
        const concert = await Concert.findById({ _id: schedule.concert });
        const user = await User.findOne({ email: req.user.email });
        const payment = new Payment({
            user: req.user._id,
            schedule: schedule._id,
            numberOfSites: req.body.numberOfSites,
            payed: concert.price * +req.body.numberOfSites,
            doneAt: Date.now(),
        });

        await payment.save();

        res.status(201).send();

        const mailOptions = prepareEmailOptions(user, concert, schedule, payment);
        mail.prepareAndSendMail(mailOptions);
    } catch (e) {
        errorHandler(res, 400);
    }
};

module.exports.removePayment = async (req: any, res: Response) => {
    try {
        const paymentId = req.params.id;
        await Payment.findOneAndRemove({ _id: paymentId });

        res.status(200).send();
    } catch (e) {
        errorHandler(res, 400);
    }
};

module.exports.getPayment = async (req: any, res: Response) => {
    try {
        const payments = await Payment.find();
        const schedules = await Schedule.find({ _id: payments.map((p: any) => p.schedule) });
        const concerts = await Concert.find({ _id: schedules.map((p: any) => p.concert) });

        const paymentsForOutput = payments.map((p: any) => {
            const schedule = schedules.find((s: any) => s._id.toString() === p.schedule.toString());
            const concert = concerts.find((c: any) => c._id.toString() === schedule.concert.toString());
            return {
                _id: p._id,
                concertName: concert.title,
                date: parser.parseDate(schedule.startedAt),
                numberOfSites: p.numberOfSites,
                price: p.payed,
                doneAt: parser.parseDate(p.doneAt)
            }
        });

        res.status(201).send(paymentsForOutput);
    } catch (e) {
        errorHandler(res, 400);
    }
};

function prepareEmailOptions(user: any, concert: any, schedule: any, payment: any): any {
    return {
        to: user.email,
        subject: 'Ваш білет',
        template: 'ticket',
        data: {
            name: user.name,
            concertName: concert.title,
            date: parser.parseDate(schedule.startedAt),
            numberOfSites: payment.numberOfSites,
            price: payment.payed
        }
    };
}
