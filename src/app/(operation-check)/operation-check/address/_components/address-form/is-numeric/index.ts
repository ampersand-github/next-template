export const isNumeric = (value: string): boolean => {
  const onlyNumberRegex = new RegExp(/^[0-9]*$/);
  return onlyNumberRegex.test(value);
};
