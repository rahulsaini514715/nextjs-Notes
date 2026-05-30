"use client";

import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string;
}

const ImageUpload = ({ disabled, onChange, onRemove, value }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    try {
      setLoading(true);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) throw new Error("Upload failed");

      onChange(data.secure_url);
      toast.success("Image uploaded");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = () => {
    onChange("");        // 👈 clear value
    onRemove();         // 👈 notify parent
    toast.success("Image removed");
  };

  return (
    <div>
      {value ? (
        <div className="relative h-60 rounded-md overflow-hidden">
          <Image fill className="object-cover" src={value} alt="Cover" />
          <div className="absolute top-2 right-2">
            <Button size="icon" variant="destructive" onClick={onDelete}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <label className="flex h-60 flex-col items-center justify-center border border-dashed rounded-md cursor-pointer">
          {isLoading ? (
            <span>Uploading...</span>
          ) : (
            <>
              <ImagePlus className="w-10 h-10" />
              <p>Upload an image</p>
            </>
          )}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={onUpload}
            disabled={disabled || isLoading}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;









//---------------------------------------------------------------------------------------------------



// "use client"

// import { deleteObject, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { ImagePlus, Trash } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Button } from "./ui/button";


// interface ImageUploadProps{
//     disabled?: boolean;
//     onChange: (value: string )=> void;
//     onRemove: (value: string)=> void;
//     value: string;
// }

// const ImageUpload = ({
//     disabled,
//     onChange, 
//     onRemove, 
//     value,
// }: ImageUploadProps) => {
//     const [isMounted,setIsMounted]=useState(false);
//     const [isLoading, setLoading]=useState(false);
//     const [progress, setProgress] = useState<number>(0)

//     useEffect(()=>{
//         setIsMounted(true)
//     },[])

//     if(!isMounted){
//         return null;
//     }


//     const onUpload = async(e : React.ChangeEvent<HTMLInputElement>)=>{
//         if(!e.target.files) return;
//         const file: File =e.target.files[0];
//         setLoading(true)

//         const uploadTask = uploadBytesResumable(
//             ref(storage, `JobCoverImage/${Date.now()}-${file?.name}`),
//             file,
//             {contentType: file?.type}
             
//         );
//         uploadTask.on("state_changed",(snapshot)=>{
//             setProgress((snapshot.byteTransferred / snapshot.totalBytes) *100)
//         },(error)=>{
//             toast.error(error.message)
//         },()=>{
//             getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl=>{
//                 onChange(downloadUrl)
//                 setIsLoading(false)
//                 toast.success("Image Uploaded")
//             })
//         })
//     }

//     const onDelete =()=>{
//         onRemove(value);
//         deleteObject(ref(storage, value)).then(()=>{
//             toast.success("Image Removed")
//         })
//     }
//   return (
//     <div>
//          {value ?( <>
//          <div className="w-full h-60 aspect-video relative rounded-md flex items-center justify-center overflow-hidden">
//             <Image 
//               fill 
//               className="w-full h-full object-cover"
//               alt="Image Cover"
//               src={value}
//             />

//             <div className="absolute z-10 top-2 right-2 cursor-pointer"
//              onClick={onDelete}
//             >
//                 <Button size="icon" variant="destructive">
//                     <Trash className="w-4 h-4"/>
//                 </Button>
//             </div>
//          </div>
//          </> 
//         ): (
//         <>
//         <div className="w-full h-60 aspect-video relative rounded-md flex items-center justify-center overflow-hidden border border-dashed bg-neutral-50">
//            {isLoading ? (<>
//              <p>{`${progress.toFixed(2)}%`}</p>
//            </>):(
//             <>
//              <label >
//                 <div className="w-full h-full flex-col gap-2 items-center justify-center cursor-pointer text-neutral-500">
//                     <ImagePlus className="w-10 h-10"/>
//                     <p>Upload an image</p>
//                 </div>
//                 <input type="file" accept="image/*" className="w-0 h-0"
//                  onChange={onUpload}
//                 />
//              </label>
//             </>)}
//         </div>
//         </>)}
//     </div>
//   )
// }

// export default ImageUpload



//-------------------------------------------------------------------------------

// "use client"

// import { ImagePlus } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";


// interface ImageUploadProps{
//     disabled?: boolean;
//     onChange: (value: string )=> void;
//     onRemove: (value: string)=> void;
//     value: string;
// }

// const ImageUpload = ({
//     disabled,
//     onChange, 
//     onRemove, 
//     value,
// }: ImageUploadProps) => {
//     const [isMounted,setIsMounted]=useState(false);
//     const [isLoading, setLoading]=useState(false);
//     const [progress, setProgress] = useState<number>(0)

//     useEffect(()=>{
//         setIsMounted(true)
//     },[])

//     if(!isMounted){
//         return null;
//     }


//     const onUpload =()=>{}
//   return (
//     <div>
//          {value ?( <>
//          <div className="w-full h-60 aspect-video relative rounded-md flex items-center justify-center overflow-hidden">
//             <Image 
//               fill 
//               className="w-full h-full object-cover"
//               alt="Image Cover"
//               src={value}
//             />
//          </div>
//          </> 
//         ): (
//         <>
//         <div className="w-full h-60 aspect-video relative rounded-md flex items-center justify-center overflow-hidden border border-dashed bg-neutral-50">
//            {isLoading ? (<>
//              <p>{`${progress.toFixed(2)}%`}</p>
//            </>):(
//             <>
//              <label >
//                 <div className="w-full h-full flex-col gap-2 items-center justify-center cursor-pointer text-neutral-500">
//                     <ImagePlus className="w-10 h-10"/>
//                     <p>Upload an image</p>
//                 </div>
//                 <input type="file" accept="image/*" className="w-0 h-0"
//                  onChange={onUpload}
//                 />
//              </label>
//             </>)}
//         </div>
//         </>)}
//     </div>
//   )
// }

// export default ImageUpload