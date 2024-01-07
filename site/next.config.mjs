import nextMdx from '@next/mdx';
import withPlugins from 'next-compose-plugins';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const withMDX = nextMdx({
  extension: /.mdx?$/,
  options: {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkGfm],
    providerImportSource: '@mdx-js/react',
  },
});

const withSvgr = (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack(config, options) {
      config.module.rules.push({
        test: /.svg$/,
        use: ['@svgr/webpack'],
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  };
};

export default withPlugins([
  withMDX({
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  }),
  withSvgr,
]);
