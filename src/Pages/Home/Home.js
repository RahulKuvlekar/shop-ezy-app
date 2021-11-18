import React, { Suspense } from "react";
import Header from "../../Components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy } from "react";
import ImageLoader from "../../Components/UI/ImageLoader/ImageLoader";
import Toast from "../../Components/UI/Toast/Toast";

const Home = () => {
  const HomeBody = lazy(() => import("../../Components/HomeBody/HomeBody"));
  const CartSection = lazy(() =>
    import("../../Components/CartSection/CartSection")
  );
  const Login = lazy(() => import("../Login/Login"));
  const SignUp = lazy(() => import("../SignUp/SignUp"));
  const OrderHistory = lazy(() => import("../OrderHistory/OrderHistory"));
  const ViewProduct = lazy(() =>
    import("../../Components/ViewProduct/ViewProduct")
  );

  return (
    <>
      <Router>
        <Suspense fallback={<ImageLoader />}>
          <Toast position="top-left" autoDeleteInterval="4000" />
          <Header />
          <Switch>
            <Route exact path="/" component={HomeBody} />
            <Route exact path="/cart-section" component={CartSection} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/order-history" component={OrderHistory} />
            <Route path="/product/:productId" component={ViewProduct} />
            <Route>
              <h1 style={{ margin: "6rem" }}>Error Page Not Found</h1>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default Home;
