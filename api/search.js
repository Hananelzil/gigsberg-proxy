export default async function handler(req, res) {
  const { performer1, from, to } = req.query;

  const url = "https://integration.gigsberg.com/v1/event/search";

  // נבנה את ה-body של ה־POST לפי מה שנשלח
  const body = {};
  if (performer1) body.performer1 = performer1;
  if (from && to) body.date = { from, to };

  try {
    const gigsbergRes = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": "04db36cada110bfc8a653b61e6343c48",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await gigsbergRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from Gigsberg", details: error.message });
  }
}
