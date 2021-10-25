import React, { Suspense } from "react";
import Header from "../../Components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy } from "react";
import ImageLoader from "../../Components/UI/ImageLoader/ImageLoader";

const Home = () => {
  const HomeBody = lazy(() => import("../../Components/HomeBody/HomeBody"));
  const CartSection = lazy(() =>
    import("../../Components/CartSection/CartSection")
  );
  return (
    <>
      <Router>
        <Suspense fallback={<ImageLoader />}>
          <Header />
          <Switch>
            <Route exact path="/" component={HomeBody} />
            <Route exact path="/cart-section" component={CartSection} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default Home;
