import { Cylinder } from '@react-three/drei';

import { Box } from '@react-three/drei';
import { BuildingComponentProps } from '../Building3D';

export const Factory = ({ position, colors }: BuildingComponentProps) => {
  return (
    <group position={position}>
      {/* Main building */}
      <Box args={[0.7, 0.4, 0.8]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color={colors.main} />
      </Box>

      {/* Chimney */}
      <Cylinder args={[0.1, 0.1, 0.6, 8]} position={[0.25, 0.5, 0.25]}>
        <meshStandardMaterial color={colors.secondary} />
      </Cylinder>

      {/* Windows */}
      <Box args={[0.4, 0.1, 0.05]} position={[0, 0.2, 0.41]}>
        <meshStandardMaterial color={colors.windows} />
      </Box>
    </group>
  );
};
