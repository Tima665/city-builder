import { useState, useCallback, useRef, useEffect } from 'react';
import { Cell, CellType } from './Cell';

const GRID_SIZE = 20;
const BUILDING_IMAGES = Array.from({ length: 10 }, (_, i) => `/buildings/building-${i + 1}.png`);

interface GameBoardProps {
  scale: number;
  onScaleChange: (scale: number) => void;
}

export const GameBoard = ({ scale, onScaleChange }: GameBoardProps) => {
  const [grid, setGrid] = useState<Array<Array<{ type: CellType; buildingImage?: string }>>>(
    Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({ type: 'empty' }))
    )
  );
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
      if (isRightClick) {
        newGrid[y][x] = { type: 'empty' };
      } else if (newGrid[y][x].type === 'empty') {
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
    <div className="relative w-full h-full overflow-hidden">
      <div
        ref={boardRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
          transition: 'transform 0.1s ease-out',
        }}
        onWheel={handleWheel}
      >
        <div className="grid grid-cols-20 gap-0">
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
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg">
          <p>Координаты: ({selectedCell.x}, {selectedCell.y})</p>
          <p>Тип: {grid[selectedCell.y][selectedCell.x].type}</p>
        </div>
      )}
    </div>
  );
}; 