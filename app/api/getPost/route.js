import { promisePool } from "@/util/db"; // Import the shared db connection

export async function GET() {
  try {
    // Fetch all posts from the journal_entries table
    const query = "SELECT * FROM journal_entries ORDER BY created_at DESC";
    const [posts] = await promisePool.query(query);
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching posts", error: error.message }),
      { status: 500 }
    );
  }
}
