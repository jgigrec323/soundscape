import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, closeConnection } from "@/app/utils/mongodb";

export async function GET() {
  const db = await connectToDatabase();
  try {
    const artists = await db
      .collection("songs")
      .aggregate([
        {
          $group: {
            _id: "$artist", // Group by artist name
            count: { $sum: 1 }, // Count the number of songs for each artist
          },
        },
        {
          $sort: { count: -1 }, // Sort by descending order of song count
        },
        {
          $limit: 6, // Limit to the top 6 artists with the most songs
        },
        {
          $lookup: {
            from: "artists", // Name of the artists collection
            localField: "_id", // Field from the songs collection
            foreignField: "artist", // Field from the artists collection
            as: "artistInfo",
          },
        },
        {
          $unwind: "$artistInfo", // Unwind the array created by the lookup
        },
        {
          $project: {
            _id: "$artistInfo._id", // Include the artist's _id from the artists collection
            artist: "$artistInfo.artist", // Include the artist's name from the artists collection
            image: "$artistInfo.image", // Include the artist's image from the artists collection
            count: 1, // Include the count of songs for each artist
          },
        },
      ])
      .toArray();

    if (!artists) {
      await closeConnection();

      return NextResponse.json({
        message: "Nothing found",
      });
    }

    return NextResponse.json({
      message: "Artists with most songs fetched",
      artists,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  } finally {
    await closeConnection();
  }
}
