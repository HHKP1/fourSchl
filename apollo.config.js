// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'four-school',
        // URL to the GraphQL API
        url: 'http://localhost:3000/graphql',
      },
      // Files processed by the extension
      includes: [
        './imports/**/*.js',
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }