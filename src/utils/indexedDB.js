import { openDB } from 'idb';

const DB_NAME = 'shopDB';
const DB_VERSION = 1;
const CART_STORE = 'cart';
const SHIPPING_STORE = 'shipping';
const ORDERS_STORE = 'orders';

export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(CART_STORE)) {
          db.createObjectStore(CART_STORE, { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains(SHIPPING_STORE)) {
          db.createObjectStore(SHIPPING_STORE, { keyPath: 'id' });
        }
      },
    });
  };


  export const ensureOrdersStoreExists = async () => {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(ORDERS_STORE)) {
          db.createObjectStore(ORDERS_STORE, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
    return db;
  };
  

export const addItemToCart = async (item) => {
  const db = await initDB();
  await db.add(CART_STORE, item);
};

export const getCartItems = async () => {
  const db = await initDB();
  return db.getAll(CART_STORE);
};

export const updateCartItem = async (item) => {
  const db = await initDB();
  await db.put(CART_STORE, item);
};

export const deleteCartItem = async (id) => {
  const db = await initDB();
  await db.delete(CART_STORE, id);
};

export const getShippingCost = async () => {
  const db = await initDB();
  const shippingData = await db.getAll(SHIPPING_STORE);
  return shippingData[0]?.cost || 0;
};

export const saveOrder = async (order) => {
    const db = await ensureOrdersStoreExists();
    await db.add(ORDERS_STORE, order);
  };

export const clearCart = async () => {
  const db = await initDB();
  const tx = db.transaction(CART_STORE, 'readwrite');
  tx.store.clear();
  await tx.done;
};

