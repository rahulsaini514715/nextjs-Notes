// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import axios from "axios";
// import { Router } from "lucide-react";
// import { NextResponse } from "next/server";
// import toast from "react-hot-toast";

// export const PATCH = async (
//   req: Request,
//   { params }: { params: Promise<{ jobId: string }> }
// ) => {
//   try {
//     const { userId } = await auth();

//     const { jobId } = await params; // 👈 FIX HERE

//     const updatedValues = await req.json();

//     if (!userId) {
//       return new NextResponse("Un-Authorized", { status: 401 });
//     }

//     if (!jobId) {
//       return new NextResponse("ID is missing", { status: 400 });
//     }

//     const job = await db.job.update({
//       where: {
//         id: jobId,
//         userId,
//       },
//       data: {
//         ...updatedValues,
//       },
//     });

//     return NextResponse.json(job);
//   } catch (error) {
//     console.log(`[JOB_PATCH] : ${error}`);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) => {
  try {
    const { userId } = await auth();
    const { jobId } = await params;
    const updatedValues = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!jobId) return new NextResponse("Job ID missing", { status: 400 });

    const job = await db.job.update({
      where: { id: jobId, userId },
      data: { ...updatedValues },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("[JOB_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) => {
  try {
    const { userId } = await auth();
    const { jobId } = await params;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!jobId) return new NextResponse("Job ID missing", { status: 400 });

    const job = await db.job.findFirst({
      where: { id: jobId, userId },
    });

    if (!job) return new NextResponse("Job not found", { status: 404 });

    await db.job.deleteMany({
      where: { id: jobId, userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[JOB_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
