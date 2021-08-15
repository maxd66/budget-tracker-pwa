// TODO: setup indexedDb connection and create an object store for saving
// transaction data when the user is offline.

function saveRecord(record) {
  // TODO: this function should save a transaction object to indexedDB so that
  // it can be synced with the database when the user goes back online.
  const request = window.indexedDB.open("transactions", 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    const store = db.createObjectStore("transactions", {
      keyPath: "date",
    });
  };

  request.onsuccess = () => {
    const db = request.result;
    const tx = db.transaction(["transactions"], "readwrite");
    const txStore = tx.objectStore("transactions");

    txStore.add(record);
  };
}

function checkDatabase() {
  // TODO: this function should check for any saved transactions and post them
  // all to the database. Delete the transactions from IndexedDB if the post
  // request is successful.
  const request = window.indexedDB.open("transactions", 1);
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);
