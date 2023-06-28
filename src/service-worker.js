self.addEventListener("install", e => {
	e.waitUntil(
		caches.open("static").then(cache => {
			return cache.addAll(["/"]);
		})
	);
});

self.addEventListener("activate", e => {
	//console.log(`Intercepting fetch request for: ${e.request.url}`);
	// console.log("sw has been activated");
});

// self.addEventListener("fetch", e => {
// 	//console.log(`Intercepting fetch request for: ${e.request.url}`);
	
// });