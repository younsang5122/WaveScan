import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'default' | 'sm';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export interface ButtonLinkProps extends Omit<ButtonProps, 'onClick' | 'type'> {
  to: string;
}

const baseStyles = css<{ $variant: ButtonVariant; $size: ButtonSize; $fullWidth: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 20px;
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: ${({ $size }) => ($size === 'sm' ? '13px' : '15px')};
  font-weight: 700;
  height: ${({ $size }) => ($size === 'sm' ? '40px' : '52px')};
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: var(--ease);
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  letter-spacing: -0.2px;
  box-sizing: border-box;
  border-radius: ${({ $size }) => ($size === 'sm' ? 'var(--radius-sm)' : 'var(--radius-md)')};

  ${({ $variant }) =>
    $variant === 'primary' &&
    css`
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
      color: white;
      box-shadow: 0 4px 16px rgba(0, 138, 147, 0.3);
      &:hover:not(:disabled),
      &:active:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(0, 138, 147, 0.4);
      }
    `}

  ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      background: var(--surface-mint);
      color: var(--color-primary-dark);
      border: 1.5px solid rgba(0, 138, 147, 0.2);
      &:hover:not(:disabled) {
        background: rgba(0, 138, 147, 0.15);
      }
    `}

  ${({ $variant }) =>
    $variant === 'outline' &&
    css`
      background: transparent;
      color: var(--color-primary);
      border: 1.5px solid var(--color-primary);
    `}

  ${({ $variant }) =>
    $variant === 'ghost' &&
    css`
      background: #f1f5f9;
      color: var(--text-secondary);
      border: 1.5px solid var(--border-color);
    `}

  ${({ $variant }) =>
    $variant === 'danger' &&
    css`
      background: #fef2f2;
      color: #dc2626;
      border: 1.5px solid rgba(220, 38, 38, 0.2);
      &:hover:not(:disabled) {
        background: #dc2626;
        color: white;
      }
    `}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  ${baseStyles}
`;

const StyledLink = styled(Link)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  ${baseStyles}
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'default',
  fullWidth = true,
  disabled = false,
  onClick,
  type = 'button',
  children,
  className,
  style,
  id,
}) => (
  <StyledButton
    $variant={variant}
    $size={size}
    $fullWidth={fullWidth}
    disabled={disabled}
    onClick={onClick}
    type={type}
    className={className}
    style={style}
    id={id}
  >
    {children}
  </StyledButton>
);

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  to,
  variant = 'primary',
  size = 'default',
  fullWidth = true,
  children,
  className,
  style,
  id,
}) => (
  <StyledLink
    to={to}
    $variant={variant}
    $size={size}
    $fullWidth={fullWidth}
    className={className}
    style={style}
    id={id}
  >
    {children}
  </StyledLink>
);

export default Button;
