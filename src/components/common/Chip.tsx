import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import theme from "styles/theme";

type ChipPropsType = {
  type?: "primary" | "secondary";
  size?: "sm" | "md";
  active?: boolean;
};

export default function Chip({
  type = "primary",
  size = "md",
  active = false,
  children,
}: PropsWithChildren<ChipPropsType>) {
  const typography = {
    sm: theme.typography.body4,
    md: theme.typography.body3,
  };
  const sizeStyle = SIZES[size];
  const colorStyle = COLORS[type];

  return (
    <StyledChip
      active={active}
      sizeStyle={sizeStyle}
      colorStyle={colorStyle}
      typography={typography[size]}
    >
      {children}
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

  ${theme.typography.weightMedium};

  color: var(--chip-text-color);
  background-color: var(--chip-background-color);
  &:hover {
    color: ${theme.palette.colors.gray[600]};
    background-color: ${theme.palette.colors.primary[100]};
  }

  ${(p) => p.active && activeStyle}
`;
