module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/fourSchl/'
    : '/',
  chainWebpack: config => {
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();
  }
};
