import {configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";
import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from "redux-persist";
const persistConfig = {
  key: "root",
  version: 1,
  storage :storage.default || storage, // Use the default export of the storage module
};
const rootReducer = combineReducers({
  auth:authSlice,
  job:jobSlice,
  company:companySlice,
  application:applicationSlice
})
const persistedReducer = persistReducer(persistConfig,rootReducer);
const store = configureStore({
  reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
      getDefaultMiddleware({
        serializableCheck:{
          ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
        },
      }),
});
export default store;




// configure store is central brain like storage in that storage i took a part of storage and named
// as a authslice for authentication purpose in above reducer tells the action that auth:authSlice
// took some space for authentication 