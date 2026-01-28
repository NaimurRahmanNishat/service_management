// src/redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import serviceReducer from "./features/service/serviceSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

/* ================= PERSIST CONFIG ================= */

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken", "isAuthenticated"],
};

const servicePersistConfig = {
  key: "service",
  storage,
  whitelist: ["selectedService", "selectedBookingType", "bookingDetails"],
};

/* ================= PERSISTED REDUCERS ================= */

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer
);

const persistedServiceReducer = persistReducer(
  servicePersistConfig,
  serviceReducer
);

/* ================= STORE ================= */

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    service: persistedServiceReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});

/* ================= PERSISTOR ================= */

export const persistor = persistStore(store);

/* ================= TYPES ================= */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
