import './App.scss';
import {useState} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CONFIG } from './config/Config';
import {
  CategoryHeader,
  Navbar,
  Profile,
  ShoppingCart,
  AddDeliveryAddress,
  Footer,
  ProductDetails,
  Dashboard,
  Login
} from './components';
import { STATIC_DATA } from './config/StaticData';
import Products from './components/Products/Products';
import React from 'react';


function App() {
  const {
    ROUTES: {
      DEFAULT,
      DASHBOARD,
      PROFILE,
      PRODUCT_DETAILS,
      SHOPPING_CART,
      ADD_DELIVERY_ADDRESS,
      PRODUCTS,      
    },
    CATEGORY_HEADER_NOT_AVAILABLE_ROUTES,
  } = CONFIG;
  const {
    ENGLISH: {
      App: { CATEGORIES },
    },
  } = STATIC_DATA;

  const getCategories = () => {
    return Object.keys(CATEGORIES);
  };

  const isCategoryHeaderAvailable = () => {
    return !CATEGORY_HEADER_NOT_AVAILABLE_ROUTES.includes(
      window.location.pathname
    );
  };

  

  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className='App'>
      <Navbar />
      {isCategoryHeaderAvailable() ? (
        <CategoryHeader categories={getCategories()} />
      ) : null}

{showLoginModal && (
        <Login onCloseLoginModalClick={() => {
          setShowLoginModal(false);
        }}/>
      )}

<button
            onClick={() => {
              setShowLoginModal(true);
            }}
          >
            Show Modal
          </button>
      <Switch>
        <Route
          exact
          path={DEFAULT}
          render={() => <Redirect to={DASHBOARD}></Redirect>}
        ></Route>
        <Route path={DASHBOARD} component={Dashboard}></Route>
        <Route path={PROFILE}>
          <Profile />
        </Route>
        <Route path={SHOPPING_CART}>
          <ShoppingCart />
        </Route>
        <Route path={ADD_DELIVERY_ADDRESS}>
          <AddDeliveryAddress />
        </Route>
        <Route path={PRODUCT_DETAILS}>
          <ProductDetails></ProductDetails>
        </Route>
        <Route path={PRODUCTS} component={Products}></Route>    
      </Switch>
      
      
      <Footer />
    </div>
  );
}

export default App;
