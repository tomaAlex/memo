export const getEnumValues = <F extends Object>(
  enumFootprint: F,
): F[keyof F][] => {
  return Object.keys(enumFootprint).map(
    enumKey => enumFootprint[enumKey as keyof typeof enumFootprint],
  );
};
