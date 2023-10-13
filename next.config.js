const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: 'olegtabachnikow',
        mongodb_password: 's0PXFLAKpIx4DWWd',
        mongodb_clustername: 'mystudycluster',
        mongodb_database: 'items',
      },
    };
  }
  return {
    reactStrictMode: true,
    env: {
      mongodb_username: 'olegtabachnikow',
      mongodb_password: 's0PXFLAKpIx4DWWd',
      mongodb_clustername: 'mystudycluster',
      mongodb_database: 'messages',
    },
  };
};
