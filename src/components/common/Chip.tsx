import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import theme from "styles/theme";
import Icon from "./Icon";

type ChipPropsType = {
  className?: string;
  type?: "primary" | "secondary";
  size?: "sm" | "md";
  active?: boolean;
  prefixIcon?: string | null;
  prefixIconColor?: string | null;
  suffixIcon?: string | null;
  suffixIconColor?: string | null;
  onClick?: Function;
  style?: Object;
};

export default function Chip({
  className,
  type = "primary",
  size = "md",
  active = false,
  prefixIcon,
  prefixIconColor,
  suffixIcon,
  suffixIconColor,
  onClick,
  style,
  children,
}: PropsWithChildren<ChipPropsType>) {
  const typography = {
    sm: theme.typography.body4,
    md: theme.typography.body3,
  };
  const sizeStyle = SIZES[size];
  const colorStyle = COLORS[type];
  const IconSize = size === "md" ? "sm" : "xs";

  return (
    <StyledChip
      className={className}
      active={active}
      sizeStyle={sizeStyle}
      colorStyle={colorStyle}
      typography={typography[size]}
      onClick={() => {
        if (typeof onClick === "function") {
          onClick();
        }
      }}
      style={style}
      prefixIconColor={prefixIconColor}
      suffixIconColor={suffixIconColor}
    >
      {prefixIcon && (
        <Icon className="prefix-icon" icon={prefixIcon} size={IconSize} />
      )}
      {children}
      {suffixIcon && (
        <Icon className="suffix-icon" icon={suffixIcon} size={IconSize} />
      )}
    </StyledChip>
  );
}

const COLORS = {
  primary: css`
    --chip-background-color: ${theme.palette.colors.gray[200]};
    --chip-text-color: ${theme.palette.colors.gray[500]};
  `,
  secondary: css`
    --chip-background-color: ${theme.palette.colors.basic.white};
    --chip-text-color: ${theme.palette.colors.gray[500]};
  `,
};

const SIZES = {
  sm: css`
    --chip-padding: 2px 8px;
  `,
  md: css`
    --chip-padding: 6px 12px;
  `,
};

const activeStyle = css`
  color: ${theme.palette.colors.basic["white"]};
  background-color: ${theme.palette.colors.primary[500]};
  &:hover {
    color: ${theme.palette.colors.basic["white"]};
    background-color: ${theme.palette.colors.primary[500]};
  }
`;

const StyledChip = styled.div<{
  colorStyle: SerializedStyles;
  sizeStyle: SerializedStyles;
  typography: SerializedStyles;
  prefixIconColor?: string | null;
  suffixIconColor?: string | null;
  active: boolean;
}>`
  ${(p) => p.colorStyle}
  ${(p) => p.sizeStyle}
  ${(p) => p.typography}

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: var(--chip-padding);
  gap: 4px;
  border-radius: 15.5px;
  white-space: nowrap;

  ${theme.typography.weightMedium};

  color: var(--chip-text-color);
  background-color: var(--chip-background-color);
  &:hover {
    color: ${theme.palette.colors.gray[600]};
    background-color: ${theme.palette.colors.primary[100]};
  }

  .prefix-icon {
    path {
      fill: ${(p) => p.prefixIconColor};
    }
  }
  .suffix-icon {
    path {
      fill: ${(p) => p.suffixIconColor};
    }
  }

  ${(p) => p.active && activeStyle}
`;
