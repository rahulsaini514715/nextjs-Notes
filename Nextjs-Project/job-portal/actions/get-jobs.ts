import { db } from "@/lib/db";
import { Job } from "@/lib/generated/prisma";
import { auth } from "@clerk/nextjs/server";

type GetJobs = {
    title?: string;
    categoryId?: string;
    createdAtFilter?: string;
    shiftTiming?: string;
    workMode?: string;
    years0fExperience?: string;
    savedJobs?: boolean; 
}

export const getJobs = async({
    title,
    categoryId,
    createdAtFilter,
    shiftTiming,
    workMode,
    years0fExperience,
    savedJobs
}: GetJobs): Promise<Job[]> => {

    try {
        let where: any = {
            isPusblished: true,
        };

        // Apply category filter
        if (categoryId) {
            where.categoryId = categoryId;
        }

        // Apply title filter
        if (typeof title !== "undefined") {
           where.title = {
           contains: title,
           mode: "insensitive",
          };
        }

        //check wheter the createdAtFilter is provided or not
        if(createdAtFilter){
            const currentDate = new Date();
            let startDate : Date;
            switch(createdAtFilter){
                case "today" :
                    startDate = new Date(currentDate);
                    break;

                case "yesterday" :
                    startDate = new Date(currentDate);
                    startDate.setDate(startDate.getDate()-1)
                    break;
                
                case "thisWeek" :
                    startDate = new Date(currentDate);
                    startDate.setDate(startDate.getDate() - currentDate.getDate()) //set the start date to the beginning of the current week
                    break;
                
                case "lastWeek" :
                    startDate = new Date(currentDate);
                    startDate.setDate(startDate.getDate() - currentDate.getDay() - 7) //set the start date to the beginning of the previous week
                    break;

                case "thisMonth" :
                    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(),1);// set the start date of the current month
                    break;

                default :
                    startDate = new Date(0);
            }

            //add the condition in query -(include)
            where.createdAt = {
                gte : startDate,
            }
        }

        // Other filters (optional)
        if (shiftTiming) where.shiftTiming = shiftTiming;
        if (workMode) where.workMode = workMode;
        if (years0fExperience) where.years0fExperience = years0fExperience;

        // Fetch jobs
        const jobs = await db.job.findMany({
            where,
            include: {
                company: true,
                category: true,
                // attachment: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return jobs;

    } catch (error) {
        console.log("[GET_JOBS]:", error);
        return [];
    }
}






// import { db } from "@/lib/db";
// import { Job } from "@/lib/generated/prisma";
// import { auth } from "@clerk/nextjs/server";

// type GetJobs = {
//     title?: string;
//     categoryId?: string;
//     createdAtFilter?: string;
//     shiftTiming?: string;
//     workMode?: string;
//     years0fExperience?: string;
//     savedJobs?: boolean; 
// }

// export const getJobs = async({
//     title,categoryId,createdAtFilter,shiftTiming,workMode,years0fExperience,savedJobs
// }: GetJobs): Promise<Job[]> => {

//     const {userId} = await auth();

//     try {
//         // Initialize the query object with options
//         let query : any = {
//             where : {
//                 isPusblished : true,
//             },
//             include : {
//                 company : true,
//                 category : true,
//                 attachment : true,
//             },
//             orderBy :{
//                 createdAt: "desc"
//             }
//         };

//         // execute the query to fetch the jobs based on the constructed parameters
//         const jobs = await db.job.findMany(query)
//         return jobs;


//     } catch (error) {
//         console.log("[GET_JOBS]:",error);
//         return [];
//     }
// }