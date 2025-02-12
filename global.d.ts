declare module "*.md" {
  const attributes: { [key: string]: any };
  const react: React.FC;
  export { attributes, react };
}
