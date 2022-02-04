import { pool } from "./pool";

export const findAll = async () => {
  const result = await pool.query("SELECT * FROM posts");
  return result.rows;
};

export const create = async (title: string, contents: string) => {
  const result = await pool.query(
    "INSERT INTO posts(title, contents) VALUES ($1, $2) RETURNING *",
    [title, contents]
  );
  return result.rows[0];
};

export const findOne = async (postId: string) => {
  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
    postId,
  ]);
  return result.rows[0];
};

export const updateOne = async (postId: string, { title, contents }) => {
  const result = await pool.query(
    "UPDATE posts SET title=$2, contents=$3 WHERE id=$1 RETURNING *",
    [postId, title, contents]
  );
  return result.rows[0];
};

export const deleteOne = async (postId: string) => {
  const result = await pool.query("DELETE FROM posts WHERE id=$1 RETURNING *", [
    postId,
  ]);
  return result.rows[0].id;
};
