'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import { getBuildingColors } from './utils';
import { Group, Vector3 } from 'three';
import {
  Cottage,
  House,
  Skyscraper,
  Office,
  Shop,
  Hospital,
  SimpleHouse,
  Factory,
  ModernSkyscraper,
  Stadium,
  Park,
  Road,
} from './Cells';

// Building types
export type BuildingType =
  | 'house'
  | 'skyscraper'
  | 'office'
  | 'shop'
  | 'cottage'
  | 'factory'
  | 'hospital'
  | 'simple_house'
  | 'stadium'
  | 'modern_skyscraper'
  | 'park'
  | 'road';

interface BuildingProps {
  position: Vector3;
  type: BuildingType;
  hovered?: boolean;
}

// Types for color scheme
interface BuildingColors {
  main: string;
  secondary: string;
  roof: string;
  windows: string;
}

export interface BuildingComponentProps {
  position: Vector3;
  colors: BuildingColors;
}

// Main building selection component
export const Building3D = ({ position, type, hovered = false }: BuildingProps) => {
  const colors = getBuildingColors(type);

  // If cursor is hovering, change colors
  const modifiedColors: BuildingColors = hovered
    ? {
        main: '#FFEB3B', // Yellow color for highlighting
        secondary: '#FDD835',
        roof: '#F57F17',
        windows: colors.windows,
      }
    : colors;

  // Object with building components
  const buildingComponents = {
    house: <House position={position} colors={modifiedColors} />,
    skyscraper: <Skyscraper position={position} colors={modifiedColors} />,
    office: <Office position={position} colors={modifiedColors} />,
    shop: <Shop position={position} colors={modifiedColors} />,
    cottage: <Cottage position={position} colors={modifiedColors} />,
    factory: <Factory position={position} colors={modifiedColors} />,
    hospital: <Hospital position={position} colors={modifiedColors} />,
    simple_house: <SimpleHouse position={position} colors={modifiedColors} />,
    stadium: <Stadium position={position} colors={modifiedColors} />,
    modern_skyscraper: <ModernSkyscraper position={position} colors={modifiedColors} />,
    park: <Park position={position} />,
    road: hovered ? <HoveredRoad position={position} /> : <Road position={position} />,
  };

  return buildingComponents[type];
};

// Road component when hovered
const HoveredRoad = ({ position }: Omit<BuildingComponentProps, 'colors'>) => {
  const carRef = useRef<Group>(null);
  const car2Ref = useRef<Group>(null);

  // Animation of car movement (same as in regular road)
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (carRef.current) {
      const carPosition = ((time * 0.3) % 1) * 0.6 - 0.3;
      carRef.current.position.z = carPosition;
    }

    if (car2Ref.current) {
      const car2Position = 0.3 - ((time * 0.2) % 1) * 0.6;
      car2Ref.current.position.z = car2Position;
    }
  });

  return (
    <group position={position}>
      {/* Road base - asphalt (yellow color when hovered) */}
      <Box args={[0.9, 0.02, 0.9]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#FFEB3B" roughness={0.8} />
      </Box>

      {/* Vertical markings - dotted line */}
      {[-0.3, -0.1, 0.1, 0.3].map((z, i) => (
        <Box key={`line-h-${i}`} args={[0.02, 0.01, 0.05]} position={[0, 0.02, z]}>
          <meshStandardMaterial color="#FFFFFF" />
        </Box>
      ))}

      {/* First car - moves along Z axis */}
      <group ref={carRef} position={[-0.25, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Body */}
        <Box args={[0.12, 0.05, 0.06]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#FDD835" metalness={0.6} roughness={0.3} />
        </Box>

        {/* Roof */}
        <Box args={[0.07, 0.04, 0.06]} position={[0, 0.045, 0]}>
          <meshStandardMaterial color="#F57F17" metalness={0.6} roughness={0.3} />
        </Box>

        {/* Wheels */}
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[0.04, -0.025, 0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[0.04, -0.025, -0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[-0.04, -0.025, 0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[-0.04, -0.025, -0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
      </group>

      {/* Second car - moves along Z axis */}
      <group ref={car2Ref} position={[0.25, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Body */}
        <Box args={[0.12, 0.05, 0.06]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#FDD835" metalness={0.6} roughness={0.3} />
        </Box>

        {/* Roof */}
        <Box args={[0.07, 0.04, 0.06]} position={[0, 0.045, 0]}>
          <meshStandardMaterial color="#F57F17" metalness={0.6} roughness={0.3} />
        </Box>

        {/* Wheels */}
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[0.04, -0.025, 0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[0.04, -0.025, -0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[-0.04, -0.025, 0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[-0.04, -0.025, -0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
      </group>
    </group>
  );
};
