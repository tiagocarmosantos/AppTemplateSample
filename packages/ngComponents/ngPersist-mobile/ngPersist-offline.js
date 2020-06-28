// (function () {
  
//   'use strict';

  var window = self;

  function createOfflineData(filesToCache, ngPersistConfig) {

    return new Promise((resolve, reject) => { 

      // if ('indexedDB' in window) {
      //     createIndexedDB(ngPersistConfig.appDataName, filesToCache).then((resultIndexedDB) => {
      //         resolve(resultIndexedDB)
      //     }).catch(() => {
      //         reject(Error('OfflineData não criado!'))
      //     })
      // }

      createCacheDB(ngPersistConfig.appDataName, filesToCache).then((resultCache) => {
          resolve(resultCache)
      }).catch(() => {
          reject(Error('OfflineData não criado!'))
      })

    })

  }

  function retrieveOfflineData(key, ngPersistConfig) {

    return new Promise((resolve, reject) => { 

      // if ('indexedDB' in window) {
      //     retrieveIndexedDB(ngPersistConfig.appDataName, key).then((resultIndexedDB) => {
      //         resolve(resultIndexedDB)
      //     }).catch(() => {
      //         reject(Error('OfflineData não encontrado!'))
      //     })
      // }

      retrieveCacheDB(ngPersistConfig.appDataName, key).then((resultCache) => {
          resolve(resultCache)
      }).catch((error) => {
          reject(Error('OfflineData não encontrado!'))
          console.log(error)
      })

    })

  }

  function updateOfflineData(key, value, ngPersistConfig) {

    return new Promise((resolve, reject) => {

          // var responseObjectStore = createResponseObjectStore(key, value.clone())
          // if ('indexedDB' in window  && checkResponseType(responseObjectStore, ngPersistConfig.dynamicTypes)) {
          //     updateIndexedDB(ngPersistConfig.appDataName, key, value).then((resultIndexedDB) => {
          //         resolve(resultIndexedDB)
          //     }).catch(() => {
          //         reject(Error('OfflineData não atualizado!'))
          //     })
          // }

          updateCacheDB(ngPersistConfig.appDataName, key, value).then((resultCache) => {
              resolve(resultCache)
          }).catch((error) => {
              reject(Error('OfflineData não atualizado!'))
              console.log(error)
          })
    })
  }

  function deleteOfflineData(ngPersistConfig) {

    return new Promise((resolve, reject) => { 

      // if ('indexedDB' in window) {
      //     deleteIndexedDB(ngPersistConfig.appDataName).then((resultIndexedDB) => {
      //         resolve('OfflineData removido!')
      //     }).catch(() => {
      //         reject(Error('OfflineData não removido!'))
      //     })
      // }

      deleteCacheDB(ngPersistConfig.appDataName).then(() => {
          resolve('OfflineData removido!')
      }).catch(() => {
          reject(Error('OfflineData não removido!'))
      })

    })

  }

  function checkResponseType(responseObjectStore, dynamicORstaticTypes) {
    return (dynamicORstaticTypes.length != 0 ? (dynamicORstaticTypes.some((item) => { return responseObjectStore.Init.contentType.search(item) != -1 })) : false)
    //return true
  }

//})();