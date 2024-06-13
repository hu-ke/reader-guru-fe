import React, { ReactNode } from 'react';
import styled from 'styled-components'
import LoadingDots from './LoadingDots/index'

type ButtonType = 'primary'|'secondary'|'normal'
interface Props {
  children: ReactNode;
  size?: 'small' | 'medium';
  text?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  danger?: boolean;
  type?: ButtonType;
}

const Btn = styled.button<{ $size?: string; $disabled?: boolean; $danger?: boolean; $type?: ButtonType }>`
  padding: .625em 1em;
  border: ${props => {
    if (props.$type === 'secondary') {
      return '1px solid'
    } else if (props.$type === 'normal') {
      return '1px solid'
    } else {
      return '1px solid'
    }
  }};
  font-size: ${props => props.$size === 'small' ? '12px' : '16px'};
  background-color: ${props => {
    if (props.$disabled) {
      return props.theme.disabledBg
    } else if (props.$type === 'normal') {
      return '#fff'
    } else if (props.$danger) {
      return props.theme.red
    } else if (props.$type === 'secondary') {
      return '#fff'
    }
    return props.theme.blue
  }};
  border-radius: 3px;
  color: ${props => {
    if (props.$disabled) {
      return props.theme.disabledColor;
    } else if (props.$type === 'normal') {
      return props.theme.normal
    } else if (props.$type === 'secondary') {
      return props.theme.blue
    }
    return '#fff'
  }};
  border-color: ${props => {
    if (props.$disabled) {
      return '#e4e8ee'
    } else if (props.$type === 'normal') {
      return props.theme.normal
    } else if (props.$type === 'secondary') {
      return props.theme.blue
    }
  }};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${props => {
      if (props.$disabled) {
        return props.theme.disabledBg
      } else if (props.$danger) {
        return props.theme.red;
      } else if (props.$type === 'primary') {
        return props.theme.deepBlue
      }
    }};
    opacity: ${props => {
      if (props.$danger) {
        return 0.5
      }
    }}
  }
`

const BtnText = styled.span<{ $size?: string; $disabled?: boolean; $danger?: boolean; }>`
  font-size: ${props => props.$size === 'small' ? '12px' : '16px'};
  color: ${props => props.theme.blue};
  cursor: pointer;
  &:hover {
    color: ${props => {
      return props.theme.deepBlue
    }};
  }
`

const Button: React.FC<Props> = ({ children, size = 'medium', text, onClick, disabled=false, loading, danger=false, type='primary' }) => {

  const onBtnClick = () => {
    if (!disabled && typeof onClick === 'function') {
      onClick()
    }
  }
  
  return text ? (
    <BtnText $size={size} $danger={danger} onClick={onBtnClick}>{ children }</BtnText>
  ) : (
    <Btn $size={size} $danger={danger} $disabled={disabled} $type={type} onClick={onBtnClick}>
      { children }
      {
        loading ? (
          <>
            &nbsp;
            <LoadingDots color="orange" />
          </>
        ) : ''
      }
    </Btn>
  )
}

export default Button;
