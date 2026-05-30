"use server"

import {db} from "../../lib/db.jsx"
import {redirect} from "next/navigation";


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
    // return {success:true,message:"form submit successfully"};
    redirect("/") //client componet mai kam nahi karta.....waha per hum useRouter hook use karege...next video mai samjh jayega
}catch(error){
    console.log("server action :",error);
    if(error.message === "NEXT_REDIRECT") throw error; // adding this line for redirct elese it throw error...because we cant delecreare in trycatch
    return {success:false,message:"error while submitting"}
}
}



export default contactAction;