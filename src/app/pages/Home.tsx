import { getDb } from "@/db/db";
import { RequestInfo } from "rwsdk/worker";

export async function Home({ ctx }: RequestInfo) {
  try {
    const db = getDb();

    // Try to insert a test user if none exist
    const existingUsers = await db.selectFrom("users").selectAll().execute();

    if (existingUsers.length === 0) {
      await db
        .insertInto("users")
        .values({
          id: "test-user-1",
          username: "testuser",
          createdAt: new Date().toISOString(),
        })
        .execute();
    }

    const users = await db.selectFrom("users").selectAll().execute();
    console.log({ users });

    return (
      <div>
        <h1>Hello World</h1>
        <p>Users: {users.length}</p>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Database error:", error);
    return (
      <div>
        <h1>Hello World</h1>
        <p>
          Database error:{" "}
          {error instanceof Error ? error.message : String(error)}
        </p>
      </div>
    );
  }
}
