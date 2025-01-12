export type SizeType =
  | "lg"
  | "md"
  | "sm"
  | "xl"
  | "xs"
  | "xxl"
  | "xxs"
  | "none";

type PaddingType = Record<"paddingHorizontal" | "paddingVertical", SizeType>;

type PaddingSizesType = Exclude<SizeType, "xxl" | "xxs">;

export type PaddingSizesObjectType = Record<PaddingSizesType, PaddingType>;
