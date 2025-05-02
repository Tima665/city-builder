import { Box, Cylinder } from '@react-three/drei';
import { BuildingComponentProps } from '../Building3D';

export const Hospital = ({ position, colors }: BuildingComponentProps) => {
  return (
    <group position={position}>
      {/* Main building */}
      <Box args={[0.7, 0.6, 0.5]} position={[0, 0.3, 0]}>
        <meshStandardMaterial color={colors.main} />
      </Box>

      {/* Additional wing */}
      <Box args={[0.3, 0.4, 0.4]} position={[-0.3, 0.2, -0.2]}>
        <meshStandardMaterial color={colors.secondary} />
      </Box>

      {/* Roof */}
      <Box args={[0.8, 0.08, 0.6]} position={[0, 0.64, 0]}>
        <meshStandardMaterial color={colors.roof} />
      </Box>

      {/* Helipad */}
      <Cylinder args={[0.15, 0.15, 0.02, 16]} position={[0, 0.68, 0]}>
        <meshStandardMaterial color="#424242" />
      </Cylinder>

      {/* H sign */}
      <Box args={[0.12, 0.01, 0.12]} position={[0, 0.69, 0]}>
        <meshStandardMaterial
          color={colors.windows}
          emissive={colors.windows}
          emissiveIntensity={0.5}
        />
      </Box>

      {/* Windows */}
      {Array.from({ length: 2 }).map((_, row) =>
        Array.from({ length: 3 }).map((_, col) => (
          <Box
            key={`window-h-${row}-${col}`}
            args={[0.1, 0.1, 0.05]}
            position={[-0.2 + col * 0.2, 0.3 + row * 0.2, 0.26]}
          >
            <meshStandardMaterial
              color={colors.windows}
              emissive={colors.windows}
              emissiveIntensity={0.3}
            />
          </Box>
        ))
      )}

      {/* Entrance */}
      <Box args={[0.2, 0.2, 0.05]} position={[0, 0.1, 0.26]}>
        <meshStandardMaterial color={colors.secondary} />
      </Box>

      {/* Cross */}
      <Box args={[0.04, 0.15, 0.05]} position={[0, 0.4, 0.28]}>
        <meshStandardMaterial color="#F44336" emissive="#F44336" emissiveIntensity={0.5} />
      </Box>
      <Box args={[0.15, 0.04, 0.05]} position={[0, 0.4, 0.28]}>
        <meshStandardMaterial color="#F44336" emissive="#F44336" emissiveIntensity={0.5} />
      </Box>
    </group>
  );
};
