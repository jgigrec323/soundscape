import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, closeConnection } from "@/app/utils/mongodb";

export async function GET() {
  const db = await connectToDatabase();
  try {
    const genres = await db.collection("genres").find().toArray();
    console.log(genres);
    if (!genres) {
      await closeConnection();

      return NextResponse.json({
        message: "Nothing found",
      });
    }

    return NextResponse.json({
      message: "Genres fetched",
      genres,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  } finally {
    await closeConnection();
  }
}
