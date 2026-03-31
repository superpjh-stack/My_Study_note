'use client';

import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: string;
  top: string;
  size: number;
  color: string;
  animClass: string;
}

const PETAL_COLORS = ['#FBCFE8', '#F9A8D4', '#E9D5FF', '#FDE68A', '#FCE7F3'];
const ANIM_CLASSES = [
  'cherry-petal-1',
  'cherry-petal-2',
  'cherry-petal-3',
  'cherry-petal-4',
  'cherry-petal-5',
];

interface CherryBlossomParticlesProps {
  count?: number;
}

export function CherryBlossomParticles({ count = 5 }: CherryBlossomParticlesProps) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}vw`,
      top: '0px',
      size: 8 + Math.random() * 7,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      animClass: ANIM_CLASSES[i % ANIM_CLASSES.length],
    }));
    setPetals(generated);

    // 애니메이션 완료 후 DOM에서 제거 (최대 지속시간 + delay = 4s)
    const timer = setTimeout(() => setVisible(false), 4500);
    return () => clearTimeout(timer);
  }, [count]);

  if (!visible) return null;

  return (
    <>
      {petals.map((petal) => (
        <span
          key={petal.id}
          className={`cherry-petal ${petal.animClass}`}
          style={{
            left: petal.left,
            top: petal.top,
            width: petal.size,
            height: petal.size * 0.75,
            backgroundColor: petal.color,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
