'use client';

import { useState } from 'react';
import { GameBoard } from '@/components/GameBoard';

export default function Home() {
  const [scale, setScale] = useState(1);

  return (
    <main className="h-screen w-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <h1 className="text-3xl font-bold text-center py-4 text-gray-800">Город-Строитель</h1>
      <div className="flex-1 relative">
        <GameBoard scale={scale} onScaleChange={setScale} />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm text-gray-600">
          <p>Используйте колесико мыши для масштабирования • Левая кнопка мыши - построить, правая - удалить</p>
        </div>
      </div>
    </main>
  );
}
