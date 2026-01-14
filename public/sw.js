if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + ".js", n).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, c) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let t = {};
    const f = (e) => a(e, i),
      r = { module: { uri: i }, exports: t, require: f };
    s[i] = Promise.all(n.map((e) => r[e] || f(e))).then((e) => (c(...e), t));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/chunks/179-dff0320c50c6e9df.js",
          revision: "dff0320c50c6e9df",
        },
        {
          url: "/_next/static/chunks/323-7e685a4883521000.js",
          revision: "7e685a4883521000",
        },
        {
          url: "/_next/static/chunks/4bd1b696-01b4a2ffa8bac205.js",
          revision: "01b4a2ffa8bac205",
        },
        {
          url: "/_next/static/chunks/744-7b12a84a030f110f.js",
          revision: "7b12a84a030f110f",
        },
        {
          url: "/_next/static/chunks/772-b1f377246c5de474.js",
          revision: "b1f377246c5de474",
        },
        {
          url: "/_next/static/chunks/794-04ae375b04af3cdf.js",
          revision: "04ae375b04af3cdf",
        },
        {
          url: "/_next/static/chunks/93-06ac109206b61b99.js",
          revision: "06ac109206b61b99",
        },
        {
          url: "/_next/static/chunks/app/_global-error/page-f005ec62af4a6fe9.js",
          revision: "f005ec62af4a6fe9",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-9e6f0de39136aab9.js",
          revision: "9e6f0de39136aab9",
        },
        {
          url: "/_next/static/chunks/app/dashboard/page-232fc5d8da8d41b5.js",
          revision: "232fc5d8da8d41b5",
        },
        {
          url: "/_next/static/chunks/app/layout-50cc232958df7bcb.js",
          revision: "50cc232958df7bcb",
        },
        {
          url: "/_next/static/chunks/app/login/page-ee9e8a3bd68c448e.js",
          revision: "ee9e8a3bd68c448e",
        },
        {
          url: "/_next/static/chunks/app/page-843ac41c183b21f9.js",
          revision: "843ac41c183b21f9",
        },
        {
          url: "/_next/static/chunks/app/register/page-217f7c893565273f.js",
          revision: "217f7c893565273f",
        },
        {
          url: "/_next/static/chunks/framework-3311683cffde0ebf.js",
          revision: "3311683cffde0ebf",
        },
        {
          url: "/_next/static/chunks/main-1c218eba624a5b0b.js",
          revision: "1c218eba624a5b0b",
        },
        {
          url: "/_next/static/chunks/main-app-c61e27cb8e465623.js",
          revision: "c61e27cb8e465623",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/app-error-f005ec62af4a6fe9.js",
          revision: "f005ec62af4a6fe9",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/forbidden-f005ec62af4a6fe9.js",
          revision: "f005ec62af4a6fe9",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/global-error-888ceccc172d4dc7.js",
          revision: "888ceccc172d4dc7",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/not-found-f005ec62af4a6fe9.js",
          revision: "f005ec62af4a6fe9",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/unauthorized-f005ec62af4a6fe9.js",
          revision: "f005ec62af4a6fe9",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-b6d996bb3db25032.js",
          revision: "b6d996bb3db25032",
        },
        {
          url: "/_next/static/css/bc601973b617eabc.css",
          revision: "bc601973b617eabc",
        },
        {
          url: "/_next/static/media/4cf2300e9c8272f7-s.p.woff2",
          revision: "18bae71b1e1b2bb25321090a3b563103",
        },
        {
          url: "/_next/static/media/747892c23ea88013-s.woff2",
          revision: "a0761690ccf4441ace5cec893b82d4ab",
        },
        {
          url: "/_next/static/media/8d697b304b401681-s.woff2",
          revision: "cc728f6c0adb04da0dfcb0fc436a8ae5",
        },
        {
          url: "/_next/static/media/93f479601ee12b01-s.p.woff2",
          revision: "da83d5f06d825c5ae65b7cca706cb312",
        },
        {
          url: "/_next/static/media/9610d9e46709d722-s.woff2",
          revision: "7b7c0ef93df188a852344fc272fc096b",
        },
        {
          url: "/_next/static/media/ba015fad6dcf6784-s.woff2",
          revision: "8ea4f719af3312a055caf09f34c89a77",
        },
        {
          url: "/_next/static/oPrfqH72XIYBtldk06AEZ/_buildManifest.js",
          revision: "7c443adf89218ae92fd76a9d9e5a3d5e",
        },
        {
          url: "/_next/static/oPrfqH72XIYBtldk06AEZ/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        { url: "/file.svg", revision: "d09f95206c3fa0bb9bd9fefabfd0ea71" },
        { url: "/globe.svg", revision: "2aaafa6a49b6563925fe440891e32717" },
        {
          url: "/images/apple-icon-180.png",
          revision: "f90de24501b1907761c70cd22d2308f3",
        },
        {
          url: "/images/manifest-icon-512.maskable.png",
          revision: "b42036161113ce894ba25bbbc898f2e9",
        },
        {
          url: "/images/segarkosan_logo.png",
          revision: "0709632fd01165695870fa37d7c848ce",
        },
        { url: "/manifest.json", revision: "c6cb1a62d3172f2fe681553c900328bd" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        {
          url: "/screenshots/homepage.png",
          revision: "de8192e5d2d5241a821f04bb8bc26d25",
        },
        { url: "/vercel.svg", revision: "c0af2f507b369b085b35ef4bbe3bcf1e" },
        { url: "/window.svg", revision: "a2760511c65806022ad20adf74370ff3" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: n,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
