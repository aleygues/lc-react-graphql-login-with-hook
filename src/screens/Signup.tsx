import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router";
import gql from "graphql-tag";

const CREATE_USER = gql`
    mutation createUser($email: String!, $password: String!) {
        createUser(email: $email, password: $password) {
            id
            email
        }
    }
`;

function SignupScreen(): JSX.Element {
    const { replace } = useHistory();
    const [email, setEmail] = useState('jack@gmail.com');
    const [password, setPassword] = useState('supersecret');
    const [doCreateUser, { loading, error }] = useMutation(CREATE_USER);

    const onSubmit = async () => {
        // should be moved to the context
        await doCreateUser({
            variables: {
                email: email,
                password: password
            }
        });
        // success
        replace('/');
    };

    return (
        <>
            <h1>Signup</h1>
            Email : <input type="text" value={email} onChange={e => setEmail(e.target.value)} /><br />
            Password : <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={onSubmit} disabled={loading === true}>Inscription</button>
            {error && <p>Error</p>}
        </>
    );
}

export default SignupScreen;