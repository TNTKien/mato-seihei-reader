"use client";

import { getLastestMangas } from "@/lib/data";
import { LastestManga } from "@/types";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import MangaCardNew from "./MangaCardNew";
import LatestSkeleton from "./LatestSkeleton";

const LastestMangas: FC = () => {
  const [mangas, setMangas] = useState<LastestManga[]>([]);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestMangas = await getLastestMangas();
        setMangas(latestMangas);
      } catch (error) {
        setFetchFailed(true);
      }
    };

    fetchData();
  }, []);

  if (mangas.length === 0) {
    return (
      <>
        <h1 className="text-2xl font-semibold pb-2 mt-3 px-1">Mới cập nhật</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <LatestSkeleton />
          <LatestSkeleton />
          <LatestSkeleton />
          <LatestSkeleton />
          <LatestSkeleton />
          <LatestSkeleton />
        </div>
      </>
    );
  }

  if (fetchFailed) {
    return <></>;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold pb-2 mt-3 px-1">Mới cập nhật</h1>

      <div className="px-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {mangas.map((manga) => (
          <MangaCardNew
            key={manga.info.id}
            manga={manga.info}
            chapter={manga.lastestChap}
          />
        ))}
      </div>
    </>
  );
};

export default LastestMangas;
