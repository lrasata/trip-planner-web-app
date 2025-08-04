import { fonts } from "./fonts.ts";

export const typography = {
  h1: {
    fontFamily: fonts.fontFamily,
    fontSize: fonts.fontSizes.xl,
    fontWeight: fonts.fontWeights.semibold,
    lineHeight: 1.25,
  },
  h2: {
    fontFamily: fonts.fontFamily,
    fontSize: fonts.fontSizes.lg,
    fontWeight: fonts.fontWeights.semibold,
    lineHeight: 1.25,
  },
  h3: {
    fontFamily: fonts.fontFamily,
    fontSize: fonts.fontSizes.md,
    fontWeight: fonts.fontWeights.medium,
    lineHeight: 1.4,
  },
  h4: {
    fontFamily: fonts.fontFamily,
    fontSize: fonts.fontSizes.base,
    fontWeight: fonts.fontWeights.medium,
    lineHeight: 1.4,
  },
  subtitle: {
    fontFamily: fonts.fontFamily,
    fontSize: fonts.fontSizes.sm,
    fontWeight: fonts.fontWeights.medium,
    lineHeight: 1.5,
  },
  body1: {
    fontFamily: fonts.fontFamily,
    fontSize: fonts.fontSizes.base,
    fontWeight: fonts.fontWeights.regular,
    lineHeight: 1.5,
  },
  label: {
    fontFamily: fonts.fontFamily,
    fontSize: fonts.fontSizes.sm,
    fontWeight: fonts.fontWeights.medium,
    lineHeight: 1.5,
  },
  caption: {
    fontFamily: fonts.fontFamily,
    fontSize: fonts.fontSizes.xs,
    fontWeight: fonts.fontWeights.regular,
    lineHeight: 1.4,
  },
  button: {
    fontFamily: fonts.fontFamily,
    fontSize: fonts.fontSizes.base,
    fontWeight: fonts.fontWeights.medium,
    lineHeight: "100%",
  },
};
