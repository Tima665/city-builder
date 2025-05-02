import { Cylinder } from '@react-three/drei';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { BuildingComponentProps } from '../Building3D';
import { Group } from 'three';
import { Box } from '@react-three/drei';

export const Road = ({ position }: Omit<BuildingComponentProps, 'colors'>) => {
  const carRef = useRef<Group>(null);
  const car2Ref = useRef<Group>(null);

  // Car movement animation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (carRef.current) {
      // First car moves along Z axis within the cell
      const carPosition = ((time * 0.3) % 1) * 0.6 - 0.3; // Movement from -0.3 to 0.3
      carRef.current.position.z = carPosition;
    }

    if (car2Ref.current) {
      // Second car moves in the opposite direction within the cell
      const car2Position = 0.3 - ((time * 0.2) % 1) * 0.6; // Movement from 0.3 to -0.3
      car2Ref.current.position.z = car2Position;
    }
  });

  return (
    <group position={position}>
      {/* Road base - asphalt */}
      <Box args={[0.9, 0.02, 0.9]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#424242" roughness={0.8} />
      </Box>

      {/* Vertical markings - dotted line */}
      {[-0.3, -0.1, 0.1, 0.3].map((z, i) => (
        <Box key={`line-${i}`} args={[0.02, 0.01, 0.05]} position={[0, 0.02, z]}>
          <meshStandardMaterial color="#FFFFFF" />
        </Box>
      ))}

      {/* First car - moves along Z axis */}
      <group ref={carRef} position={[-0.25, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Body */}
        <Box args={[0.12, 0.05, 0.06]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#E53935" metalness={0.6} roughness={0.3} />
        </Box>

        {/* Roof */}
        <Box args={[0.07, 0.04, 0.06]} position={[0, 0.045, 0]}>
          <meshStandardMaterial color="#C62828" metalness={0.6} roughness={0.3} />
        </Box>

        {/* Wheels */}
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[0.04, -0.025, 0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[0.04, -0.025, -0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[-0.04, -0.025, 0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[-0.04, -0.025, -0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
      </group>

      {/* Second car - moves along Z axis */}
      <group ref={car2Ref} position={[0.25, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Body */}
        <Box args={[0.12, 0.05, 0.06]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#2196F3" metalness={0.6} roughness={0.3} />
        </Box>

        {/* Roof */}
        <Box args={[0.07, 0.04, 0.06]} position={[0, 0.045, 0]}>
          <meshStandardMaterial color="#1565C0" metalness={0.6} roughness={0.3} />
        </Box>

        {/* Wheels */}
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[0.04, -0.025, 0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[0.04, -0.025, -0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[-0.04, -0.025, 0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
        <Cylinder
          args={[0.02, 0.02, 0.02, 8]}
          position={[-0.04, -0.025, -0.03]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#212121" />
        </Cylinder>
      </group>
    </group>
  );
};
