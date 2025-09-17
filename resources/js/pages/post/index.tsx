// pages/post/index.tsx
import CustomLayout from '@/layouts/custom-layout';
import { Post, PostsResponse } from '@/helper/ts-interface';
import Paginate from '@/components/custom/paginate';
import { Link, Head } from '@inertiajs/react';

export default function PostIndex({ posts }: { posts: PostsResponse }) {

    return (
        <>
            <Head title='Posts' />
            <CustomLayout>
                <div className='my-6 space-y-6 max-w-7xl mx-auto px-4'>
                    {posts.data.map((post: Post) => (
                        <div
                            key={post.id}
                            className='w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200'
                        >
                            <Link
                                href={`/posts/${post.id}`}
                                className='block mb-4'
                            >
                                <p className='text-base leading-relaxed text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200'>
                                    {post.body}
                                </p>
                            </Link>

                            <div className='flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700'>
                                <p className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                                    {new Date(post.created_at).toLocaleDateString()} <span className='ml-2'>at {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </p>
                                <div className='flex items-center gap-x-2'>
                                    <span className='text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full'>
                                        ID: {post.id}
                                    </span>

                                    <Link
                                        href={`/posts/${post.id}/edit`}
                                        className='text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20'
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className='w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm'>
                        <Paginate
                            links={posts.links}
                            style='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors duration-200'
                            key={posts.links[0].label}
                        />
                    </div>
                </div>
            </CustomLayout>
        </>
    )
}