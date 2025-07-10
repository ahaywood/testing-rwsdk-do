import { db } from "@/db/db";
import { RequestInfo } from "rwsdk/worker";

export function Home({ ctx }: RequestInfo) {
  const users = db.selectFrom("users").selectAll().execute();
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
