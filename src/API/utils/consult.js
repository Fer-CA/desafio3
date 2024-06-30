const { pool } = require("../db/config");

const getPost = async () => {
    try {
        const query = "SELECT * FROM post;";
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error("Error al obtener los posts:", error.message);
        throw new Error("Error al obtener los posts");
    }
};

const createPost = async ({ titulo, url, descripcion, likes = 0 }) => {
    try {
        const query = "INSERT INTO post (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *;";
        const values = [titulo, url, descripcion, likes];
        const { rows } = await pool.query(query, values);
        return rows[0]; 
    } catch (error) {
        console.error("Error al crear el post:", error.message);
        throw new Error("Error al crear el post");
    }
};

module.exports = { getPost, createPost };
