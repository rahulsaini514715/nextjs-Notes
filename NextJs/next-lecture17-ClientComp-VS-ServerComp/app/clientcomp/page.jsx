// "use client" compulsory hai kyunki onClick aur alert jaise browser-based events sirf Client Components me hi kaam karte hain.
"use client";
import { useEffect, useState } from "react";
import Counter from "./Counter";
import "../globals.css"
 


const URL="https://jsonplaceholder.typicode.com/posts";


// client component ko kabhi bhi async nahi bana sakte
// const ClientComp = async() => {
const ClientComp = () => {

    const [postData,setPostData]=useState([]);

    useEffect(()=>{
    const fetchData = async()=>{
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);
    setPostData(data);

    return data
}
        fetchData();
    },[])
  return (
    <div className="bg-amber-400 text-black p-5">
      <h1>Client Comp</h1>

      <button
        className="bg-black text-white px-4 py-2 mt-3 rounded"
        onClick={() => alert("hii")}
      >
        Click Me
      </button>


      <Counter />

      
        <ul className="grid grid-cols-3 gap-5">
            {
                postData.map((curElem,index)=>{
                    return <li key={index}>{curElem.body}</li>
                })
            }
        </ul>
      
    </div>
  );
};

export default ClientComp;
