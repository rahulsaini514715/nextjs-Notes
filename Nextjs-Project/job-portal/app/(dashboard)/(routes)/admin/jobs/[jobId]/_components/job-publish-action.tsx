"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface JobpublishActionProps{
    disabled : boolean;
    jobId : string;
    isPusblished : boolean;
}

const JobPublishAction=({disabled,jobId,isPusblished} : JobpublishActionProps)=> {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const onClick = async()=>{
      try {
        setIsLoading(true);
        if(isPusblished){
          //unpublished the job
          await axios.patch(`/api/jobs/${jobId}/unpublish`)
          toast.success("Job Unpublished")

        }else{
          console.log("JOB ID:", jobId);

          await axios.patch(`/api/jobs/${jobId}/publish`)
          console.log("PUBLISH ROUTE FILE LOADED");

          toast.success("Job Published")
        }
        router.refresh();
      } catch (error) {
         toast.error("Something went wrong")
         console.log((error as Error)?.message)
      }finally{
        setIsLoading(false)
      }
    };
    const onDelete =async()=>{
       try {
        setIsLoading(true);
        
        await axios.delete(`/api/jobs/${jobId}`)
        toast.success("Job Deleted")
        router.refresh();
        return  router.push("/admin/jobs")
      } catch (error) {
         toast.error("Something went wrong")
         console.log((error as Error)?.message)
      }finally{
        setIsLoading(false)
      }
    };
  return (
    <div className="flex item-center gap-x-3 ">
        <Button variant={"outline"} disabled={disabled || isLoading} onClick={onClick} size={"sm"}>{isPusblished ? "Unpublish" : "Publish"}</Button>

        <Button variant={"destructive"} size={"icon"} disabled={isLoading} onClick={onDelete}>
            <Trash  className="w-4 h-4"/>
        </Button>
    </div>
  )
}


export default JobPublishAction