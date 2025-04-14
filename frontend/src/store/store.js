import {configureStore,combineReducers} from "@reduxjs/toolkit"
import themeReducer from "./slices/themeSlice.js"
import userReducer from "./slices/userSlice.js"
import resourceReducer from "./slices/resourceSlice.js"

import {persistReducer, persistStore} from "redux-persist"
import sessionStorage from "redux-persist/lib/storage/session"

const persistConfig={
    key:"root",
    storage:sessionStorage
}

const rootReducer=combineReducers({
    theme:themeReducer,
    user:userReducer,
    resource:resourceReducer
})


const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store=configureStore({reducer:persistedReducer
    ,
    middleware:getDefaultMiddleware=>getDefaultMiddleware({
        serializableCheck:false
    })
});

export const persistor=persistStore(store);
