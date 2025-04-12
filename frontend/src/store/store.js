import {configureStore} from "@reduxjs/toolkit"
import themeReducer from "./slices/themeSlice"
const rootReducer={
    "theme":themeReducer
}

export const store=configureStore({reducer:rootReducer});
