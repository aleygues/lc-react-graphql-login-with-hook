import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/auth.hook";

const GET_USERS = gql`
    query getUsers {
        users {
            id
            email
        }
    }
`;

function DashboardScreen(): JSX.Element {
    const { replace } = useHistory();
    const { data } = useQuery(GET_USERS);
    const { isConnected, signout, user } = useAuth();

    // should be move to the context
    const logout = async () => {
        await signout();
        replace('/home');
    };

    return (
        <>
            <h1>Dashboard</h1>
            Hello {user?.email}<br />
            {isConnected === true ? 'I\'m connected' : 'not connnected'}
            {data ? `Number of users: ${data.users.length}` : 'Fetching...'}
            <button onClick={logout}>logout</button>
        </>
    );
}

export default DashboardScreen;