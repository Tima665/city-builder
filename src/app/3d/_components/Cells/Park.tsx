import { Cone } from '@react-three/drei';
import { Cylinder } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';
import { BuildingComponentProps } from '../Building3D';

export const Park = ({ position }: Omit<BuildingComponentProps, 'colors'>) => {
  const treeRefs = useRef<Mesh[]>([]);

  // Select colors based on hovered state
  const TRUNK_COLOR = '#5D4037';
  const TREE_COLOR = '#2E7D32';

  return (
    <group position={position}>
      {/* Tree 1 - central, taller */}
      <group
        position={[0, 0, 0]}
        ref={(el: Mesh) => {
          if (el) treeRefs.current[0] = el;
        }}
      >
        {/* Trunk */}
        <Cylinder args={[0.03, 0.05, 0.2, 8]} position={[0, 0.1, 0]}>
          <meshStandardMaterial color={TRUNK_COLOR} />
        </Cylinder>

        {/* Crown layers */}
        <Cone args={[0.25, 0.3, 8]} position={[0, 0.35, 0]}>
          <meshStandardMaterial color={TREE_COLOR} opacity={0.8} />
        </Cone>
        <Cone args={[0.2, 0.25, 8]} position={[0, 0.55, 0]}>
          <meshStandardMaterial color={TREE_COLOR} opacity={0.8} />
        </Cone>
        <Cone args={[0.15, 0.2, 8]} position={[0, 0.7, 0]}>
          <meshStandardMaterial color={TREE_COLOR} opacity={0.8} />
        </Cone>
      </group>

      {/* Tree 2 - left */}
      <group
        position={[-0.25, 0, 0.2]}
        ref={(el: Mesh) => {
          if (el) treeRefs.current[1] = el;
        }}
      >
        {/* Trunk */}
        <Cylinder args={[0.02, 0.04, 0.15, 8]} position={[0, 0.075, 0]}>
          <meshStandardMaterial color={TRUNK_COLOR} />
        </Cylinder>

        {/* Crown layers */}
        <Cone args={[0.18, 0.25, 8]} position={[0, 0.25, 0]}>
          <meshStandardMaterial color={TREE_COLOR} />
        </Cone>
        <Cone args={[0.15, 0.2, 8]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color={TREE_COLOR} />
        </Cone>
        <Cone args={[0.1, 0.15, 8]} position={[0, 0.52, 0]}>
          <meshStandardMaterial color={TREE_COLOR} />
        </Cone>
      </group>

      {/* Tree 3 - right */}
      <group
        position={[0.25, 0, -0.2]}
        ref={(el: Mesh) => {
          if (el) treeRefs.current[2] = el;
        }}
      >
        {/* Trunk */}
        <Cylinder args={[0.025, 0.045, 0.17, 8]} position={[0, 0.085, 0]}>
          <meshStandardMaterial color={TRUNK_COLOR} />
        </Cylinder>

        {/* Crown layers */}
        <Cone args={[0.2, 0.27, 8]} position={[0, 0.27, 0]}>
          <meshStandardMaterial color={TREE_COLOR} />
        </Cone>
        <Cone args={[0.17, 0.22, 8]} position={[0, 0.45, 0]}>
          <meshStandardMaterial color={TREE_COLOR} />
        </Cone>
        <Cone args={[0.12, 0.17, 8]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color={TREE_COLOR} />
        </Cone>
      </group>
    </group>
  );
};
