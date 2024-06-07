import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import BookDetail from './pages/BookDetail'
import Introduction from './pages/Introduction'
import './index.css'
import NewBook from "./pages/NewBook.js";
import { Provider } from 'react-redux'
import store from './store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // {
      //   path: "/charlie-and-the-chocolate-factory-by-roald-dahl",
      //   element: <BookDetail />,
      // },
      {
        path: "introduction",
        element: <Introduction />
      },
      {
        path: "new-book",
        element: <NewBook />
      },
      {
        path: "mybooks/:bookname",
        element: <BookDetail />
      }
    ],
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)