import { Box, Cylinder } from '@react-three/drei';
import { useRef } from 'react';
import { BuildingComponentProps } from '../Building3D';
import { MeshStandardMaterial } from 'three';

export const ModernSkyscraper = ({ position, colors }: BuildingComponentProps) => {
  const glassMaterialRef = useRef<MeshStandardMaterial>(null);

  return (
    <group position={position}>
      {/* Skyscraper base - first block */}
      <Box args={[0.6, 0.9, 0.6]} position={[0, 0.45, 0]}>
        <meshStandardMaterial
          ref={glassMaterialRef}
          color={colors.main}
          metalness={0.9}
          roughness={0.1}
          emissive={colors.windows}
          emissiveIntensity={0.3}
        />
      </Box>

      {/* Second block (slightly narrower) */}
      <Box args={[0.55, 0.8, 0.55]} position={[0, 1.3, 0]}>
        <meshStandardMaterial
          color={colors.secondary}
          metalness={0.8}
          roughness={0.2}
          emissive={colors.windows}
          emissiveIntensity={0.2}
        />
      </Box>

      {/* Third block (even narrower) */}
      <Box args={[0.5, 0.5, 0.5]} position={[0, 1.95, 0]}>
        <meshStandardMaterial
          color={colors.main}
          metalness={0.7}
          roughness={0.3}
          emissive={colors.windows}
          emissiveIntensity={0.2}
        />
      </Box>

      {/* Top / spire */}
      <Cylinder args={[0.01, 0.2, 0.5, 6]} position={[0, 2.45, 0]}>
        <meshStandardMaterial color={colors.roof} metalness={0.9} roughness={0.1} />
      </Cylinder>

      {/* Decorative elements - vertical lines */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i * Math.PI) / 2 + Math.PI / 4;
        const x = 0.31 * Math.cos(angle);
        const z = 0.31 * Math.sin(angle);

        return (
          <Box key={`pillar-${i}`} args={[0.04, 1.7, 0.04]} position={[x, 0.85, z]}>
            <meshStandardMaterial color={colors.roof} metalness={0.6} roughness={0.4} />
          </Box>
        );
      })}

      {/* Reflective panels */}
      <Box args={[0.62, 0.5, 0.05]} position={[0, 0.7, 0.31]}>
        <meshStandardMaterial
          color={colors.windows}
          metalness={0.9}
          roughness={0.1}
          emissive={colors.windows}
          emissiveIntensity={0.2}
        />
      </Box>

      <Box args={[0.62, 0.5, 0.05]} position={[0, 0.7, -0.31]}>
        <meshStandardMaterial
          color={colors.windows}
          metalness={0.9}
          roughness={0.1}
          emissive={colors.windows}
          emissiveIntensity={0.2}
        />
      </Box>

      <Box args={[0.05, 0.5, 0.62]} position={[0.31, 0.7, 0]}>
        <meshStandardMaterial
          color={colors.windows}
          metalness={0.9}
          roughness={0.1}
          emissive={colors.windows}
          emissiveIntensity={0.2}
        />
      </Box>

      <Box args={[0.05, 0.5, 0.62]} position={[-0.31, 0.7, 0]}>
        <meshStandardMaterial
          color={colors.windows}
          metalness={0.9}
          roughness={0.1}
          emissive={colors.windows}
          emissiveIntensity={0.2}
        />
      </Box>

      {/* Skyscraper foundation */}
      <Box args={[0.7, 0.1, 0.7]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color={colors.roof} metalness={0.4} roughness={0.6} />
      </Box>
    </group>
  );
};
