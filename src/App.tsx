import { AuthProvider } from './hooks/auth.hook';
import Router from './Router';

function App() {
  return (
    <>
      {/* Making all auth information available to children */}
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
