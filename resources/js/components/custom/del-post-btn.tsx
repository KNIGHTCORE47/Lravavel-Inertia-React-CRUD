import React from 'react';
import { Post } from '@/helper/ts-interface';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';


export default function DelPostBtn(
    { post }: { post: Post }
) {
    const { delete: destroy, processing } = useForm();

    function handleDelete() {
        destroy(`/posts/${post.id}`);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type='button'
                    className='text-sm bg-red-500 hover:bg-red-600 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200'
                    disabled={processing}
                >
                    {processing ? 'Deleting...' : 'Delete'}
                </button>
            </DialogTrigger>

            <DialogContent className='sm:max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'>
                <div className='flex items-center space-x-3 mb-4'>
                    <div className='flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center'>
                        <svg className='w-5 h-5 text-red-600 dark:text-red-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' />
                        </svg>
                    </div>
                    <div>
                        <DialogTitle className='text-lg font-semibold text-gray-900 dark:text-white'>
                            Delete Post
                        </DialogTitle>
                        <DialogDescription className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                            Are you sure you want to delete this post? This action cannot be undone.
                        </DialogDescription>
                    </div>
                </div>

                <div className='bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg mb-4'>
                    <p className='text-sm text-gray-700 dark:text-gray-300 line-clamp-3'>
                        "{post.body.length > 100 ? post.body.substring(0, 100) + '...' : post.body}"
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>
                        Post ID: {post.id}
                    </p>
                </div>

                <DialogFooter className='flex flex-col-reverse sm:flex-row sm:justify-end gap-2'>
                    <DialogClose asChild>
                        <button
                            type='button'
                            className='w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200'
                            disabled={processing}
                        >
                            Cancel
                        </button>
                    </DialogClose>

                    <button
                        type='button'
                        onClick={handleDelete}
                        className='w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <svg className='w-4 h-4 mr-2 animate-spin inline' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 12a8 8 0 018-8v8H4z' />
                                </svg>
                                Deleting...
                            </>
                        ) : (
                            'Delete Post'
                        )}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
