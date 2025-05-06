import styled from "styled-components";
import theme from "../../theme";
import { ColorType } from "../../types/styled.type";
import { transition02 } from "../../styles/mixins.style";

interface BtnProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  color?: ColorType;
  size?: "ssm" | "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}

export default function CommonBtn({ children, type, color = "primary", size="md", disabled, onClick }: BtnProps) {
  return (
    <CommonBtnStyle
      type={type}
      $color={color}
      $size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </CommonBtnStyle>
  );
}

const CommonBtnStyle = styled.button<{ $color: ColorType; $size: string; }>`
  color: ${({ $color }) => theme.color[$color]};
  background-color: #fff;
  border: 1px solid;
  border-color: ${({ $color }) => theme.color[$color]};
  border-radius: 5px;
  ${transition02};
  cursor: pointer;

  ${({ $size }) => {
    switch ($size) {
      case "ssm":
        return `
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        `;
      case "sm":
        return `
          padding: 0.25rem 0.625rem;
          font-size: 1rem;
        `;
      case "md":
        return `
          padding: 0.375rem 1rem;
          font-size: 1rem;
          font-weight: 700;
        `;
    }
  }};

  &:hover {
    color: #fff;
    background-color: ${({ $color }) => theme.color[$color]};
  }
`;