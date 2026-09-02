import React from 'react';
import styled from 'styled-components';

interface BadgeProps {
  variant: 'safe' | 'caution' | 'danger';
  children?: React.ReactNode;
}

const StyledBadge = styled.span<{ $variant: 'safe' | 'caution' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  background: ${({ $variant }) =>
    $variant === 'safe'
      ? 'var(--status-safe-bg)'
      : $variant === 'caution'
      ? 'var(--surface-amber)'
      : '#FEE2E2'};
  color: ${({ $variant }) =>
    $variant === 'safe' ? '#047857' : $variant === 'caution' ? '#B45309' : '#B91C1C'};
`;

const LABELS: Record<string, string> = {
  safe: '안전',
  caution: '주의',
  danger: '위험',
};

const Badge: React.FC<BadgeProps> = ({ variant, children }) => (
  <StyledBadge $variant={variant}>{children ?? LABELS[variant]}</StyledBadge>
);

export default Badge;
