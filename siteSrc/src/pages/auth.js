import React, { useState } from 'react';
import SignIn from '../components/signIn';
import { useCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';

const Auth = ({ history }) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ cookies, setCookies ] = useCookies(['user']);

    return (
        <SignIn 
            username={username}
            password={password}
            onChange={(event) => {
                switch(event.target.name) {
                    case 'username':
                        setUsername(event.target.value);
                        break;
                    case 'password':
                        setPassword(event.target.value);
                        break;
                    default:
                        console.error('Wrong event target name '+event.target.name)
                }
            }}
            onSend={() => {
                fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                }).then((response) => {
                    if(response.ok) {
                        response.json().then(
                            (value) => {
                                setCookies('user', value.user);
                                history.push('/users');
                            }
                        )
                    }
                });
            }}
        />
    )
}

export default withRouter(Auth);