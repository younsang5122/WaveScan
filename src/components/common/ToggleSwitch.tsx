import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  position: relative;
  width: 50px;
  height: 28px;
  flex-shrink: 0;
  display: inline-block;
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

const Track = styled.div`
  position: absolute;
  inset: 0;
  background: #cbd5e1;
  border-radius: 14px;
  transition: var(--ease);
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    width: 22px;
    height: 22px;
    left: 3px;
    top: 3px;
    background: white;
    border-radius: 50%;
    transition: var(--ease);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  ${Input}:checked + & {
    background: var(--color-primary);
  }

  ${Input}:checked + &::before {
    transform: translateX(22px);
  }

  ${Input}:disabled + & {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  'aria-label'?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  id,
  'aria-label': ariaLabel,
}) => (
  <Label>
    <Input
      type="checkbox"
      id={id}
      checked={checked}
      disabled={disabled}
      aria-label={ariaLabel}
      onChange={(e) => onChange(e.target.checked)}
    />
    <Track />
  </Label>
);

export default ToggleSwitch;
