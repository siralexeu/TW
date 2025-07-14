import Employee from "../entities/Employee.js";
import Adresa from "../entities/Adresa.js";
import { aliasAdresa } from "../entities/dbConst.js";
import LikeOp from "./Operators.js";

async function createEmployee(employee){
    return await Employee.create(employee, {include: [{model: Adresa, as: aliasAdresa}]})
}

async function getEmployees(){
    return await Employee.findAll({include: [aliasAdresa]});
}

async function getEmployeeById(id){
    return await Employee.findByPk(id, {include: [aliasAdresa]});
}

async function deleteEmployee(id){
    let elem = await Employee.findByPk(id);

    if (!elem){
        console.log("This elem has already been deleted");
        return;
    }

    return await elem.destroy();
}

// Ex Query params link: http://localhost:9000/api/employeeFilter?employeeName=Ionut&employeeSurName=Alex&take=2&skip=3
async function getEmployeeWithFilterAndPagination(filter){    
    if (!filter.take)
      filter.take = 10;

    if (!filter.skip)
      filter.skip = 1;

    let whereClause = {};
    if (filter.employeeName)
        whereClause.EmployeeName = {[LikeOp]: `%${filter.employeeName}%`};
  
    if (filter.employeeSurName)
      whereClause.EmployeeSurName = {[LikeOp]: `%${filter.employeeSurName}%`};
  
    let whereIncludeClause = {};
  
    if (filter.city)
      whereIncludeClause.City = {[LikeOp]: `%${filter.city}%`};
  
    return await Employee.findAndCountAll (
      {   
        distinct: true,         
        include:
         [
           {
            model: Adresa,
            as: aliasAdresa,
            where: whereIncludeClause
           }
         ],
         where: whereClause,
         limit: parseInt(filter.take),
         offset: parseInt(filter.skip - 1) * parseInt(filter.take), // skip este pagina curenta iar take sunt cate inregistrari vin pe pagina
      });
  }

export {
    createEmployee,
    getEmployeeById,
    getEmployees,
    deleteEmployee,
    getEmployeeWithFilterAndPagination
}