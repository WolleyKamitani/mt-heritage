"use client";

import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";

export default function Catalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    fetch("/api/projects/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);

        const urlCategory = searchParams.get("category");
        if (urlCategory && data.includes(urlCategory)) {
          setActiveCategory(urlCategory);
        } else if (data.length > 0) {
          setActiveCategory(data[0]);
        }
      });
    // 不添加 searchParams 到依赖数组
  }, []);

  useEffect(() => {
    if (!activeCategory) return;
    fetch(`/api/projects/search?category=${encodeURIComponent(activeCategory)}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(
          data.map((item: { id: string; name: string }) => ({
            id: item.id,
            name: item.name,
          })),
        );
      });
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const params = new URLSearchParams(window.location.search);
    params.set("category", category);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  const handleItemClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <div className="min-h-screen w-full bg-[url('/bg.png')] bg-cover bg-fixed bg-center pb-12">
      <Header />

      <div className="container mx-auto px-4 pt-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gradient-gold mb-8 text-center font-[AaGuDianKeBenSong] text-4xl md:text-5xl"
        >
          非遗资源目录
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-12 overflow-x-auto"
        >
          <div className="flex min-w-max space-x-4 border-b border-gray-700">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-3 text-lg transition-all duration-300 ${
                  activeCategory === category
                    ? "border-b-2 border-amber-500 font-semibold text-amber-400"
                    : "text-gray-300 hover:text-amber-300"
                } hover:scale-105 active:scale-95`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-opacity-50 rounded-lg bg-black p-6 shadow-xl backdrop-blur-sm"
        >
          <h2 className="mb-6 border-b border-amber-900 pb-2 font-[DingLieSong] text-2xl text-amber-400">
            {activeCategory}
          </h2>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  onClick={() => handleItemClick(item.id)}
                  className="bg-opacity-60 hover:bg-opacity-80 cursor-pointer rounded-md bg-gray-900 p-4 transition-all duration-300 hover:shadow-lg"
                >
                  <p className="text-gray-200">{item.name}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400">
              <p className="text-lg">此分类内容尚在完善中...</p>
              <div className="mt-4 text-amber-500/70">敬请期待</div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
