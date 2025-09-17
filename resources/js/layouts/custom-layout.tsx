import React from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import { type SharedData } from '@/types';
import Toast from '@/components/custom/toast';
import { logout } from '@/routes';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

export default function CustomLayout(
    { children }: { children: React.ReactNode }
) {
    const { auth, flash } = usePage<SharedData>().props;

    const { url }: { url: string } = usePage();

    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };


    console.log(usePage());

    return (
        <div
            className='w-full h-screen'
        >
            <header
                className='px-6 py-4 flex justify-between items-center bg-gradient-to-l from-gray-700 to-gray-900 shadow-md'
            >
                <Link href="/posts">
                    <p className='text-2xl font-bold text-gray-100 dark:text-gray-300'>
                        Logo
                    </p>
                </Link>

                <div className='flex gap-4'>
                    {auth.user ? (
                        <>
                            {url !== "/posts/create" && (
                                <Link
                                    href="/posts/create"
                                    className='px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg transition-colors duration-200'
                                >
                                    Create
                                </Link>
                            )}

                            <Link
                                href={logout()} as="button"
                                onClick={handleLogout}
                                className='px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg transition-colors duration-200'
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className='px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg transition-colors duration-200'
                        >
                            Login
                        </Link>
                    )}
                </div>
            </header>

            <main
                className='min-h-screen relative flex flex-col justify-center items-center'
            >
                {flash?.message && (
                    <Toast
                        style='bg-green-100 border border-green-400 text-green-700'
                        toastMSG={flash.message}
                    />
                )}

                {children}
            </main>

            <footer
                className='px-6 py-4 flex flex-1 justify-between items-center bg-gradient-to-l from-gray-700 to-gray-900 shadow-md'
            >
                <Link href="/about"
                    // preserveScroll
                    className="mt-4 text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
                    {new Date().toLocaleTimeString(
                        'en-IN', {
                        hour: 'numeric', minute: 'numeric', hour12: true
                    })}
                </Link>
            </footer>
        </div >
    )
}