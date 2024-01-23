import { json, type MetaFunction } from "@remix-run/node";
import { getKnexClient } from "./db.server";

import { createClient } from "@libsql/client";
import { useLoaderData } from "@remix-run/react";

const client = createClient({
  url: "libsql://test-giovannibenussi.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJnaWQiOiJlODQwODFhYy1iOWRmLTExZWUtYmJjYy0xNmRjNDNjNjljODYiLCJpYXQiOiIyMDI0LTAxLTIzVDE1OjM2OjA0LjcyODY5NzI5OFoifQ.N1dOYDPk9YBUEckgeGIaEOGO-qlvaBI_Xyvl8lsz7_n_w0EH4aFxkWWYOl0IbaAJvrvVpBCLIcpLa0idatLiAQ",
});

type User = {
  id: string;
  first_name: string;
};

export const loader = async () => {
  const result = await client.execute("SELECT * FROM users");
  const users = result.rows as unknown as User[];
  const knexUsers: User[] = await getKnexClient()<User[]>("users").select(
    "first_name"
  );
  return json({ ok: true, users, knexUsers });
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { users, knexUsers } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <h2>LibSQL Users</h2>
      {users.map((user) => (
        <p key={user.first_name}>{user.first_name}</p>
      ))}
      <h2>Knex Users</h2>
      {knexUsers.map((user) => (
        <p key={user.first_name}>{user.first_name}</p>
      ))}
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
