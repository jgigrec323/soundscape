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
    const aggregatePipeline = [
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
          "genreInfo.genre": formattedGenre,
        },
      },
      {
        $group: {
          _id: "$genreInfo.genre",
          averageDuration: { $avg: "$duration" },
        },
      },
    ];

    const results = await db
      .collection("songs")
      .aggregate(aggregatePipeline)
      .toArray();

    return NextResponse.json({
      message: `Average song duration for genre '${formattedGenre}' fetched`,
      results,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, 500);
  } finally {
    await closeConnection();
  }
}
