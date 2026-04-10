# blog.daku10.dev

Astro-based static blog.

## Development

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
pnpm build
```

Static files are generated into `out/`.

## Cloudflare Pages

The current production deployment can continue to use the static `out/` directory.

## Cloudflare Workers

This repository includes a minimal `wrangler.jsonc` so the same `out/` directory can be served from Workers Static Assets during a staged migration from Pages.

Preview locally with Workers:

```bash
pnpm preview:workers
```

The suggested migration flow is:

1. Keep Pages as-is.
2. Build and verify the Workers deployment on `*.workers.dev`.
3. Switch the custom domain after the Workers deployment is confirmed.
4. Remove Pages only after the new route is stable.

Deployment is expected to run in Cloudflare Workers Builds or another CI environment rather than from a local machine.
