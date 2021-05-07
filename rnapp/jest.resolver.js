module.exports = (request, options) => {
  if (request && request.startsWith('react')) {
    // Always resolve react to app dir (must not resolve to different versions)
    return options.defaultResolver(request, {
      ...options,
      basedir: process.cwd(),
    });
  }
  try {
    return options.defaultResolver(request, options);
  } catch (e) {
    // Try to resolve from app base directory
    return options.defaultResolver(request, {
      ...options,
      basedir: process.cwd(),
    });
  }
};
