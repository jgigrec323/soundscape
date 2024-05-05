import { connectToDatabase, closeConnection } from "@/app/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const db = await connectToDatabase();
  const genreParam = params.genre;
  const formattedGenre = genreParam
    .split("-") // Split the genre parameter by hyphens
    .map((word) => {
      if (word === "randb") {
        return "R&B"; // Handle "randb" case
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the first letter of each word
      }
    })
    .join(" "); // Join the words back with spaces

  try {
    const songs = await db
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
          $unwind: "$genreInfo",
        },
        {
          $match: {
            "genreInfo.genre": formattedGenre, // Use the formatted genre for matching
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            artist: 1,
            album: 1,
            genre: "$genreInfo.genre",
            duration: 1,
            year: 1,
            image: "$genreInfo.image",
            file: 1,
          },
        },
      ])
      .toArray();

    return NextResponse.json({
      message: "Songs fetched by genre",
      songs,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, 500);
  } finally {
    await closeConnection();
  }
}
