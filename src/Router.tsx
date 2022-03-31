import { Redirect, Route } from 'react-router';
import { BrowserRouter } from "react-router-dom";
import { useAuth } from './hooks/auth.hook';
import DashboardScreen from './screens/Dashboard';
import HomeScreen from './screens/Home';
import SigninScreen from './screens/Signin';
import SignupScreen from './screens/Signup';

function Router(): JSX.Element {
    const { isConnected } = useAuth();

    return (
        <BrowserRouter>
            <Redirect exact path="/" to={isConnected ? '/dashboard' : '/home'} />
            <Route exact path="/signin">
                <SigninScreen></SigninScreen>
            </Route>
            <Route exact path="/signup">
                <SignupScreen></SignupScreen>
            </Route>
            <Route exact path="/home">
                <HomeScreen></HomeScreen>
            </Route>
            {isConnected && <Route exact path="/dashboard">
                <DashboardScreen></DashboardScreen>
            </Route>}
        </BrowserRouter>
    );
}

export default Router;