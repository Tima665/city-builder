'use client';

import { getBuildingColors } from './utils';
import { Vector3 } from 'three';
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
    road: <Road position={position} hovered={hovered} />,
  };

  return buildingComponents[type];
};
