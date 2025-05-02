import { Box, Cone } from '@react-three/drei';
import { BuildingComponentProps } from '../Building3D';

export const House = ({ position, colors }: BuildingComponentProps) => {
  return (
    <group position={position}>
      {/* Main building */}
      <Box args={[0.7, 0.4, 0.7]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color={colors.main} />
      </Box>

      {/* Roof */}
      <Cone args={[0.5, 0.3, 4]} position={[0, 0.55, 0]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial color={colors.roof} />
      </Cone>

      {/* Windows */}
      <Box args={[0.15, 0.15, 0.05]} position={[0.2, 0.25, 0.36]}>
        <meshStandardMaterial
          color={colors.windows}
          emissive={colors.windows}
          emissiveIntensity={0.3}
        />
      </Box>
      <Box args={[0.15, 0.15, 0.05]} position={[-0.2, 0.25, 0.36]}>
        <meshStandardMaterial
          color={colors.windows}
          emissive={colors.windows}
          emissiveIntensity={0.3}
        />
      </Box>

      {/* Door */}
      <Box args={[0.2, 0.25, 0.05]} position={[0, 0.125, 0.36]}>
        <meshStandardMaterial color={colors.secondary} />
      </Box>
    </group>
  );
};
