import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ProtectedRoute({ component: Component, ...props }) {
  const context = React.useContext(CurrentUserContext);
  return (
    <Route>
      {() =>
        context.loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  );
};

export default ProtectedRoute;
