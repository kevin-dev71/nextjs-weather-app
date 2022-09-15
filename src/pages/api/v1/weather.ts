import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { AxiosError } from "axios";

import { OPENWEATHER_API_KEY } from "@/src/config/constants";
import { openWeatherAxiosInstance } from "@/src/lib/axios/openWeatherAxiosInstance";
import { OpenWeatherParams } from "@/src/ts/enums/OpenWeatherParams";
import { GeocodingApiResponse } from "@/src/ts/interfaces/GeocodingApiResponse.interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "OPTIONS"],
    origin: "*",
  });

  try {
    const {
      query: { city, units = OpenWeatherParams.METRIC },
    } = req;
    // TODO: Check if is valid `units`
    const { data }: { data: GeocodingApiResponse[] } = await openWeatherAxiosInstance.get(
      `/data/2.5/weather?q=${city}&units=${units}&appid=${OPENWEATHER_API_KEY}`
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
