import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, closeConnection } from "@/app/utils/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  const db = await connectToDatabase();

  const id = params.id;

  try {
    const playlists = await db
      .collection("playlists")
      .find({ userId: id })
      .toArray();

    if (!playlists) {
      await closeConnection();

      return NextResponse.json({
        message: "Nothing found",
      });
    }

    console.log(playlists);
    return NextResponse.json({
      message: "Playlists fetched",
      playlists,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  } finally {
    await closeConnection();
  }
}
export async function PUT(request, { params }) {
  const db = await connectToDatabase();
  const playlistId = params.id;

  try {
    const { id } = await request.json();

    // Check if the song already exists in the playlist
    const playlist = await db
      .collection("playlists")
      .findOne({ _id: new ObjectId(playlistId) });
    if (!playlist) {
      return NextResponse.json({
        message: "Playlist not found",
      });
    }
    if (playlist.songs) {
      const songExists = playlist.songs.some((song) => song.toString() === id);

      if (songExists) {
        return NextResponse.json({
          message: "Song already exists in the playlist",
        });
      }
    }

    // Update the playlist document to add the new song ID to the 'songs' array
    const playlistUpdated = await db
      .collection("playlists")
      .updateOne(
        { _id: new ObjectId(playlistId) },
        { $push: { songs: new ObjectId(id) } }
      );

    // Return early if the song already exists
    if (playlistUpdated.modifiedCount === 0) {
      return NextResponse.json({
        message: "Song already exists in the playlist",
      });
    }

    return NextResponse.json({
      message: "Song added to playlist",
      playlistModified: playlistUpdated.modifiedCount,
    });
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    return NextResponse.json({ message: "Internal server error" });
  } finally {
    await closeConnection();
  }
}

export async function DELETE(request, { params }) {
  const db = await connectToDatabase();

  const id = params.id;

  try {
    const playlistDeleted = await db
      .collection("playlists")
      .deleteOne({ _id: new ObjectId(id) });

    console.log(playlistDeleted);
    if (!playlistDeleted) {
      await closeConnection();

      return NextResponse.json({
        message: "Nothing found",
      });
    }

    return NextResponse.json({
      message: "Playlists deleted",
      playlistDeleted,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  } finally {
    await closeConnection();
  }
}
