"use client";

import Header from "@/app/components/Header";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-full bg-[url('/bg.png')] bg-cover bg-center">
      <Header />

      <div className="text-gradient-gold absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-start justify-center px-12 md:px-20">
        <h1 className="mb-4 font-[AaGuDianKeBenSong] text-4xl md:text-6xl">
          闽台非遗数字展示平台
        </h1>

        <h2 className="mb-4 font-[DingLieSong] text-2xl md:text-4xl">
          一站式浏览传统技艺之美
        </h2>

        <p className="mb-8 max-w-2xl">
          闽台地区非物质文化遗产承载着丰富的历史记忆与民间智慧，涵盖了传统工艺、表演艺术、民俗仪式等多种形式。本平台致力于通过数字化手段，将散落在闽台各地的非遗资源进行系统整理与视觉呈现，让公众得以在轻松浏览中，走近那些正在消逝却依旧闪耀的文化瑰宝。
        </p>

        <PrimaryButton onClick={() => router.push("/catalog")}>
          立即探索
        </PrimaryButton>
      </div>
    </div>
  );
}
