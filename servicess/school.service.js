const sequelize = require("../config/db");
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const Op = Sequelize.Op;
const master_school = require("../models/master_school")(sequelize,DataTypes);

const insertData = async(payload)=>{
    try{
       const data = await master_school.create(payload);
       return data;
    }
    catch(err){
        console.log(err,"err---1")
        return false;
    }
};

const checkData = async(type,payload)=>{
    try{
        let whr_arr = {};
        if(type==="check_data"){
           whr_arr = {
              [Op.or]:[
                {email_id:payload?.email_id},
                {contact:payload?.contact}
              ],
           }
        }
        else if(type==="get_all"){
            whr_arr = {
                is_deleted:payload?.is_deleted,
                school_status:payload?.school_status
            }
        }
        const data = await master_school.findAll({
            where:whr_arr,
            raw:true,
            order:[
                ["id","DESC"]
            ]
        });
        if(data.length>0){
            return data;
        }
        else{
            return []
        }
    }
    catch(err){
        console.log(err)
        return false;
    }
}

module.exports = {
    insertData,
    checkData
}