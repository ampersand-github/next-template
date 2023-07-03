/**
 * @public
 */
export const convertDataUrlToFile = async (
  dataURL: string,
  filename: string,
  type: "image/png" | "image/jpeg"
): Promise<File> => {
  const blob = await (await fetch(dataURL)).blob();
  return new File([blob], filename, { type: type });
};
