import styled, { CSSProperties } from "styled-components";

import type { ColorKeys, FontKeys } from "../types/theme";

export interface TypographyProps {
  children: string | number;
  size?: FontKeys;
  color?: ColorKeys;
  weight?: CSSProperties["fontWeight"];
}

export const Typography = ({
  children,
  size = "Body",
  color = "text",
  weight = "normal",
}: TypographyProps) => {
  return (
    <>
      <Text $size={size} $color={color} $weight={weight}>
        {children}
      </Text>
    </>
  );
};

interface TextProps {
  $size: TypographyProps["size"];
  $color: TypographyProps["color"];
  $weight: TypographyProps["weight"];
}

const Text = styled.p<TextProps>`
  font-size: ${({ theme, $size }) => theme.font[$size!]};
  color: ${({ theme, $color }) => theme.color[$color!]};
  font-weight: ${({ $weight }) => $weight};
`;
