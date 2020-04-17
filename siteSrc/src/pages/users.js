import React, { useState, useEffect, useCallback } from 'react';
import UserTable from '../components/userTable';
import { useCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom';

const Users = ({history}) => {
    const [selected, setSelected] = useState({});
    const [allSelect, setAllSelect] = useState(false);
    const [users, setUsers] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const reqUsers = useCallback(
        () => {
            fetch('/api/users').then((response => {
                if (response.ok) {
                    response.json().then(value => {
                        setUsers(value);
                    });
                }
            }))
        }, []
    );
    const onClickAction = useCallback(
        (actionType = 'block') => {
            let sendUsers = [];
            for(let i=0; i<users.length; i++) {
                if(selected[users[i].id]) {
                    sendUsers = [...sendUsers, users[i].id];
                }
            }
            return fetch(
                '/api/users',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({
                        action: actionType,
                        user: cookies.user,
                        users: sendUsers,
                    })
                },
            );
        }, [cookies.user, selected, users]
    );
    const redirect = useCallback(
        (selected, response) => {
            let action = () => {
                removeCookie('user');
                history.push('/');
            }
            console.log(selected);
            if (response.ok) {
                if(selected[cookies.user]) {
                    action();
                }
            } else {
                action();
            }
        }, [history, cookies.user, removeCookie]
    );

    useEffect(() => {
        reqUsers();
    }, [reqUsers]);

    return (
        <UserTable 
            users={users}
            selectedUsers={selected}
            toggleSelect={(id) => {
                let buffer = {...selected};
                buffer[id] = !buffer[id];
                setAllSelect(false);
                setSelected(buffer);
            }}
            allSelect={allSelect}
            toggleAllSelect={
                () => {
                    let selectedUsers = {};
                    if(!allSelect) {
                        for(let i=0; i<users.length; i++) {
                            selectedUsers[users[i].id]=true;
                        }
                    } 
                    setSelected(selectedUsers);
                    setAllSelect(!allSelect);
                }
            }
            onBlock={() => {
                console.log('block');
                onClickAction('block').then(
                    (response) => {
                        redirect(selected, response);
                        reqUsers();
                    });
            }}
            onUnblock={() => {
                onClickAction('unblock').then((response) => {
                    redirect([], response);
                    reqUsers();
                })
            }}
            onDelete={() => {
                onClickAction('delete').then(
                    (response) => {
                        redirect(selected, response);
                        reqUsers();
                    }
                )
            }}
        />
    );
}

export default withRouter(Users);