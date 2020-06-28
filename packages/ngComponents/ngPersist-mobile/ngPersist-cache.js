// (function () {
  
//   'use strict';

  function createCacheDB(cacheName, filesToCache) {
  	return caches.open(cacheName).then((cache) => {
        console.log('[ServiceWorker] Adding files to cache');
        return cache.addAll(filesToCache);
      })
  }

  function retrieveCacheDB(cacheName, key) {
  	return caches.match(key).then((value) => {
        if (typeof value === "undefined") {
          throw Error('CacheData não encontrado!')
        } else {
          return value
        }
    })
  }

  function updateCacheDB(cacheName, key, value) {
  	return caches.open(cacheName).then((cache) => {
  		cache.put(key, value.clone());
  		console.log('[ServiceWorker] Add file to cache');
  		return value;
  	})
  }

  function deleteCacheDB(cacheName) {
  	return caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          console.log('[ServiceWorker] Removing files from cache', key);
          if (key == cacheName) {
            return caches.delete(key);
          }
        }));
      })
  }

//})();