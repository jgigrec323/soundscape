import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, closeConnection } from "@/app/utils/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  const db = await connectToDatabase();

  const playlistId = params.id;

  try {
    const playlist = await db
      .collection("playlists")
      .findOne({ _id: new ObjectId(playlistId) });

    if (!playlist) {
      await closeConnection();
      return NextResponse.json({
        message: "Playlist not found",
      });
    }

    const songIds = playlist.songs.map((song) => new ObjectId(song.id));

    const songs = await db
      .collection("songs")
      .find({ _id: { $in: songIds } })
      .toArray();

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
