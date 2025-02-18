export const getImageSrc = (image: string) => {
  return image.includes("assets/") ? `/static/${image}` : image;
};
