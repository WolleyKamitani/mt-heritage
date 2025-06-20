"use client";

import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function Detail() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data));
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen w-full bg-[url('/bg.png')] bg-cover bg-fixed bg-center">
        <Header />
        <div className="container mx-auto px-4 pt-24 text-white">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[url('/bg.png')] bg-cover bg-fixed bg-center pb-12">
      <Header />

      <motion.div
        className="container mx-auto px-4 pt-24 text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          className="text-amber-400 mb-4 hover:underline"
          onClick={() => router.back()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          返回目录
        </motion.button>

        <motion.h1
          className="font-[AaGuDianKeBenSong] text-3xl md:text-4xl text-gradient-gold mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {project.name}
        </motion.h1>

        <motion.p
          className="text-amber-300 font-[DingLieSong] text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {project.category}
        </motion.p>

        <motion.div
          className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-6 shadow-xl space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-amber-400 text-xl mb-2">简介</h2>
            <p className="text-gray-200 whitespace-pre-line">{project.description}</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-amber-400 text-xl mb-2">非遗信息</h2>
            <ul className="text-gray-200 space-y-1">
              <li><strong>项目类型：</strong>{project.type}</li>
              <li><strong>级别：</strong>{project.level}</li>
              <li><strong>批次：</strong>{project.batch}</li>
              <li><strong>编号：</strong>{project.code}</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-amber-400 text-xl mb-2">传承人</h2>
            {project.inheritors?.length > 0 ? (
              <ul className="text-gray-200 list-disc list-inside">
                {project.inheritors.map((name: string, i: number) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">暂无信息</p>
            )}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-amber-400 text-xl mb-2">传承单位与地点</h2>
            <p className="text-gray-200"><strong>单位：</strong>{project.unit || "暂无信息"}</p>
            {project.regions?.length > 0 && (
              <p className="text-gray-200"><strong>地区：</strong>{project.regions.join(", ")}</p>
            )}
          </motion.section>
        </motion.div>
      </motion.div>
    </div>
  );
}
