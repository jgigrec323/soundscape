import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, closeConnection } from "@/app/utils/mongodb";

export async function GET() {
  const db = await connectToDatabase();
  try {
    const songsCollection = db.collection("songs");

    const songs = await songsCollection.find().toArray();

    if (!songs) {
      await closeConnection();

      return NextResponse.json({
        message: "Nothing found",
      });
    }

    return NextResponse.json({
      message: "Songs fetched",
      songs,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  } finally {
    await closeConnection();
  }
}
