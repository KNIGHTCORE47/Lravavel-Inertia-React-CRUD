// components/custom/paginate.tsx
import { Link } from '@inertiajs/react';
import React from 'react';
import { PaginationLink } from '@/helper/ts-interface';

interface PaginateProps {
    links: PaginationLink[];
    style?: string;
}

export default function Paginate({ links, style }: PaginateProps) {
    return (
        <nav className='flex items-center justify-center space-x-1 flex-wrap gap-y-2' aria-label="Pagination">
            {links.map((link: PaginationLink, index: number) => {
                const isNumeric = !isNaN(Number(link.label));
                const isPrevNext = link.label.includes('Previous') || link.label.includes('Next');

                if (link.url) {
                    return (
                        <Link
                            key={`${link.label}-${index}`}
                            href={link.url}
                            className={`
                                inline-flex items-center justify-center min-w-[40px] h-10 text-sm font-medium rounded-lg border transition-all duration-200 hover:scale-105
                                ${isPrevNext ? 'px-4' : 'px-3'}
                                ${link.active
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-lg shadow-blue-600/25'
                                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm hover:shadow-md'
                                }
                            `}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                } else {
                    return (
                        <span
                            key={`${link.label}-${index}`}
                            className={`
                                inline-flex items-center justify-center min-w-[40px] h-10 text-sm font-medium rounded-lg border cursor-not-allowed
                                ${isPrevNext ? 'px-4' : 'px-3'}
                                text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-50
                            `}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }
            })}
        </nav>
    )
}

// Updated usage in pages/post/index.tsx
// Remove the key prop when calling Paginate:
// <Paginate links={posts.links} />