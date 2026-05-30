import Image from "next/image";
import rahul from "@/public/rahul.jpg"
const Home = () => {
  return (
    <>
    {/* priority={true} ho to blur dikhta hi nahi (image instantly load hoti hai) */}
    <h1>Image component</h1>
      <Image src="/rahul.jpg" width={200} height={50} alt="rahul iamge" 
      //  className="w-full h-full rounded-full"
      className="p-6"
      />

{/* priority={true} ho to blur dikhta hi nahi (image instantly load hoti hai) */}
      <Image src={rahul} width={200} height={300} alt="rahul iamge"
      quality={100}
      priority={false}
      placeholder="blur"
      // blurDataURL=""
       
      />
      <Image
  src={rahul}
  width={200}
  height={300}
  alt="rahul image"
  placeholder="blur"
/>





    </> 
  )
}
export default Home;
