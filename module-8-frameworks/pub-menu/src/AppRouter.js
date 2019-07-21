import React from "react";
import {BrowserRouter as Router, Route, Link } from "react-router-dom";
import MenuDetails from "./MenuDetails";

function AppRouter() {
    return (
      <Router>
          <main>
            <article>
                <Link to="/menu-01">Menu 1</Link>
            </article>
            <article>
                <Link to="/menu-02">Menu 2</Link>
            </article>
        </main>

        <Route path="/:menu-id" component={MenuDetails} />
      </Router>  
    );
}

export default AppRouter;