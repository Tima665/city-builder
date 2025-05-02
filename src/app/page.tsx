'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GameBoard } from '@/app/_components/GameBoard';

export default function Home() {
  const [scale, setScale] = useState(1);

  return (
    <main className="h-screen w-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-bold text-gray-800">City Builder</h1>
        <Link
          href="/3d"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow transition"
        >
          Go to 3D version
        </Link>
      </div>
      <div className="flex-1 relative">
        <GameBoard scale={scale} onScaleChange={setScale} />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm text-gray-600">
          <p>
            Use the mouse wheel to zoom in and out • Left mouse button - build, right mouse button -
            remove
          </p>
        </div>
      </div>
    </main>
  );
}
