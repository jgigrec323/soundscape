import { NextResponse } from "next/server";
import { connectToDatabase, closeConnection } from "@/app/utils/mongodb";

export async function GET() {
  const db = await connectToDatabase();

  try {
    const songsCollection = await db.collection("songs");

    const songsByAlbum = await songsCollection
      .aggregate([
        {
          $group: {
            _id: "$album",
            songs: { $push: "$$ROOT" },
          },
        },
      ])
      .toArray();

    if (!songsByAlbum) {
      await closeConnection();

      return NextResponse.json({
        message: "No songs found",
      });
    }

    return NextResponse.json({
      message: "Songs fetched",
      songsByAlbum,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  } finally {
    await closeConnection();
  }
}
