import { Request, Response } from "express";
import URL from "./url-model";

export async function urlShortner(req: Request, res: Response) {
  try {
    const { url } = req.body;
    if (url.length === 0) {
      throw new Error("URL should be provided");
    }
    let urlId = generateUrlId(url);
    while (!URL.find({ urlId })) {
      urlId = generateUrlId(url);
    }

    const shortenedURLid = await URL.create({ url, urlId });
    const shortUrl = `${req.protocol}://${req.headers.host}/${shortenedURLid.urlId}`;
    res.render("shortened", { shortUrl, title: "URL Shortened" });
  } catch (err: any) {
    res.status(400);
    res.send(err.message);
  } finally {
    return;
  }
}

export async function redirect(req: Request, res: Response) {
  const { urlId } = req.params;
  try {
    const url = await URL.findOne({ urlId });
    if (url) {
      res.redirect(url.url);
    } else {
      res.status(404).send("URl not found");
    }
  } catch (err: any) {
    res.status(500);
    res.send(err.message);
  }
}

function generateUrlId(url: string): string {
  const letters = url.replace(/[^a-zA-Z]/g, "");
  let urlId = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    urlId += letters[randomIndex];
  }
  return urlId;
}
