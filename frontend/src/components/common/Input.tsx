import React from 'react';
import styled from 'styled-components';

interface InputProps {
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    error?: string;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#e74c3c' : '#e1e5e9'};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  background: #fff;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e74c3c' : '#667eea'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(231, 76, 60, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
  }

  &:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #e74c3c;
  font-weight: 500;
`;

const Input: React.FC<InputProps> = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    disabled = false,
    required = false,
    label,
    error,
}) => {
    return (
        <InputContainer>
            {label && <Label>{label}{required && ' *'}</Label>}
            <StyledInput
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                hasError={!!error}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputContainer>
    );
};

export default Input;