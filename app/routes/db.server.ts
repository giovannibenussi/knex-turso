import knex from "knex";

export const getKnexClient = function () {
  return knex({
    client: "sqlite3",
    connection: {
      filename:
        "libsql://test-giovannibenussi.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDI0LTAxLTIzVDE4OjU3OjA3LjkzMjc4MjM5NVoiLCJpZCI6ImYyNTRkNDE0LWI5ZGYtMTFlZS1iYmNjLTE2ZGM0M2M2OWM4NiJ9.gJMHd3kHZ-M8h3Zwa8KhFN3XyZkp1aDOUzz7drvjqQKlcZ7BmfZ0RaKnPdb3Qj3nTCQgBha0Izb9N3quZjExDg",
    },
  });
};
