export const generateSlug = (str: string): string => {
  let url: string = str.replace(/[\s]+/gi, '-');
  url = url
    .replace(/[^0-9a-zа-яё_\-]+/gi, '')
    .replace('---', '-')
    .replace('--', '-')
    .toLowerCase();

  return url;
};
