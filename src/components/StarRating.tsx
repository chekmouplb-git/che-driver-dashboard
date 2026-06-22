'use client';

interface StarRatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ value, max = 5, size = 'md' }: StarRatingProps) {
  const sizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };
  return (
    <span className={`inline-flex gap-0.5 ${sizes[size]}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{ color: i < Math.round(value) ? '#F59E0B' : '#CBD5E1' }}>
          ★
        </span>
      ))}
    </span>
  );
}
