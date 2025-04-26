import {configureStore,combineReducers} from "@reduxjs/toolkit"

// =importing reduxers===========
import themeReducer from "./slices/themeSlice.js"
import userReducer from "./slices/userSlice.js"
import resourceReducer from "./slices/resourceSlice.js"
import searchReducer from "./slices/searchResourcesSlice.js"
import singleResourceReducer from "./slices/singleResourceSlice.js"

// === configs for  persistence=============
import {persistReducer, persistStore} from "redux-persist"
import sessionStorage from "redux-persist/lib/storage/session"

const persistConfig={
    key:"root",
    storage:sessionStorage,
    blacklist:"searchResource"
}

const rootReducer=combineReducers({
    theme:themeReducer,
    user:userReducer,
    resource:resourceReducer,
    searchResource:searchReducer,
    singleResource:singleResourceReducer
})


const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store=configureStore({reducer:persistedReducer
    ,
    middleware:getDefaultMiddleware=>getDefaultMiddleware({
        serializableCheck:false
    })
});

export const persistor=persistStore(store);
