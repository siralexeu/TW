import express from 'express';
import db from '../dbConfig.js';
import { createMagazin, getMagazin, getMagazinId, updateMagazin, deleteMagazin } from '../dataAccess/MagazinDa.js';
import { json } from 'sequelize';

let magazinRouter = express.Router();

magazinRouter.route('/create').get(async (req, res) => {
    try{
        await db.sync({force: true})
        res.status(201).json({message: 'created'})
    } catch(err){
        console.warn(err.stack);
        res.status(500).json({'message': 'server error'});
    }
})

magazinRouter.route('/magazin').post(async (req, res) => {
    res.status(201).json(await createMagazin(req.body))
})

magazinRouter.route('/magazin').get(async (req, res) => {
    res.status(200).json(await getMagazin())
})

magazinRouter.route('/magazin/:id').get(async (req, res) => {
    let magazin = await getMagazinId(req.params.id);
    if (magazin)
        res.status(200).json(magazin)
    else
        res.status(400).json({"Error": "Not exist"})
})

magazinRouter.route('/magazin/:id').put(async (req, res) => {
    let ret = await updateMagazin(req.params.id, req.body);

    if (ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj)
})

magazinRouter.route('/magazin/:id').delete(async (req, res) => {
    let ret = await deleteMagazin(req.params.id);

    if (ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj)
})

export default magazinRouter;