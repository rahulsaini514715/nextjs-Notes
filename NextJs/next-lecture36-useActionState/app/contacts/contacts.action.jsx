"use server"

import {db} from "../../lib/db.jsx"
 const contactAction = async (previousState,formData)=>{
    // console.log(formData.get("fullName"))
    // const fullName = formData.get("fullName");
    // const email = formData.get("email");
    // const message = formData.get("message");  //eshe likhe se acha hai ek line mai likh dho niche likha hai wese

    try{
    const {fullName,email,message} = Object.fromEntries(formData.entries());
    console.log(fullName,email,message) ;

    await db.execute(
        `insert into contact(full_name,email,message) values(?, ? , ?)`,
        [fullName, email, message]
    );
    return {success:true,message:"form submit successfully"};
}catch(error){
    console.log("server action :",error);
    return {success:false,message:"error while submitting"}
}
}



export default contactAction;