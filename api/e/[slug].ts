import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).send("Slug required");
  }

  const supabaseUrl =
    "https://cqqnipzdmtfbmvsrbmso.supabase.co/functions/v1/event-og";

  try {
    const response = await fetch(`${supabaseUrl}?slug=${slug}`, {
      headers: {
        "user-agent": req.headers["user-agent"] || "",
      },
    });

    const body = await response.text();
    const contentType = response.headers.get("content-type") || "text/html";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");
    return res.status(response.status).send(body);
  } catch (err) {
    return res.status(500).send("Error fetching event");
  }
}
