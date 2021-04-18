import React, { lazy, ReactElement, Suspense, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { fetchRates } from "../../api";
import { appStore, AppStoreContext } from "../../stores/app";
const Converter = lazy(() => import(/* webpackChunkName: "Converter" */ "../Converter"));
const RatesTable = lazy(() => import(/* webpackChunkName: "RatesTable" */ "../RatesTable"));

export const App = observer(
  (): ReactElement => {
    const { to, setIsFetchingData, setFetchRatesResponse } = appStore;

    useEffect(() => {
      if (to) {
        setIsFetchingData(true);
        fetchRates(to).then((fetchRatesResponse) => {
          setIsFetchingData(false);
          return setFetchRatesResponse(fetchRatesResponse);
        });
      }
    }, [to]);

    return (
      <AppStoreContext.Provider value={appStore}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/converter">Converter</Link>
              </li>
              <li>
                <Link to="/rates">Rates</Link>
              </li>
            </ul>
            <Switch>
              <Route path="/converter">
                <Converter />
              </Route>
              <Route path="/rates">
                <RatesTable />
              </Route>
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AppStoreContext.Provider>
    );
  }
);
