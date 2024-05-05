import { connectToDatabase, closeConnection } from "@/app/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const db = await connectToDatabase();
  const genre = params.genre;

  const formattedGenre = genre
    .split("-") // Split the genre parameter by hyphens
    .map((word) => {
      if (word === "randb") {
        return "R&B"; // Handle "randb" case
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the first letter of each word
      }
    })
    .join(" ");
  try {
    const songsByGenre = await db
      .collection("songs")
      .aggregate([
        {
          $lookup: {
            from: "genres",
            localField: "genre",
            foreignField: "genre",
            as: "genreInfo",
          },
        },
        {
          $unwind: "$genreInfo", // Unwind to separate each song-genre pair
        },
        {
          $match: {
            "genreInfo.genre": formattedGenre, // Filter by the specified genre name
          },
        },
        {
          $group: {
            _id: "$genreInfo.genre",
            totalSongs: { $sum: 1 }, // Count the total number of songs by genre
          },
        },
      ])
      .toArray();

    return NextResponse.json({
      message: "Total number of songs by genre fetched",
      songsByGenre,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, 500);
  } finally {
    await closeConnection();
  }
}
