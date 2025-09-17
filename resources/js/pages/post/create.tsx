import React from 'react'
import CustomLayout from '@/layouts/custom-layout';
import { Loader2 } from 'lucide-react';
import { useForm } from '@inertiajs/react';

export default function PostCreate() {


    // Note - Add Inertia form Helper
    const {
        data,
        setData,
        post,
        errors,
        processing
    } = useForm({ body: '' });

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        await post("/posts", {
            preserveScroll: true,
            onSuccess: () => {
                setData('body', '');
            },
            onError: () => {
                if (errors.body) {
                    setData('body', '');
                }
            },
        });
    }


    return (
        <CustomLayout>
            <div
                className='w-full max-w-3xl p-4 md:p-10 bg-white/45 dark:bg-gradient-to-b from-gray-700 to-gray-900 shadow-md rounded-md'
            >
                <h1 className='text-xl text-center font-medium text-gray-500 dark:text-gray-300'>
                    Post
                </h1>

                <p className='text-sm text-center text-gray-500 dark:text-gray-400'>
                    Create a new post
                </p>

                {errors && (
                    <p className='text-sm text-red-600 dark:text-red-400 my-2'>
                        {errors?.body}
                    </p>
                )}

                <form
                    onSubmit={handleSubmit}
                    className='space-y-4'
                >
                    <label
                        htmlFor="body"
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                    >
                        Content
                    </label>
                    <textarea
                        value={data.body}
                        onChange={event => setData('body', event.target.value)}
                        cols={30}
                        rows={10}
                        className={`w-full border border-gray-400 p-2 rounded-md ${errors.body && '!border-red-500'}`}
                    />
                    <button
                        type="submit"
                        className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors duration-200'
                        disabled={processing}
                    >
                        {processing ? (
                            <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                            'Submit'
                        )}
                    </button>
                </form>
            </div>
        </CustomLayout>
    )
}

