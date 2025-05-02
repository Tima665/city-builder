import { Box, Cylinder } from '@react-three/drei';
import { BuildingComponentProps } from '../Building3D';

export const Stadium = ({ position, colors }: BuildingComponentProps) => {
  return (
    <group position={position}>
      {/* Stadium base */}
      <Box args={[0.8, 0.1, 0.6]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color={colors.secondary} />
      </Box>

      {/* Field */}
      <Box args={[0.6, 0.05, 0.4]} position={[0, 0.13, 0]}>
        <meshStandardMaterial color={colors.roof} />
      </Box>

      {/* Field markings */}
      <Box args={[0.5, 0.005, 0.01]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#FFFFFF" />
      </Box>
      <Box args={[0.01, 0.005, 0.3]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#FFFFFF" />
      </Box>
      <Cylinder args={[0.06, 0.06, 0.005, 16]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#FFFFFF" />
      </Cylinder>

      {/* Stands */}
      <Box args={[0.7, 0.15, 0.05]} position={[0, 0.17, 0.22]}>
        <meshStandardMaterial color={colors.main} />
      </Box>
      <Box args={[0.7, 0.15, 0.05]} position={[0, 0.17, -0.22]}>
        <meshStandardMaterial color={colors.main} />
      </Box>
      <Box args={[0.05, 0.15, 0.5]} position={[0.33, 0.17, 0]}>
        <meshStandardMaterial color={colors.main} />
      </Box>
      <Box args={[0.05, 0.15, 0.5]} position={[-0.33, 0.17, 0]}>
        <meshStandardMaterial color={colors.main} />
      </Box>

      {/* Floodlights */}
      <Cylinder args={[0.01, 0.01, 0.3, 8]} position={[0.35, 0.35, 0.25]}>
        <meshStandardMaterial color="#A0A0A0" />
      </Cylinder>
      <Box args={[0.05, 0.05, 0.05]} position={[0.35, 0.5, 0.25]}>
        <meshStandardMaterial
          color={colors.windows}
          emissive={colors.windows}
          emissiveIntensity={0.5}
        />
      </Box>

      <Cylinder args={[0.01, 0.01, 0.3, 8]} position={[-0.35, 0.35, 0.25]}>
        <meshStandardMaterial color="#A0A0A0" />
      </Cylinder>
      <Box args={[0.05, 0.05, 0.05]} position={[-0.35, 0.5, 0.25]}>
        <meshStandardMaterial
          color={colors.windows}
          emissive={colors.windows}
          emissiveIntensity={0.5}
        />
      </Box>
    </group>
  );
};
