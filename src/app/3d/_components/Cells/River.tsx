import { Box } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

export const River = ({ x, y, hovered = false }: { x: number; y: number; hovered?: boolean }) => {
  const waterRef = useRef<Mesh>(null);

  return (
    <group position={[x, 0, y]}>
      {/* Base for clicks */}
      <Box args={[0.9, 0.02, 0.9]} position={[0, -0.08, 0]} visible={false}>
        <meshStandardMaterial opacity={0} transparent />
      </Box>

      {/* Water */}
      <Box ref={waterRef} args={[0.85, 0.15, 0.85]} position={[0, -0.05, 0]}>
        <meshStandardMaterial
          color={hovered ? '#FF0000' : '#4FA4FF'}
          transparent
          opacity={0.8}
          emissive={hovered ? '#FF0000' : '#0066FF'}
          emissiveIntensity={hovered ? 3 : 0.3}
          metalness={0.3}
          roughness={0.1}
        />
      </Box>
    </group>
  );
};
