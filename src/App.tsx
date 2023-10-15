import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const LogIn = lazy(() => import("./pages/Login"));
const SignIn = lazy(() => import("./pages/Singin"));
const Home = lazy(() => import("./pages/Home"));
const Editor = lazy(() => import("./pages/Editor"));
const Creator = lazy(() => import("./pages/Creator"));
const AddCategory = lazy(() => import("./pages/AddCategory"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Products = lazy(() => import("./pages/Products"));
const Contact = lazy(() => import("./pages/Contact"));

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
