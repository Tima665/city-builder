'use client';

import { useState, useCallback, useRef } from 'react';
import { Cell, CellData } from './Cell';

const GRID_SIZE = 10;
const BUILDING_IMAGES = Array.from({ length: 10 }, (_, i) => `/buildings/building-${i + 1}.svg`);
const RIVER_IMAGE = '/terrain/river.svg';
const FOREST_IMAGE = '/terrain/forest.svg';
const ROAD_IMAGE = '/terrain/road.svg';
const INITIAL_RIVER_CELLS = 6;
const INITIAL_FOREST_CELLS = 10;
const INITIAL_ROAD_CELLS = 20;

interface GameBoardProps {
  scale: number;
  onScaleChange: (scale: number) => void;
}

const generateInitialGrid = () => {
  const grid = Array(GRID_SIZE).fill(null).map(() =>
    Array(GRID_SIZE).fill(null).map(() => ({ type: 'empty' } as CellData))
  );

  // Создаем список всех возможных координат
  const allCoordinates = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      allCoordinates.push({ x, y });
    }
  }

  // Перемешиваем координаты случайным образом
  for (let i = allCoordinates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCoordinates[i], allCoordinates[j]] = [allCoordinates[j], allCoordinates[i]];
  }

  // Выбираем первые INITIAL_RIVER_CELLS координат и размещаем реку
  for (let i = 0; i < INITIAL_RIVER_CELLS; i++) {
    const { x, y } = allCoordinates[i];
    grid[y][x] = { type: 'river', buildingImage: RIVER_IMAGE };
  }

  // Выбираем следующие INITIAL_FOREST_CELLS координат и размещаем лес
  for (let i = INITIAL_RIVER_CELLS; i < INITIAL_RIVER_CELLS + INITIAL_FOREST_CELLS; i++) {
    const { x, y } = allCoordinates[i];
    grid[y][x] = { type: 'park', buildingImage: FOREST_IMAGE };
  }

  // Выбираем следующие INITIAL_ROAD_CELLS координат и размещаем дороги
  for (let i = INITIAL_RIVER_CELLS + INITIAL_FOREST_CELLS; 
       i < INITIAL_RIVER_CELLS + INITIAL_FOREST_CELLS + INITIAL_ROAD_CELLS && i < allCoordinates.length; 
       i++) {
    const { x, y } = allCoordinates[i];
    grid[y][x] = { type: 'road', buildingImage: ROAD_IMAGE };
  }

  return grid;
};

export const GameBoard = ({ scale, onScaleChange }: GameBoardProps) => {
  const [grid, setGrid] = useState<CellData[][]>(generateInitialGrid);
  const [selectedCell, setSelectedCell] = useState<{ x: number; y: number } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(2, scale + delta));
    onScaleChange(newScale);
  }, [scale, onScaleChange]);

  const handleCellClick = useCallback((x: number, y: number, isRightClick: boolean) => {
    setGrid(prev => {
      const newGrid = [...prev];
      const currentCell = newGrid[y][x];
      
      if (isRightClick) {
        // Можно удалять только здания, реку, лес и дороги нельзя
        if (currentCell.type === 'building') {
          newGrid[y][x] = { type: 'empty' };
        }
      } else if (currentCell.type === 'empty') {
        // Строить можно только на пустых клетках
        const randomBuilding = BUILDING_IMAGES[Math.floor(Math.random() * BUILDING_IMAGES.length)];
        newGrid[y][x] = { type: 'building', buildingImage: randomBuilding };
      }
      return newGrid;
    });
  }, []);

  const handleCellHover = useCallback((x: number, y: number) => {
    setSelectedCell({ x, y });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-50">
      <div
        ref={boardRef}
        className="w-max absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-lg shadow-lg"
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.2s ease-out',
        }}
        onWheel={handleWheel}
      >
        <div className="grid grid-cols-10 gap-0 p-2">
          {grid.map((row, y) =>
            row.map((cell, x) => (
              <Cell
                key={`${x}-${y}`}
                x={x}
                y={y}
                type={cell.type}
                buildingImage={cell.buildingImage}
                onCellClick={handleCellClick}
                onCellHover={handleCellHover}
              />
            ))
          )}
        </div>
      </div>
      {selectedCell && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm">
          <p className="font-medium">Координаты: ({selectedCell.x}, {selectedCell.y})</p>
          <p className="text-gray-600">Тип: {grid[selectedCell.y][selectedCell.x].type}</p>
        </div>
      )}
    </div>
  );
}; 