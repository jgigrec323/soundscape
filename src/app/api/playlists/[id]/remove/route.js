import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, closeConnection } from "@/app/utils/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  const db = await connectToDatabase();
  const playlistId = params.id;

  try {
    const { id } = await request.json();

    // Update the playlist document to add the new song ID to the 'songs' array
    const playlistUpdated = await db
      .collection("playlists")
      .updateOne(
        { _id: new ObjectId(playlistId) },
        { $pull: { songs: new ObjectId(id) } }
      );

    return NextResponse.json({
      message: "Song removed from the playlist",
      playlistModified: playlistUpdated.modifiedCount,
    });
  } catch (error) {
    console.error("Error removing song to playlist:", error);
    return NextResponse.json({ message: "Internal server error" });
  } finally {
    await closeConnection();
  }
}
