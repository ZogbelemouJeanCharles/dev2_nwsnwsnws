import * as express from "express";
import express, { Request, Response } from "express";
import { getNews, getNewsBySlug, addNews } from "../data/newsService";

const router = express.Router();


router.get("/", (req: Request, res: Response) => {
    const news = getNews();
    res.render("index", { title: "Nieuws", news });
});


router.get("/news/:slug", (req: Request, res: Response) => {
    const slug = req.params.slug;
    const article = getNewsBySlug(slug);

    if (article) {
        res.render("detail", { title: article.title, article });
    } else {
        res.status(404).send("Artikel niet gevonden");
    }
});


router.post("/news", (req: Request, res: Response) => {
    const { title, content, date } = req.body;

    if (!title || !content || !date) {
        return res.status(400).json({ error: "Vul alle velden in!" });
    }

    const newArticle = addNews({ title, content, date });
    res.status(201).json(newArticle);
});

export default router;
