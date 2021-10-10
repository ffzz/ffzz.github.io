import { useAuth } from "context/auth-context";
import UnauthenticatedApp from "unauthenticated-app";
import AuthenticatedApp from "authenticated-app";
import "App.css";
import ErrorBoundary from "components/error-boundary";
import { FullPageError } from "components/full-page-loading";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        {/* <AuthenticatedApp /> */}
      </ErrorBoundary>
    </div>
  );
}

export default App;
