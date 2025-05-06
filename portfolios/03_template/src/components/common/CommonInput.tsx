import { styled } from "styled-components";

export interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  ref?: React.Ref<HTMLInputElement>;
};

interface CommonInputStyleProps {
  $width: string;
  $isNone: boolean;
}

export default function CommonInput({
  type,
  name,
  placeholder = "",
  disabled = false,
  width = "11.625rem",
  value,
  onChange,
  ref,
}: CommonInputProps) {
  return (
    <InputStyle 
      type={type === "none" ? "text" : type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled || type === "none"}
      ref={ref}
      $width={width}
      $isNone={type === "none"}
    />
  );
};

const InputStyle = styled.input<CommonInputStyleProps>`
  font-size: 0.875rem;
  background-color: #fff;
  border: 1px solid #bbb;
  border-radius: 5px;
  display: inline-block;
  margin-bottom: 0.5rem;
  width: ${({ $width }) => $width};
  height: 2.5rem;
  margin-left: 0.75rem;

  &:disabled {
    background-color: ${({ $isNone }) => $isNone ? "#fff" : "#f8f8f8" };
  }
`;