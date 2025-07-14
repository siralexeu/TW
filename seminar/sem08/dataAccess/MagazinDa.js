import Magazin from '../entities/Magazin.js';
import mysql from 'mysql2';
import { DB_PASSWORD, DB_USERNAME } from '../Const.js';

const conn = mysql.createConnection({
    host: "localhost",
    user:DB_USERNAME,
    password: DB_PASSWORD,
    database: "Products"
})

async function createMagazin(magazin, ORM = true){
    if(!ORM){
        conn.query('INSERT INTO Magazin SET ?' , magazin, (error, results, fields) => {
            if (error) throw error
            console.log(results.insertId)
        })
    }
    else{
        return await Magazin.create(magazin);
    }
}

async function getMagazin(ORM = true){
    if (!ORM)
    {
        conn.query("SELECT * from Magazin", (error, results, fields) => {
            if (error) throw error;

            console.log(fields)
            console.log(results);
        });   
    } 
    else
    {
        return await Magazin.findAll();
    }
}

async function getMagazinId(id, ORM = true){
    if (!ORM)
    {
        conn.query("SELECT * from Magazin WHERE MagazinId = ?", id, (error, results, fields) => {
            if (error) throw error;            
            console.log(results);
        });   
    } 
    else
    {
        return await Magazin.findByPk(id);
    }
}

async function updateMagazin(id, magazin, ORM = false){
    if (parseInt(id) !== magazin.MagazinId)
        return {error: true, msg: "Entity id diff"}

    let updateE = await getMagazinId(id);
    if (!updateE)
        return {error: true, msg: "No entity found"}



    if (!ORM)
    {
        conn.query('UPDATE Magazin SET ? WHERE MagazinId = ?', [magazin, id], (error, results, fields) => {
            if (error) throw error;
            console.log('Utilizatorul a fost actualizat cu succes.');
          });   
        return {error: false, msg:"Success", obj: "Success"}
    } 
    else
    {
        return {error: false, msg: "", obj: await updateE.update(magazin)};
    }
}

async function deleteMagazin(id, ORM = true){
    let deleteE = await getMagazinId(id);
    if (!deleteE)
        return {error: true, msg: "No entity found"}

        if (!ORM)
        {
            conn.query('DELETE FROM Magazin WHERE MagazinId = ?', id, (error, results, fields) => {
                if (error) throw error;
                console.log('Success.');
              });
              return {error: false, msg:"Success", obj: "Success"}
        } 
    
        else
        {
            return {error: false , msg: "", obj: await deleteE.destroy()};
        }
}

export {createMagazin, 
    getMagazin,
    getMagazinId,
    updateMagazin,
    deleteMagazin}