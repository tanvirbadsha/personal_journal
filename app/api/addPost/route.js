import { promisePool } from "../../../util/db"; // Import the shared db connection

export async function POST(req) {
  const { title, content, is_private, tags } = await req.json();
  const user_id = 1; // Hardcoded user_id for now

  console.log("Received post data:", {
    title,
    content,
    is_private,
    user_id,
    tags,
  });

  // Validate input
  if (!title || !content) {
    return new Response(
      JSON.stringify({ message: "Title and Content are required" }),
      { status: 400 }
    );
  }

  const query = `
    INSERT INTO journal_entries (user_id, title, content, is_private, created_at, updated_at)
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `;

  try {
    console.log("Inserting into journal_entries:", {
      user_id,
      title,
      content,
      is_private,
    });

    // Insert the new post into the journal_entries table
    const [result] = await promisePool.query(query, [
      user_id,
      title,
      content,
      is_private,
    ]);

    const entry_id = result.insertId;

    // Insert tags if available
    if (tags && tags.length > 0) {
      const tagQuery = `
        INSERT INTO journal_entry_tags (entry_id, tag_id)
        VALUES ?
      `;
      const tagValues = tags.map((tag_id) => [entry_id, tag_id]);

      await promisePool.query(tagQuery, [tagValues]);
    }

    return new Response(
      JSON.stringify({ message: "Post created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while inserting post:", error);
    return new Response(
      JSON.stringify({
        message: "Error while saving the post",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
