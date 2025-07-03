import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL + "/todos/";

export const useTodo = () => {
    const [isLoading, setIsLoading] = useState(false);

    const createTodo = async (text: string) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${API_URL}`, { text }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setIsLoading(false);
            return res.data;
        } catch (err: any) {
            setIsLoading(false);
            const error = err.response?.data?.error || 'Internal Server Error';
            throw new Error(error);
        }
    };

    const getTodos = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            setIsLoading(false);
            const res = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return res.data;
        } catch (err: any) {
            setIsLoading(false);
            const message = err.response?.data?.error || 'Internal Server Error';
            throw new Error(message);
        }
    };

    const updateTodo = async (id: string, completed: boolean) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`${API_URL}${id}`, { completed }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return;
        } catch (err: any) {
            const message = err.response?.data?.error || 'Internal Server Error';
            throw new Error(message);
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        } catch (err: any) {
            const message = err.response?.data?.error || 'Internal Server Error';
            throw new Error(message);
        }
    }
    return { createTodo, getTodos, updateTodo, isLoading, deleteTodo };
};

