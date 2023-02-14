import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import theme from "styles/theme";
import Icon from "./Icon";

type InputPropsType = {
  id?: string;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any;
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  helpText?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  onPrefixIconClick?: Function;
  onSuffixIconClick?: Function;
  focusMode?: boolean;
};

const IconButton = ({
  icon,
  onClick,
  type,
}: {
  icon: string;
  onClick: Function;
  type: "prefix" | "suffix";
}) => {
  const style = {
    paddingRight: "0px",
    paddingLeft: "0px",
  };
  if (type === "prefix") {
    style.paddingRight = "8px";
  }
  return (
    <StyledIconButton onClick={() => onClick()} style={style}>
      <Icon icon={icon} size="sm" />
    </StyledIconButton>
  );
};

export default function Input({
  className,
  value,
  placeholder = "필드를 입력해주세요.",
  width,
  height,
  label,
  helpText,
  disabled = false,
  prefixIcon,
  onPrefixIconClick,
  suffixIcon,
  onSuffixIconClick,
  focusMode,
  ...props
}: InputPropsType): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(focusMode);

  let inputClassName = `${className ?? ""}`;
  if (disabled) {
    inputClassName += " disabled-input";
  }
  if (isFocused) {
    inputClassName += " focused-input";
  }

  // TODO: focus가 잡힐 때도 있고 안 잡힐 때도 있음. 문제 해결 필요
  useEffect(() => {
    if (focusMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, focusMode]);

  return (
    <LabelField disabled={disabled}>
      {label && <div className="label">{label}</div>}
      <InputWrapper className={inputClassName} style={{ width, height }}>
        {prefixIcon &&
          (onPrefixIconClick ? (
            <IconButton
              type="prefix"
              icon={prefixIcon}
              onClick={onPrefixIconClick}
            />
          ) : (
            <Icon icon={prefixIcon} size="sm" />
          ))}
        <StyledInput
          id="search-input"
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {suffixIcon &&
          (onSuffixIconClick ? (
            <IconButton
              type="suffix"
              icon={suffixIcon}
              onClick={onSuffixIconClick}
            />
          ) : (
            <Icon icon={suffixIcon} size="sm" />
          ))}
      </InputWrapper>
      {helpText && <div className="helpText">{helpText}</div>}
    </LabelField>
  );
}

export const LabelField = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  .label {
    ${theme.typography.body3}
    ${theme.typography.weightMedium}
     color: ${(p) =>
      p?.disabled
        ? theme.palette.colors.gray[300]
        : theme.palette.colors.basic.black}
  }
  .helpText {
    ${theme.typography.body4}
    ${theme.typography.weightRegular}
    color: ${(p) =>
      p?.disabled
        ? theme.palette.colors.gray[300]
        : theme.palette.colors.gray[500]};
  }

  .focused-input {
    border: 1px solid ${theme.palette.colors.gray[500]};
  }
  .disabled-input {
    background-color: ${theme.palette.colors.gray[50]};
    border: 1px solid ${theme.palette.colors.gray[200]};
    color: ${theme.palette.colors.gray[400]};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 16px;
  border: 1px solid ${theme.palette.colors.gray[300]};
  border-radius: 5px;
  background-color: #fff;
`;

const StyledInput = styled.input`
  ${theme.typography.body3}
  ${theme.typography.weightRegular}

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  display: flex;
  align-items: center;
  color: ${theme.palette.colors.basic.black};
  box-sizing: border-box;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  width: 100%;

  ::placeholder {
    color: ${theme.palette.colors.gray[400]};
  }
`;

const StyledIconButton = styled.button`
  background-color: transparent;
`;
