import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";


const HomePage =()=>{
  return(
    <div>
        <Button variant={"destructive"}>click</Button>

        <UserButton/>
    </div>
  )
}

export default HomePage;