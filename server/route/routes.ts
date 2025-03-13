import express, { Request, Response } from "express";
import { getNews, getNewsBySlug, addNews } from "../data/newsService";
import { title } from "process";
import { News, getAllNews } from "../services/newsService";

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
    const news: News[] = await getAllNews();
  
    res.render("news", { news, title: "Recent nieuws" });
  });
  


router.get("/news/:slug", (req: Request, res: Response) => {
    const slug = req.params.slug;
    const article = getNewsBySlug(slug);
    res.render("news", {article, title: "Nieuwsdetail"})

    if (article) {
        res.render("detail", { title: article.title, article });
    } else {
        res.status(404).send("Artikel niet gevonden");
    }
});


/*router.post("/news", (req: Request, res: Response) => {
    const { title, content, date } = req.body;

    if (!title || !content || !date) {
        return res.status(400).json({ error: "Vul alle velden in!" });
    }

    const newArticle = addNews({ title, content, date });
    res.status(201).json(newArticle);
});*/

export default router;
