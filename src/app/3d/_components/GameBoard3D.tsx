'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Plane } from '@react-three/drei';
import { CellData, CellType } from '../../_components/Cell';
import { Building3D, BuildingType } from './Building3D';
import { River } from './Cells';
import { Mesh, MeshStandardMaterial, Vector3 } from 'three';

interface GameBoardProps {
  width: number;
  height: number;
  cells: CellData[][];
  onCellClick: (x: number, y: number, isRightClick: boolean) => void;
  onCellHover?: (x: number, y: number, isHovered: boolean) => void;
}

// Component for a single cell in 3D
const Cell3D = ({
  x,
  y,
  type,
  buildingImage,
  onCellClick,
  onCellHover,
}: {
  x: number;
  y: number;
  type: CellType;
  buildingImage?: string;
  onCellClick: (x: number, y: number, isRightClick: boolean) => void;
  onCellHover?: (x: number, y: number, isHovered: boolean) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);

  // Notify parent component about hovering
  useEffect(() => {
    if (onCellHover) {
      onCellHover(x, y, hovered);
    }
  }, [hovered, x, y, onCellHover]);

  // Determine cell color based on type
  const getColor = () => {
    switch (type) {
      case 'empty':
        return '#5E8C3E';
      case 'building':
        return '#FFFACD';
      case 'road':
        return '#D3D3D3';
      case 'river':
        return '#4FA4FF';
      case 'park':
        return '#E6FFE6';
      default:
        return '#FFFFFF';
    }
  };

  // Object height based on type
  const getHeight = () => {
    if (type === 'building') return 0.05; // Now this will be just a base for 3D model
    if (type === 'river') return 0.03;
    return 0.05;
  };

  // Object position based on type
  const getPosition = (): [number, number, number] => {
    let yPosition = getHeight() / 2;
    if (type === 'river') yPosition = -0.04; // River is below ground level
    return [x, yPosition, y];
  };

  // For buildings we will use a separate 3D model
  if (type === 'building') {
    // Extract building number from texture path to determine building type
    let buildingType: BuildingType = 'house';

    if (buildingImage) {
      const match = buildingImage.match(/building-(\d+)\.svg$/);
      if (match && match[1]) {
        const buildingNumber = parseInt(match[1]);

        // Determine building type based on its number
        switch (buildingNumber % 10) {
          case 0:
            buildingType = 'house';
            break;
          case 1:
            buildingType = 'skyscraper';
            break;
          case 2:
            buildingType = 'office';
            break;
          case 3:
            buildingType = 'shop';
            break;
          case 4:
            buildingType = 'cottage';
            break;
          case 5:
            buildingType = 'factory';
            break;
          case 6:
            buildingType = 'hospital';
            break;
          case 7:
            buildingType = 'simple_house';
            break;
          case 8:
            buildingType = 'stadium';
            break;
          case 9:
            buildingType = 'modern_skyscraper';
            break;
        }
      }
    }

    return (
      <>
        {/* Building base */}
        <Box
          ref={meshRef}
          args={[0.9, 0.05, 0.9]}
          position={[x, 0.01, y]}
          onClick={e => {
            e.stopPropagation();
            onCellClick(x, y, false);
          }}
          onContextMenu={e => {
            e.stopPropagation();
            onCellClick(x, y, true);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={hovered ? '#ffff00' : '#5E8C3E'}
            transparent={false}
            opacity={1}
          />
        </Box>

        {/* 3D model of building */}
        <Building3D
          position={[x, 0, y] as unknown as Vector3}
          type={buildingType}
          hovered={hovered}
        />
      </>
    );
  }

  // For parks we use a 3D model
  if (type === 'park') {
    return (
      <>
        {/* Park base */}
        <Box
          ref={meshRef}
          args={[0.9, 0.02, 0.9]}
          position={[x, 0.01, y]}
          onClick={e => {
            e.stopPropagation();
            onCellClick(x, y, false);
          }}
          onContextMenu={e => {
            e.stopPropagation();
            onCellClick(x, y, true);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={hovered ? '#ff0000' : '#5E8C3E'}
            transparent={true}
            emissive={hovered ? '#FF0000' : ''}
            emissiveIntensity={hovered ? 3 : 0}
          />
        </Box>

        {/* 3D model of park */}
        <Building3D position={[x, 0, y] as unknown as Vector3} type="park" hovered={hovered} />
      </>
    );
  }

  // For roads we use a 3D model
  if (type === 'road') {
    return (
      <>
        {/* Road base */}
        <Box
          ref={meshRef}
          args={[0.9, 0.02, 0.9]}
          position={[x, 0.01, y]}
          onClick={e => {
            e.stopPropagation();
            onCellClick(x, y, false);
          }}
          onContextMenu={e => {
            e.stopPropagation();
            onCellClick(x, y, true);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={hovered ? '#77BBFF' : '#9E9E9E'}
            transparent={hovered ? true : false}
            emissive={hovered ? '#FF0000' : ''}
            emissiveIntensity={hovered ? 3 : 0}
          />
        </Box>

        {/* 3D model of road */}
        <Building3D position={[x, 0, y] as unknown as Vector3} type="road" hovered={hovered} />
      </>
    );
  }

  // For rivers we use a special 3D model
  if (type === 'river') {
    return (
      <>
        <Box
          ref={meshRef}
          args={[0.9, 0.02, 0.9]}
          position={[x, -0.1, y]}
          onClick={e => {
            e.stopPropagation();
            onCellClick(x, y, false);
          }}
          onContextMenu={e => {
            e.stopPropagation();
            onCellClick(x, y, true);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          visible={false}
        >
          <meshStandardMaterial opacity={0} transparent />
        </Box>

        <River x={x} y={y} hovered={hovered} />
      </>
    );
  }

  return (
    <Box
      ref={meshRef}
      args={[0.9, getHeight(), 0.9]} // size slightly less than 1 to make borders visible
      position={getPosition()} // position based on height and type
      onClick={e => {
        e.stopPropagation();
        onCellClick(x, y, false);
      }}
      onContextMenu={e => {
        e.stopPropagation();
        onCellClick(x, y, true);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        ref={materialRef}
        color={hovered ? '#77BBFF' : getColor()}
        transparent={true}
        opacity={type === 'empty' ? 0.9 : 0.8}
        emissive={type === 'empty' ? '#000000' : '#0066FF'}
        emissiveIntensity={type === 'empty' ? 0 : 0.2}
      />
    </Box>
  );
};

// Main component of 3D game board
export const GameBoard3D = ({ width, height, cells, onCellClick, onCellHover }: GameBoardProps) => {
  return (
    <div className="w-full h-[600px]">
      <Canvas
        camera={{
          position: [width * 5, width * 4, width * 5],
          fov: 45,
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[width / 2, 5, height / 2]} intensity={0.5} color="#FFFFFF" />

        {/* Main plane (ground) */}
        <Plane
          args={[width + 2, height + 2]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[width / 2 - 0.5, -0.1, height / 2 - 0.5]}
        >
          <meshStandardMaterial color="#5E8C3E" roughness={0.8} metalness={0.1} />
        </Plane>

        {/* River bottoms */}
        {cells.map((row, y) =>
          row.map(
            (cell, x) => cell.type === 'river' && <River key={`river-${x}-${y}`} x={x} y={y} />
          )
        )}

        {/* Game board cells */}
        {cells.map((row, y) =>
          row.map((cell, x) => (
            <Cell3D
              key={`${x}-${y}`}
              x={x}
              y={y}
              type={cell.type}
              buildingImage={cell.buildingImage}
              onCellClick={onCellClick}
              onCellHover={onCellHover}
            />
          ))
        )}

        {/* Camera control */}
        <OrbitControls
          target={[width / 2 - 0.5, 0, height / 2 - 0.5]}
          minDistance={3}
          maxDistance={width * 1.5}
          enableZoom={true}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};
