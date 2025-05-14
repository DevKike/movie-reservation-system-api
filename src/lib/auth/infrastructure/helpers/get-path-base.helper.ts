export const getPathBase = (currentPath: string): string => {
  const segments = currentPath.split('/').filter(Boolean);

  if (segments.length > 1) {
    return '/' + segments.slice(0, -1).join('/');
  }

  return segments.length > 0 ? `/${segments[0]}` : '';
};
