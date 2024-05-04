import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, closeConnection } from "@/app/utils/mongodb";

export async function POST(request) {
  const db = await connectToDatabase();

  try {
    const { userId, name, description } = await request.json();

    const addedPlaylist = await db
      .collection("playlists")
      .insertOne({ userId, name, description });

    return NextResponse.json({
      message: "Playlist created",
      addedPlaylistId: addedPlaylist.insertedId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  } finally {
    await closeConnection();
  }
}
