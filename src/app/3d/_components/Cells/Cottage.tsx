import { Box, Cylinder, Cone } from '@react-three/drei';
import { BuildingComponentProps } from '../Building3D';

export const Cottage = ({ position, colors }: BuildingComponentProps) => {
  return (
    <group position={position}>
      {/* Main building */}
      <Box args={[0.65, 0.35, 0.55]} position={[0, 0.175, 0]}>
        <meshStandardMaterial color={colors.main} />
      </Box>

      {/* Roof */}
      <Box args={[0.75, 0.05, 0.65]} position={[0, 0.375, 0]}>
        <meshStandardMaterial color={colors.roof} />
      </Box>
      <Box args={[0.75, 0.25, 0.05]} position={[0, 0.4, 0.3]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color={colors.roof} />
      </Box>
      <Box args={[0.75, 0.25, 0.05]} position={[0, 0.4, -0.3]} rotation={[-Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color={colors.roof} />
      </Box>
      <Box args={[0.05, 0.25, 0.65]} position={[0.35, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color={colors.roof} />
      </Box>
      <Box args={[0.05, 0.25, 0.65]} position={[-0.35, 0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <meshStandardMaterial color={colors.roof} />
      </Box>

      {/* Chimney */}
      <Box args={[0.1, 0.3, 0.1]} position={[0.2, 0.5, 0]}>
        <meshStandardMaterial color={colors.secondary} />
      </Box>

      {/* Windows */}
      <Box args={[0.15, 0.15, 0.05]} position={[0.2, 0.2, 0.28]}>
        <meshStandardMaterial
          color={colors.windows}
          emissive={colors.windows}
          emissiveIntensity={0.3}
        />
      </Box>
      <Box args={[0.15, 0.15, 0.05]} position={[-0.2, 0.2, 0.28]}>
        <meshStandardMaterial
          color={colors.windows}
          emissive={colors.windows}
          emissiveIntensity={0.3}
        />
      </Box>

      {/* Windows at the back */}
      <Box args={[0.15, 0.15, 0.05]} position={[0.15, 0.2, -0.28]}>
        <meshStandardMaterial
          color={colors.windows}
          emissive={colors.windows}
          emissiveIntensity={0.3}
        />
      </Box>

      {/* Door */}
      <Box args={[0.2, 0.25, 0.02]} position={[0, 0.125, 0.29]}>
        <meshStandardMaterial color={colors.secondary} />
      </Box>

      {/* Porch */}
      <Box args={[0.3, 0.05, 0.1]} position={[0, 0.025, 0.35]}>
        <meshStandardMaterial color={colors.roof} />
      </Box>
      <Box args={[0.05, 0.1, 0.05]} position={[0.12, 0.08, 0.35]}>
        <meshStandardMaterial color={colors.secondary} />
      </Box>
      <Box args={[0.05, 0.1, 0.05]} position={[-0.12, 0.08, 0.35]}>
        <meshStandardMaterial color={colors.secondary} />
      </Box>

      {/* Fence */}
      {Array.from({ length: 6 }).map((_, i) => {
        const offset = -0.5 + i * 0.2;
        return (
          <Box key={`fence-${i}`} args={[0.02, 0.1, 0.02]} position={[offset, 0.05, 0.45]}>
            <meshStandardMaterial color={colors.secondary} />
          </Box>
        );
      })}
      <Box args={[1.0, 0.02, 0.02]} position={[0, 0.09, 0.45]}>
        <meshStandardMaterial color={colors.secondary} />
      </Box>

      {/* Tree */}
      <Cylinder args={[0.02, 0.02, 0.15, 8]} position={[0.45, 0.09, 0.45]}>
        <meshStandardMaterial color="#5D4037" />
      </Cylinder>
      <Cone args={[0.1, 0.2, 8]} position={[0.45, 0.2, 0.45]}>
        <meshStandardMaterial color="#2E7D32" />
      </Cone>

      {/* Bushes */}
      <group position={[-0.4, 0.06, 0.4]}>
        <mesh>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#388E3C" />
        </mesh>
      </group>
    </group>
  );
};
