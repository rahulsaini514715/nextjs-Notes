"use client"

import { use } from "react";

const SingleProfilePost =  (props) => {
// const SingleProfilePost = async (props) => {

//     const user = await props.params;
    const user = use( props.params);
    console.log(props)
    console.log(user.postid)
    return <h1>Dynamic {user.postid}</h1>
};


export default SingleProfilePost;