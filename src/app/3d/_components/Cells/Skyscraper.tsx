import { Cylinder } from '@react-three/drei';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';
import { BuildingComponentProps } from '../Building3D';
import { Box } from '@react-three/drei';

export const Skyscraper = ({ position, colors }: BuildingComponentProps) => {
  const glassMaterialRef = useRef<MeshStandardMaterial>(null);

  return (
    <group position={position}>
      {/* Main building */}
      <Box args={[0.5, 1.2, 0.5]} position={[0, 0.6, 0]}>
        <meshStandardMaterial
          ref={glassMaterialRef}
          color={colors.main}
          metalness={0.8}
          roughness={0.2}
          emissive={colors.windows}
          emissiveIntensity={0.1}
        />
      </Box>

      {/* Top */}
      <Cylinder args={[0.2, 0.3, 0.2, 8]} position={[0, 1.3, 0]}>
        <meshStandardMaterial color={colors.roof} metalness={0.7} roughness={0.3} />
      </Cylinder>

      {/* Antenna */}
      <Cylinder args={[0.02, 0.02, 0.3, 8]} position={[0, 1.55, 0]}>
        <meshStandardMaterial color="#A0A0A0" metalness={0.9} roughness={0.2} />
      </Cylinder>
    </group>
  );
};
