import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'google';
    disabled?: boolean;
    onClick?: () => void;
    fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  ${props => {
        switch (props.variant) {
            case 'google':
                return `
          background: #fff;
          color: #333;
          border: 1px solid #ddd;
          &:hover:not(:disabled) {
            background: #f5f5f5;
            transform: translateY(-1px);
          }
        `;
            case 'secondary':
                return `
          background: #f8f9fa;
          color: #333;
          &:hover:not(:disabled) {
            background: #e9ecef;
            transform: translateY(-1px);
          }
        `;
            default:
                return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
        `;
        }
    }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const Button: React.FC<ButtonProps> = ({
    children,
    type = 'button',
    variant = 'primary',
    disabled = false,
    onClick,
    fullWidth = false,
}) => {
    return (
        <StyledButton
            type={type}
            variant={variant}
            disabled={disabled}
            onClick={onClick}
            fullWidth={fullWidth}
        >
            {children}
        </StyledButton>
    );
};

export default Button;