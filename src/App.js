import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.rtl.css';
import Layout from './Views/Layout/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerPage from './Views/Pages/Customer/CustomerPage'
// import ProductPage from './Views/Pages/Product/ProductPage'
import InvoicePage from './Views/Pages/Invoice/InvoicePage'
import ProdcutListPage from './Views/Pages/Product/ProductList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CategoryPage from './Views/Pages/Category/CategoryPage';
import CategoryListPage from './Views/Pages/Category/CategoryListPage';
import React, { Suspense } from 'react';


import { useSelector } from 'react-redux';
import Loading from './Views/Pages/Shared/Loading';
import NotFound from './Views/Pages/Shared/NotFound';

const ProductPage = React.lazy(() => {
  return import('./Views/Pages/Product/ProductPage')
});


function App() {
  const { isShowLoading } = useSelector(state => state.config);

  return (
    <div>
      <ToastContainer />
      {
        isShowLoading ? <Loading /> : <></>
      }

      {
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/product" element={<Suspense fallback={<Loading />}>
                  <ProductPage />
                </Suspense>} />
                <Route path="/product/:productid" element={<ProductPage />} />
                <Route path="/category" element={<CategoryPage/>} />
                <Route path="/category/:categoryid" element={<CategoryPage/>} />
                <Route path="/categoryList" element={<CategoryListPage/>} />
                <Route path="/productlist" element={<ProdcutListPage />} />
                <Route path="/invoice" element={<InvoicePage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
      }

    </div>
  )
}

export default App;
