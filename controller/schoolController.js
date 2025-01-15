const apiResponse = require("../helper/apiResponse");
const schoolService = require("../servicess/school.service");
const {uploadImageToCloudinary} = require("../helper/cloudinary")

const addSchoolData = [
    async(req,res)=>{
       try{
         const request = req?.body;
         let name = null;
         let address = null;
         let city = null;
         let state = null;
         let contact = null;
         let image = null;
         let email_id = null;
         if(Object.keys(request).length>0){
             name = request?.name;
             address = request?.address;
             city = request?.city;
             state = request?.state;
             contact = request?.contact;
             image = request?.image;
             email_id = request?.email_id;
             const payload = new createPayload(name,address,city,state,contact,image,email_id);
             console.log(payload,"payload---1")
             // check alraedy existing data 
             const existing_data = await schoolService.checkData("check_data",payload);
             if(existing_data && existing_data?.length>0){
                return apiResponse.mainResponse(res,"failed","Data already exist with same email or contact")
             }
             if(payload && Object.keys(payload).length>0){
               payload.image = await uploadImageToCloudinary(payload?.image);
               const insertData = await schoolService.insertData(payload);
               if(insertData){
                  return apiResponse.mainResponse(res,"success","School details added successfully",[]);
               }
               else{
                  return apiResponse.mainResponse(res,"failed","Unable to add school details",[]);
               }
             }
         }
         else{
            return apiResponse.mainResponse(res,"failed","Please enter valid payload",[])
         }
       }
       catch(err){
        console.log(err,"err")
         apiResponse.mainResponse(res,"failed","Error while adding school data",[]);
       }
    }
];

const uploadSchoolImage = (req,res)=>{
  try{
      const image = req?.file?.destination + "/" + req?.file?.filename;
      return apiResponse.mainResponse(res, "success", "Image uploaded successfully", image);
  }
  catch(err){
     return apiResponse.mainResponse(res,"failed","Error while uploading image",[]);
  }
}

const getSchoolList = [
   async(req,res)=>{
      try{
         const payload = {
            is_deleted:0,
            school_status:101
         }
         const list = await schoolService.checkData("get_all",payload);
         if(list && list.length>0){
            return apiResponse.mainResponse(res,"success","School list get successfully",list);
         }
         else{
            return apiResponse.mainResponse(res,"failed","School list empty",[])
         }
      }
      catch(err){
         return apiResponse.mainResponse(res,"failed","Error while getting list",[])
      }
   }
]

function createPayload(name,address,city,state,contact,image,email_id){
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.contact = contact;
    this.image = image;
    this.email_id = email_id;
}

module.exports = {
    addSchoolData,
    uploadSchoolImage,
    getSchoolList
}