import React from 'react';
import { Post } from '@/helper/ts-interface';
import CustomLayout from '@/layouts/custom-layout';
import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import DelPostBtn from '@/components/custom/del-post-btn';

export default function PostShow({ post }: { post: Post }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <CustomLayout>
            <div className='w-full max-w-5xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200'>
                <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 pb-4 border-b border-gray-100 dark:border-gray-700'>
                    @{auth.user?.name}
                </h1>

                <p className='mt-4 text-base leading-relaxed text-gray-800 dark:text-gray-200 mb-4'>
                    {post.body}
                </p>

                <div className='flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700'>
                    <p className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                        {new Date(post.created_at).toLocaleDateString()} <span className='ml-2'>at {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </p>

                    <div className='flex items-center gap-x-2 font-semibold'>
                        <Link
                            href={`/posts/${post.id}/edit`}
                            className='text-sm bg-green-500 hover:bg-green-600 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200'
                        >
                            Edit
                        </Link>

                        <DelPostBtn post={post} />
                    </div>
                </div>
            </div>
        </CustomLayout>
    );
}