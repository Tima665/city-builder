import { Box } from '@react-three/drei';
import { BuildingComponentProps } from '../Building3D';

export const Office = ({ position, colors }: BuildingComponentProps) => {
  return (
    <group position={position}>
      {/* Main building */}
      <Box args={[0.6, 0.8, 0.6]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color={colors.main} />
      </Box>

      {/* Top floor */}
      <Box args={[0.5, 0.2, 0.5]} position={[0, 0.9, 0]}>
        <meshStandardMaterial color={colors.secondary} />
      </Box>

      {/* Windows (window grid) */}
      {Array.from({ length: 3 }).map((_, row) =>
        Array.from({ length: 3 }).map((_, col) => (
          <Box
            key={`window-${row}-${col}`}
            args={[0.08, 0.12, 0.05]}
            position={[-0.22 + col * 0.22, 0.25 + row * 0.2, 0.31]}
          >
            <meshStandardMaterial
              color={colors.windows}
              emissive={colors.windows}
              emissiveIntensity={0.2}
            />
          </Box>
        ))
      )}

      {/* Entrance */}
      <Box args={[0.2, 0.15, 0.05]} position={[0, 0.075, 0.31]}>
        <meshStandardMaterial color={colors.secondary} />
      </Box>
    </group>
  );
};
