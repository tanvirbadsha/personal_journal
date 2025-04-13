import { promisePool } from "../../../util/db"; // Import the shared db connection

export async function GET({ params }) {
  const { postId } = params; // Get postId from URL params

  try {
    // Query to fetch the specific post by postId
    const query = "SELECT * FROM journal_entries WHERE entry_id = ?";
    const [post] = await promisePool.query(query, [postId]);

    if (post.length === 0) {
      // If no post is found, return a 404 response
      return new Response(JSON.stringify({ message: "Post not found" }), {
        status: 404,
      });
    }

    // Return the post data as a response
    return new Response(JSON.stringify(post[0]), { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching post", error: error.message }),
      { status: 500 }
    );
  }
}
