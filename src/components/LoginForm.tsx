import { HttpStatusCode } from 'axios';
import { FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Input from '@/common/Input';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/utils/api-client';
import { useSetAtom } from 'jotai';
import userAtom from '@/user';

export default function LoginForm() {
    const [credentials, setCredentials] = useState({
        email: 'lajoui.zakariae.1@gmail.com',
        password: '1234',
        remember: true,
    });

    const setUser = useSetAtom(userAtom);

    const navigate = useNavigate();

    const { isPending, mutate } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (credentials: any) => {
            const { status } = await apiClient.get(
                'http://localhost:8000/sanctum/csrf-cookie',
            );

            if (status === HttpStatusCode.NoContent) {
                const { status, data } = await apiClient.post(
                    'http://localhost:8000/login',
                    credentials,
                );

                if (status === HttpStatusCode.Ok) {
                    setUser(data);
                    navigate('/dashboard');
                }
            }
        },
    });

    const submitHanler = (ev: FormEvent) => {
        ev.preventDefault();
        mutate(credentials);
    };

    return (
        <form className="space-y-6" onSubmit={submitHanler}>
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-slate-50"
                >
                    Email address
                </label>
                <div className="mt-1">
                    <Input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="example@gmail.com"
                        autoComplete="email"
                        // required
                        variant="sm"
                        value={credentials.email}
                        onChange={(ev) =>
                            setCredentials((prev) => ({
                                ...prev,
                                email: ev.target.value,
                            }))
                        }
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-slate-50"
                >
                    Password
                </label>
                <div className="mt-1">
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="********"
                        autoComplete="current-password"
                        variant="sm"
                        // required
                        value={credentials.password}
                        onChange={(ev) =>
                            setCredentials((prev) => ({
                                ...prev,
                                password: ev.target.value,
                            }))
                        }
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={credentials.remember}
                        onChange={(ev) =>
                            setCredentials((prev) => ({
                                ...prev,
                                remember: ev.target.checked,
                            }))
                        }
                    />
                    <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900 dark:text-slate-50"
                    >
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    {/* <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot your password?
                                </a> */}
                </div>
            </div>

            <div>
                {isPending ? (
                    <p className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100">
                        Signing in...
                    </p>
                ) : (
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign in
                    </button>
                )}
            </div>
        </form>
    );
}
