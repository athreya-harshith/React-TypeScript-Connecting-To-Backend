import React, { useEffect, useState } from 'react'
import userService, { User } from '../services/user-service';
import { CanceledError, AxiosError } from 'axios';

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // for fethching all the users
    useEffect(() => {
        (async function iife() {
            try {
                setIsLoading(true);
                let res = await userService.getAll<User>().fetch();
                setUsers(res.data);
            } catch (error) {
                setIsLoading(false);
                if (error instanceof CanceledError) return;
                setError((error as AxiosError).message);
            }
            setIsLoading(false);
        })();
        return () => userService.getAll<User>().controller.abort(); // returns a function doesnot calls it
    }, []);

    return { users, error, isLoading, setError, setIsLoading, setUsers }
}

export default useUsers
