import "./src/env.mjs";

const withBundleAnalyzer =
  process.env.ANALYZE === "true"
    ? async (config) => {
        const { default: analyzer } = await import("@next/bundle-analyzer");
        return analyzer({
          enabled: true,
        })(config);
      }
    : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

export default withBundleAnalyzer(nextConfig);
