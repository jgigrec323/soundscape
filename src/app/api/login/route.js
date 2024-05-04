import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, closeConnection } from "@/app/utils/mongodb";

export async function POST(request) {
  const db = await connectToDatabase();

  try {
    const { username, password } = await request.json();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ username, password });

    if (!user) {
      await closeConnection();
      return NextResponse.json({
        error: "User not found",
      });
    }
    return NextResponse.json({
      message: "User logged successfully",
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  } finally {
    await closeConnection();
  }
}
