import Joburi from "../entities/Joburi.js"
import JobEmployee from "../entities/JobEmployee.js";
import Employee from "../entities/Employee.js";
import {employeeAlias} from "../entities/dbConst.js"

async function createJob(job){
    return await Joburi.create(job);
  }

async function associateJobEmployee(jobEmployee){
    return await JobEmployee.create(jobEmployee);
  }
  
async function getJobsAndEmployees(){
    return await Joburi.findAll({
      include: [
        {
          model: Employee,
          as: employeeAlias
        }
      ]
    })
  }

export {createJob, associateJobEmployee, getJobsAndEmployees}