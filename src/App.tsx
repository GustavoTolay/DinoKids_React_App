import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
const Contact = React.lazy(() => import("./pages/Contact"));
const Products = React.lazy(() => import("./pages/Products"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const AddCategory = React.lazy(() => import("./pages/AddCategory"));
const Editor = React.lazy(() => import("./pages/Editor"));
const Creator = React.lazy(() => import("./pages/Creator"));
const Home = React.lazy(() => import("./pages/Home"));
const SignIn = React.lazy(() => import("./pages/Signin"));
const LogIn = React.lazy(() => import("./pages/Login"));

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/category/:category'
          element={
            <Suspense fallback={""}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path='/'
          element={
            <Suspense fallback={""}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path='/login'
          element={
            <Suspense fallback={""}>
              <LogIn />
            </Suspense>
          }
        />
        <Route
          path='/signin'
          element={
            <Suspense fallback={""}>
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path='/product/:id'
          errorElement={
            <Suspense fallback={""}>
              <Home />
            </Suspense>
          }
          element={
            <Suspense fallback={""}>
              <Products />
            </Suspense>
          }
        />
        <Route
          path='/edititem/:id'
          element={
            <Suspense fallback={""}>
              <Editor />
            </Suspense>
          }
        />
        <Route
          path='/additem'
          element={
            <Suspense fallback={""}>
              <Creator />
            </Suspense>
          }
        />
        <Route
          path='/addcategory'
          element={
            <Suspense fallback={""}>
              <AddCategory />
            </Suspense>
          }
        />
        <Route
          path='/checkout'
          element={
            <Suspense fallback={""}>
              <Checkout />
            </Suspense>
          }
        />
        <Route
          path='/contact'
          element={
            <Suspense fallback={""}>
              <Contact />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
