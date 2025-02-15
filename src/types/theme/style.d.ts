import "styled-components";
import { ColorTypes, FontTypes } from "./ThemeTypes";

/**
 * Theme 재정의
 */
declare module "styled-components" {
  export interface DefaultTheme {
    color: ColorTypes;
    font: FontTypes;
  }
}
