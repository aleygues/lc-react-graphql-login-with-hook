import { gql, useMutation, useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";

const GET_ME = gql`
    query getMe {
        getMe {
            id
            email
        }
    }
`;

const SIGNIN = gql`
    mutation signin($email: String!, $password: String!) {
        signin(email: $email, password: $password)
    }
`;

const CREATE_USER = gql`
    mutation createUser($email: String!, $password: String!) {
        createUser(email: $email, password: $password) {
            id
            email
        }
    }
`;

export const AuthContext = createContext<{
    isConnected: boolean,
    user: { id: number, email: string } | null,
    signin: (email: string, password: string) => Promise<boolean>,
    signup: (email: string, password: string) => Promise<boolean>,
    signout: () => Promise<void>
} | null>(null);

export function AuthProvider({
    children
}: {
    children: JSX.Element | JSX.Element[]
}): JSX.Element {
    const [isConnected, setIsConnected] = useState(false);
    const [doSignin] = useMutation(SIGNIN);
    const [doCreateUser] = useMutation(CREATE_USER);
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
    const signin = async (email: string, password: string): Promise<boolean> => {
        try {
            const result = await doSignin({
                variables: {
                    email: email,
                    password: password
                }
            });
            if (result.data.signin) {
                // success
                localStorage.setItem('token', result.data.signin);
                await refetch();
                return true;
            } else {
                return false;
            }
        } catch {
            return false;
        }
    }

    const signup = async (email: string, password: string): Promise<boolean> => {
        try {
            await doCreateUser({
                variables: {
                    email: email,
                    password: password
                }
            });
            return true;
        } catch {
            return false;
        }
    };

    const signout = async (): Promise<void> => {
        localStorage.removeItem('token');
        refetch();
    };

    return (
        <AuthContext.Provider value={{
            isConnected,
            user: getMeData?.getMe,
            signin,
            signup,
            signout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const authContext = useContext(AuthContext);
    if (authContext) {
        return authContext;
    } else {
        throw new Error('auth_context_not_set');
    }
}