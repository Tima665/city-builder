import { Box } from '@react-three/drei';
import { BuildingComponentProps } from '../Building3D';

export const SimpleHouse = ({ position, colors }: BuildingComponentProps) => {
  return (
    <group position={position}>
      {/* Main building */}
      <Box args={[0.7, 0.5, 0.5]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color={colors.main} />
      </Box>

      {/* Roof */}
      <Box args={[0.8, 0.2, 0.6]} position={[0, 0.6, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color={colors.roof} />
      </Box>

      {/* Windows */}
      <Box args={[0.15, 0.15, 0.05]} position={[0.2, 0.3, 0.26]}>
        <meshStandardMaterial color={colors.windows} />
      </Box>
      <Box args={[0.15, 0.15, 0.05]} position={[-0.2, 0.3, 0.26]}>
        <meshStandardMaterial color={colors.windows} />
      </Box>

      {/* Door */}
      <Box args={[0.15, 0.25, 0.05]} position={[0, 0.125, 0.26]}>
        <meshStandardMaterial color={colors.secondary} />
      </Box>
    </group>
  );
};
