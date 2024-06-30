require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { getPost, createPost } = require("./utils/consult");
const app = express();

const port = process.env.PORT || 3000; 

// Middleware
app.use(cors()); 
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
    res.status(200).send("API Likeme");
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await getPost();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/posts", async (req, res) => {
    try {
        const newPost = await createPost(req.body);
        res.status(201).json({ message: "Post creado con éxito", post: newPost });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Iniciar servidor
app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));
