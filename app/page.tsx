"use client";

import axios from "axios";
import { useState } from "react";
import Spinner from "./components/Spinner";

type AIResponse = {
  url: string;
}

export default function Page() {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<AIResponse[]>([]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.get("/api/prompt", { params: { prompt } });
      if (res.data) setImages(res.data?.data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={"flex flex-col items-center gap-5 sm:min-w-[600px]"}>
      <form className={"flex flex-row gap-2 w-full"} onSubmit={onSubmit}>
        <input
          className={"shadow-sm px-4 py-2 text-base text-gray-800 rounded-md flex-1"}
          placeholder={"Enter your prompt..."}
          type={"text"}
          onChange={(event) => setPrompt(event.currentTarget.value)} />
        <button
          className={"min-h-10 shadow-sm px-4 text-base bg-green-600 hover:bg-green-700 text-gray-100 rounded-md sm:w-[100px]"}
          type={"submit"}>Generate</button>
      </form>
      <div className={"w-full max-w-[600px]"}>
        {isLoading ? <Spinner /> : images.length > 0 ?
          images.map((image) => <img key={image.url} alt={`AI Generated Image: ${prompt}`} className={"w-full h-full"} src={image.url} />)
          : null}
      </div>
    </div>
  )
}   