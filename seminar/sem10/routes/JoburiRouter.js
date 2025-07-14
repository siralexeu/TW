import express from 'express';
import {createJob, associateJobEmployee, getJobsAndEmployees} from "../dataAccess/JoburiDA.js"

let joburiRouter = express.Router();

joburiRouter.route('/joburi').post(async (req, res) => {
    return res.json(await createJob(req.body));
  })
  
joburiRouter.route('/jobEmployee').post(async (req, res) => {
  return res.json(await associateJobEmployee(req.body));
})

joburiRouter.route('/jobEmployee').get( async (req, res) => {
  return res.json(await getJobsAndEmployees());
})

export default joburiRouter;