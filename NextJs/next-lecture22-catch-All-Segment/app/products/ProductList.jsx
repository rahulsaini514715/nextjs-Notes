"use client"

import {useSearchParams} from "next/navigation"

const ProductList =()=>{
    const searchParams = useSearchParams();
    console.log("inside : ",searchParams);

    const pages = searchParams.getAll("page");
    const category = searchParams.get("category")
    const entries = Object.fromEntries(searchParams.entries());

    console.log("pages : ",pages)
    console.log("category :",category);
     console.log("entries :",entries);
    return (
        <>
          <h1>client - {category} - page : {pages}</h1>
        </>
    )
}

export default ProductList;