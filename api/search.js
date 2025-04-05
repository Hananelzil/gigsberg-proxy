export default async function handler(req, res) {
  const performer = req.query.performer1 || "Lady_Gaga";

  try {
    const gigsbergRes = await fetch(
      `https://integration.gigsberg.com/v1/event/search?performer1=${encodeURIComponent(performer)}`,
      {
        method: "POST",
        headers: {
          "x-api-key": "04db36cada110bfc8a653b61e6343c48",
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Referer": "https://www.gigsberg.com",
          "Origin": "https://www.gigsberg.com",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({}),
      }
    );

    const data = await gigsbergRes.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Proxy error:", err.message);
    res.status(500).json({ error: "Proxy failed", details: err.message });
  }
}

