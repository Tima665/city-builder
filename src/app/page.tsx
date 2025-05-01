'use client';

import { useState } from 'react';
import { GameBoard } from '@/components/GameBoard';

export default function Home() {
  const [scale, setScale] = useState(1);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Город-Строитель</h1>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="aspect-square w-full max-w-4xl mx-auto">
            <GameBoard scale={scale} onScaleChange={setScale} />
          </div>
        </div>
      </div>
    </main>
  );
}
