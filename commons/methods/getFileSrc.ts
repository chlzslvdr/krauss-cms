export const getFileSrc = (file: string) => {
  return file.includes("assets/") ? `/static/${file}` : file;
};
