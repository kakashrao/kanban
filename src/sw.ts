import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";
// import { registerRoute, Route } from "workbox-routing";
// import { CacheFirst } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();
clientsClaim();

// Cache Images
// const imageRoute = new Route(
//   ({ request, sameOrigin }) => {
//     return sameOrigin && request.url.includes("/assets/images");
//   },
//   new CacheFirst({
//     cacheName: "images",
//   })
// );

// registerRoute(imageRoute);
