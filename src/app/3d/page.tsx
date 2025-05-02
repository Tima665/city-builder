'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { GameBoard3D } from '@/app/3d/_components/GameBoard3D';
import { CellData } from '@/app/_components/Cell';

const GRID_SIZE = 10;
const BUILDING_IMAGES = Array.from({ length: 10 }, (_, i) => `/buildings/building-${i + 1}.svg`);
const INITIAL_RIVER_CELLS = 6;
const INITIAL_FOREST_CELLS = 10;
const INITIAL_ROAD_CELLS = 20;

const generateInitialGrid = () => {
  const grid = Array(GRID_SIZE)
    .fill(null)
    .map(() =>
      Array(GRID_SIZE)
        .fill(null)
        .map(() => ({ type: 'empty' }) as CellData)
    );

  // Create a list of all possible coordinates
  const allCoordinates = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      allCoordinates.push({ x, y });
    }
  }

  // Shuffle coordinates randomly
  for (let i = allCoordinates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCoordinates[i], allCoordinates[j]] = [allCoordinates[j], allCoordinates[i]];
  }

  // Select the first INITIAL_RIVER_CELLS coordinates and place the river
  for (let i = 0; i < INITIAL_RIVER_CELLS; i++) {
    const { x, y } = allCoordinates[i];
    grid[y][x] = { type: 'river' };
  }

  // Select the next INITIAL_FOREST_CELLS coordinates and place forest
  for (let i = INITIAL_RIVER_CELLS; i < INITIAL_RIVER_CELLS + INITIAL_FOREST_CELLS; i++) {
    const { x, y } = allCoordinates[i];
    grid[y][x] = { type: 'park' };
  }

  // Select the next INITIAL_ROAD_CELLS coordinates and place roads
  for (
    let i = INITIAL_RIVER_CELLS + INITIAL_FOREST_CELLS;
    i < INITIAL_RIVER_CELLS + INITIAL_FOREST_CELLS + INITIAL_ROAD_CELLS &&
    i < allCoordinates.length;
    i++
  ) {
    const { x, y } = allCoordinates[i];
    grid[y][x] = { type: 'road', buildingImage: '' };
  }

  return grid;
};

export default function Home3D() {
  const [grid, setGrid] = useState<CellData[][]>(generateInitialGrid);
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number; type: string } | null>(
    null
  );

  const handleCellClick = useCallback((x: number, y: number, isRightClick: boolean) => {
    setGrid(prev => {
      const newGrid = [...prev];
      const currentCell = newGrid[y][x];

      if (isRightClick) {
        // Can only remove buildings, can't remove river, forest or roads
        if (currentCell.type === 'building') {
          newGrid[y][x] = { type: 'empty' };
        }
      } else if (currentCell.type === 'empty') {
        // Can only build on empty cells
        const randomBuilding = BUILDING_IMAGES[Math.floor(Math.random() * BUILDING_IMAGES.length)];
        newGrid[y][x] = { type: 'building', buildingImage: randomBuilding };
      }
      return newGrid;
    });
  }, []);

  const handleCellHover = useCallback(
    (x: number, y: number, isHovered: boolean) => {
      if (isHovered) {
        setHoveredCell({ x, y, type: grid[y][x].type });
      } else {
        setHoveredCell(null);
      }
    },
    [grid]
  );

  return (
    <main className="h-screen w-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-bold text-gray-800">3D City Builder</h1>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow transition"
        >
          Back to 2D version
        </Link>
      </div>

      <div className="flex-1 relative">
        <GameBoard3D
          width={GRID_SIZE}
          height={GRID_SIZE}
          cells={grid}
          onCellClick={handleCellClick}
          onCellHover={handleCellHover}
        />

        {hoveredCell && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm">
            <p className="font-medium text-gray-600">
              Coordinates: ({hoveredCell.x}, {hoveredCell.y})
            </p>
            <p className="text-gray-600">Type: {hoveredCell.type}</p>
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm text-gray-600">
          <p>
            Use the mouse to rotate the camera • Left mouse button - build, right mouse button - remove
          </p>
        </div>
      </div>
    </main>
  );
}
