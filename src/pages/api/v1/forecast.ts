import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { AxiosError } from "axios";

import { OPENWEATHER_API_KEY } from "@/src/config/constants";
import { openWeatherAxiosInstance } from "@/src/lib/axios/openWeatherAxiosInstance";
import { OpenWeatherParams } from "@/src/ts/enums/OpenWeatherParams";
import { Forecast5ApiResponse } from "@/src/ts/interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "OPTIONS"],
    origin: "*",
  });

  try {
    const {
      query: { lat, lon, units = OpenWeatherParams.METRIC, lang = "es" },
    } = req;
    // TODO: Check if is valid `units`
    const { data }: { data: Forecast5ApiResponse } = await openWeatherAxiosInstance.get(
      `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${OPENWEATHER_API_KEY}`
    );

    return res.status(200).json(data);
  } catch (err: any) {
    if (err instanceof AxiosError) {
      const { response } = err;

      const { status = 500, statusText = "Something went wrong", data } = response ?? {};

      return res.status(status).json({
        statusText,
        message: data?.message ?? "Something went wrong",
      });
    }

    return res.status(500).json({
      statusText: "Something went wrong, check server log.",
    });
  }
}
