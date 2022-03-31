import { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/auth.hook";

function SignupScreen(): JSX.Element {
    const { replace } = useHistory();
    const [email, setEmail] = useState('jack@gmail.com');
    const [password, setPassword] = useState('supersecret');
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);

    const { signup } = useAuth();

    const onSubmit = async () => {
        // should be moved to the context
        setLoading(true);
        setFailed(false);
        if (await signup(email, password) === true) {
            // success
            replace('/');
        } else {
            setFailed(true);
        }
        setLoading(false);
    };

    return (
        <>
            <h1>Signup</h1>
            Email : <input type="text" value={email} onChange={e => setEmail(e.target.value)} /><br />
            Password : <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={onSubmit} disabled={loading}>Inscription</button>
            {failed && <p>Error</p>}
        </>
    );
}

export default SignupScreen;