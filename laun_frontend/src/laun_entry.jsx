import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import LaunApp from "./LaunApp"
import launAuthReducer from "./laun_store/laun_auth_slice"
import "./laun_styles/laun_global.css"

const rootElement = document.getElementById("root")

const launStore = configureStore({
  reducer: {
    launAuth: launAuthReducer,
  },
})

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={launStore}>
        <BrowserRouter>
          <LaunApp />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
}
