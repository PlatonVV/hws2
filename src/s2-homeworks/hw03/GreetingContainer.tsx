import React, {ChangeEvent, Dispatch, KeyboardEvent, useState} from 'react';
import Greeting from './Greeting';
import {UserType} from './HW3';

type GreetingContainerPropsType = {
    users: UserType[];
    addUserCallback: (name: string) => void;
};

export const pureAddUser = (name: string, setError: Dispatch<string>, setName: Dispatch<string>, addUserCallback: (name: string) => void) => {
    if(name === '') {
        setError('Name is required');
    } else {
        setName(name)
        addUserCallback(name)
        setName('')
    }
};
export const pureOnBlur = (name: string, setError: Dispatch<string>) => {
    if(name === ''){
        setError('Name is required')
    }
};
export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: ()=> void) => {
    if(e.key === "Enter") {
        addUser()
    }
};

const GreetingContainer: React.FC<GreetingContainerPropsType> = ({users, addUserCallback}) => {
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string>('');

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value.trim());

        error && setError('');
    };
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback);
    };

    const onBlur = () => {
        pureOnBlur(name, setError);
    };

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser);
    };

    const totalUsers = users.length;
    const lastUserName = users[users.length - 1]?.name ?? null;
    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    );
};

export default GreetingContainer;
