import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { prompt } = req.query;

    try {
        const headers = {
            "Authorization": `Bearer ${process.env.OPEN_AI_KEY}`,
            "Content-Type": `application/json`
        };
        const body = {
            prompt,
            size: "1024x1024",
            n: 1,
            response_format: "url"
        };

        const img = await axios.post("https://api.openai.com/v1/images/generations", body, { headers });
        return res.status(200).json({ ok: true, ...img.data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false });
    }
}