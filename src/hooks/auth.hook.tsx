import { gql, useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";

const GET_ME = gql`
    query getMe {
        getMe {
            id
            email
        }
    }
`;

export const AuthContext = createContext<{
    isConnected: boolean,
    setIsConnected: Function,
    checkLogin: Function,
    user: { id: number, email: string } | null
}>({
    isConnected: false,
    setIsConnected: () => { },
    checkLogin: () => { },
    user: null
});

export function AuthProvider({
    children
}: {
    children: JSX.Element | JSX.Element[]
}): JSX.Element {
    const [isConnected, setIsConnected] = useState(false);

    const { data: getMeData, refetch } = useQuery(GET_ME);

    useEffect(() => {
        console.log("Connection status changed: ", !!getMeData);
        console.log("User data is: ", getMeData?.getMe);
        if (getMeData) {
            setIsConnected(true);
        } else {
            setIsConnected(false);
        }
    }, [getMeData]);

    // should add signin, signup and signout here

    return (
        <AuthContext.Provider value={{
            isConnected,
            setIsConnected,
            checkLogin: refetch,
            user: getMeData?.getMe
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const authContext = useContext(AuthContext);
    return authContext;
}