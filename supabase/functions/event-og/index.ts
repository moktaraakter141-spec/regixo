import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const APP_URL = Deno.env.get("APP_URL")!; // e.g. https://regixo.vercel.app

// তোমার default banner এর public URL — assets folder থেকে
const DEFAULT_BANNER = `${APP_URL}/default-banner.png`;

const CRAWLERS = [
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "whatsapp",
  "telegrambot",
  "slackbot",
  "discordbot",
  "googlebot",
];

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return CRAWLERS.some((bot) => ua.includes(bot));
}

function buildOGHtml(event: {
  id: string;
  title: string;
  description?: string | null;
  banner_url?: string | null;
  venue?: string | null;
}): string {
  const title = event.title;
  const description =
    event.description || `Join us at ${event.venue || "this amazing event"}!`;
  const image = event.banner_url || DEFAULT_BANNER;
  const url = `${APP_URL}/events/${event.id}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="Regixo" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />

  <!-- WhatsApp এ venue দেখাবে description এ -->
  ${event.venue ? `<meta property="og:description" content="${description} 📍 ${event.venue}" />` : ""}

  <!-- Redirect real users to the React app -->
  <meta http-equiv="refresh" content="0;url=${url}" />
</head>
<body>
  <p>Redirecting to <a href="${url}">${title}</a>...</p>
</body>
</html>`;
}

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // URL থেকে event id নাও: /event-og?id=xxx অথবা /event-og/xxx
  const eventId =
    url.searchParams.get("id") || url.pathname.split("/").filter(Boolean).pop();

  if (!eventId) {
    return new Response("Event ID required", { status: 400 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data: event, error } = await supabase
    .from("events")
    .select("id, title, description, banner_url, venue")
    .eq("id", eventId)
    .single();

  if (error || !event) {
    return new Response("Event not found", { status: 404 });
  }

  const userAgent = req.headers.get("user-agent") || "";

  // Crawler হলে OG HTML দাও, real user হলে React app এ redirect করো
  if (isCrawler(userAgent)) {
    return new Response(buildOGHtml(event), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } else {
    return Response.redirect(`${APP_URL}/events/${event.id}`, 302);
  }
});
