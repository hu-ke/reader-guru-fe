import React, { ReactNode } from 'react';
import styled from 'styled-components'
import LoadingDots from './LoadingDots/index'

interface Props {
  children: ReactNode;
  size?: 'small' | 'medium'
  text?: boolean,
  onClick?: () => void,
  disabled?: boolean,
  loading?: boolean
}

const Btn = styled.button<{ $size?: string; $disabled?: boolean; }>`
  padding: .625em 1em;
  border: none;
  font-size: ${props => props.$size === 'small' ? '12px' : '16px'};
  background-color: ${props => props.$disabled ? props.theme.disabledBg : props.theme.blue};
  border-radius: 3px;
  color: ${props => props.$disabled ? props.theme.disabledColor : '#fff'};
  border-color: ${props => props.$disabled ? '#e4e8ee' : 'none'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${props => props.$disabled ? props.theme.disabledBg : props.theme.deepBlue};
  }
`

const BtnText = styled.span<{ $size?: string; }>`
  font-size: ${props => props.$size === 'small' ? '12px' : '16px'};
  color: ${props => props.theme.blue};
  cursor: pointer;
  &:hover {
    color: #1a7f64;
  }
`

const Button: React.FC<Props> = ({ children, size = 'medium', text, onClick, disabled=false, loading }) => {

  const onBtnClick = () => {
    if (!disabled && typeof onClick === 'function') {
      onClick()
    }
  }
  
  return text ? (
    <BtnText $size={size} onClick={onBtnClick}>{ children }</BtnText>
  ) : (
    <Btn $size={size} $disabled={disabled} onClick={onBtnClick}>
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
