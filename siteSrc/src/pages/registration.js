import React, { useState } from 'react';
import SignUp from '../components/signUp';
import { useCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';

const Registration = ({ history }) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ cookies, setCookies ] = useCookies(['user']);

    return (
        <SignUp
            username={username}
            password={password}
            email={email}
            onChange={(event) => {
                let value = event.target.value;
                switch(event.target.name) {
                    case 'username':
                        setUsername(value);
                        break;
                    case 'password':
                        setPassword(value);
                        break;
                    case 'email':
                        setEmail(value);
                        break;
                    default: 
                        console.error('Wront event target name '+event.target.name);
                }
            }}
            onSend={() => {
                fetch('/api/newUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email,
                    }),
                }).then(response => {
                    if(response.ok) {
                        response.json().then(value => {
                                setCookies('user', value.user);
                                history.push('/users')
                            }
                        );
                    }
                })
            }}
        />
    );
}

export default withRouter(Registration);