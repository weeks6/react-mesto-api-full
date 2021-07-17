import { Route, Redirect } from "react-router-dom";
import { getAccessToken } from "../utils/auth";

function ProtectedRoute({
  path,
  exact,
  children
}) {

  const isLoggedIn = getAccessToken()

  return (
    <Route
      path={path}
      exact={exact}
      render={() => (
        isLoggedIn ? children : <Redirect to="/sign-in" />
      )}
    />
  )
}

export default ProtectedRoute
