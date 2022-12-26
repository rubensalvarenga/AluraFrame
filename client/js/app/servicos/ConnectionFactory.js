var stores = ['negociacoes'];
var version = 4;
var dbName = 'aluraframe';

class ConnectionFactory{
    constructor(){
        throw new Error ('Não é possível criar instancias de COnnectioFactory');
    }

    static getConnection(){
        return new Promise((resolve, reject) = e => {
            let openRequest = windows.indexedDB.open(dbName,version);

            openRequest.onupgradeneeded = e => {
             
                ConnectionFactory._createStores(e.target.result);
            };

            openRequest.onsuccess = e =>{
                resolve(e.target.result);

            };

            openRequest.onerror = e =>{

                console.log(e.target.error);
                reject(e.target.error.name);

            };

        });

    }
        static _createStores(connection){
            stores.forEach(store => {
                if( connection.ObjectStoreNames.contains(store)) connection.deleteObjectStore(store);

                    connection.createObjectStore(store, {increment})
            });
    
        }

 

}


