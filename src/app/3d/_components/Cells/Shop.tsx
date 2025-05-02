import { Box } from '@react-three/drei';
import { BuildingComponentProps } from '../Building3D';

export const Shop = ({ position, colors }: BuildingComponentProps) => {
  return (
    <group position={position}>
      {/* Main building */}
      <Box args={[0.8, 0.3, 0.6]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color={colors.main} />
      </Box>

      {/* Sign */}
      <Box args={[0.9, 0.1, 0.1]} position={[0, 0.35, 0.25]}>
        <meshStandardMaterial color={colors.roof} emissive={colors.roof} emissiveIntensity={0.3} />
      </Box>

      {/* Storefront */}
      <Box args={[0.6, 0.2, 0.05]} position={[0, 0.15, 0.31]}>
        <meshStandardMaterial color={colors.windows} transparent opacity={0.7} />
      </Box>
    </group>
  );
};
