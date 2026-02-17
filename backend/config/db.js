import pg from "pg";
export const db = new pg.Pool({
    user : "postgres",
    host : "localhost",
    database: "webblog",
    port: 5432,
    password: "ameen@0002"
});