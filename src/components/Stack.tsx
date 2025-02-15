import styled from "styled-components";
import { CSSProperties } from "react";
import { ColorKeys } from "../types/theme";

export interface StackProps {
  $justifyContent?: CSSProperties["justifyContent"];
  $alignItems?: CSSProperties["alignItems"];
  $gap?: CSSProperties["gap"];
  $flex?: CSSProperties["flex"];
  $background?: ColorKeys;
  $padding?: CSSProperties["padding"];
}

const BaseStack = styled.div<StackProps>`
  display: flex;
  ${({ $justifyContent }) =>
    $justifyContent ? `justify-content: ${$justifyContent}` : ""};
  ${({ $alignItems }) => ($alignItems ? `align-items: ${$alignItems}` : "")};
  ${({ $gap }) => ($gap ? `gap: ${$gap}` : "")};
  ${({ $flex }) => ($flex ? `flex: ${$flex}` : "")};
  ${({ $padding }) => ($padding ? `padding: ${$padding}` : "")};
  ${({ $background, theme }) =>
    $background ? `background: ${theme.light.color[$background]}` : ""};
`;

export const HStack = styled(BaseStack)``;

export const VStack = styled(BaseStack)`
  flex-direction: column;
`;
