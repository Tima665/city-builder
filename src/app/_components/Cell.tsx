'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import '../styles/cursors.css';

export type CellType = 'empty' | 'building' | 'road' | 'river' | 'park';

export interface CellData {
  type: CellType;
  buildingImage?: string;
}

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
    if (isHovered) return 'bg-blue-200/50';
    switch (type) {
      case 'empty':
        return 'bg-white';
      case 'building':
        return 'bg-yellow-50';
      case 'road':
        return 'bg-gray-200';
      case 'river':
        return 'bg-blue-50';
      case 'park':
        return 'bg-green-50';
      default:
        return 'bg-white';
    }
  };

  const getHoverEffect = () => {
    switch (type) {
      case 'empty':
        return 'after:bg-white hover:after:opacity-30';
      case 'building':
        return 'after:bg-yellow-500 hover:after:opacity-30';
      case 'road':
      case 'river':
      case 'park':
        return 'after:bg-red-500 hover:after:opacity-50';
      default:
        return 'after:bg-white hover:after:opacity-30';
    }
  };

  const getCursor = () => {
    switch (type) {
      case 'empty':
        return 'cursor-hammer';
      case 'building':
        return 'cursor-cross';
      case 'road':
      case 'river':
      case 'park':
        return 'cursor-not-allowed-custom';
      default:
        return 'cursor-default';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCellClick(x, y, e.button === 2);
  };

  const baseClasses = clsx(
    'w-7 h-7 md:w-12 md:h-12 border border-gray-200',
    getCellColor(),
    'relative transition-all duration-200',
    'after:absolute after:inset-0 after:opacity-0',
    getHoverEffect(),
    getCursor()
  );

  const imageContainerClasses = clsx('absolute inset-0', 'transition-all duration-200', {
    'brightness-90 scale-105': isHovered,
  });

  return (
    <div
      className={baseClasses}
      onClick={handleClick}
      onContextMenu={handleClick}
      onMouseEnter={() => {
        setIsHovered(true);
        onCellHover(x, y);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={imageContainerClasses}>
        <Image
          src={'/terrain/grass.svg'}
          alt="Building"
          fill
          className="object-cover pointer-events-none"
        />
      </div>

      {buildingImage && (
        <div className={imageContainerClasses}>
          <Image
            src={buildingImage}
            alt="Building"
            fill
            className={clsx('object-cover pointer-events-none', {
              'p-1': type !== 'road',
            })}
          />
        </div>
      )}
    </div>
  );
};
