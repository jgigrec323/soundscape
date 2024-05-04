import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, closeConnection } from "@/app/utils/mongodb";

export async function POST(request) {
  const db = await connectToDatabase();

  try {
    const { username, password } = await request.json();
    console.log(username, password);
    const usersCollection = db.collection("users");

    //check for existing users
    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
      await closeConnection();
      return NextResponse.json({
        error: "Username already exists",
      });
    }

    //if there's no user found

    const result = await usersCollection.insertOne({ username, password });

    return NextResponse.json({
      message: "User registered successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  } finally {
    await closeConnection();
  }
}
