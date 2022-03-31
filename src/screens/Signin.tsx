import { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/auth.hook";

function SigninScreen(): JSX.Element {
    const { replace } = useHistory();
    const [email, setEmail] = useState('jack@gmail.com');
    const [password, setPassword] = useState('supersecret');
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);
    const { signin } = useAuth();

    const onSubmit = async () => {
        setFailed(false);
        setLoading(true);
        if (await signin(email, password) === true) {
            replace('/dashboard');
            return;
        } else {
            setFailed(true);
        }
        setLoading(false);
    };

    return (
        <>
            <h1>Login</h1>
            Email : <input type="text" value={email} onChange={e => setEmail(e.target.value)} /><br />
            Password : <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={onSubmit} disabled={loading}>Connexion</button>
            {failed && <p>You failed</p>}
        </>
    );
}

export default SigninScreen;