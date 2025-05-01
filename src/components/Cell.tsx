import { useState } from 'react';
import Image from 'next/image';

export type CellType = 'empty' | 'building' | 'road' | 'river' | 'park';

interface CellProps {
  x: number;
  y: number;
  type: CellType;
  buildingImage?: string;
  onCellClick: (x: number, y: number, isRightClick: boolean) => void;
  onCellHover: (x: number, y: number) => void;
}

export const Cell = ({ x, y, type, buildingImage, onCellClick, onCellHover }: CellProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCellColor = () => {
    if (isHovered) return 'bg-blue-200';
    switch (type) {
      case 'empty':
        return 'bg-gray-100';
      case 'building':
        return 'bg-yellow-100';
      case 'road':
        return 'bg-gray-300';
      case 'river':
        return 'bg-blue-100';
      case 'park':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCellClick(x, y, e.button === 2);
  };

  return (
    <div
      className={`w-16 h-16 border border-gray-300 ${getCellColor()} relative transition-colors duration-200`}
      onClick={handleClick}
      onContextMenu={handleClick}
      onMouseEnter={() => {
        setIsHovered(true);
        onCellHover(x, y);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {buildingImage && (
        <div className={`absolute inset-0 ${isHovered ? 'brightness-75' : ''}`}>
          <Image
            src={buildingImage}
            alt="Building"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}; 