import AppLogoIcon from '@/components/app-logo-icon';
import CustomLayout from '@/layouts/custom-layout';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';


// Note - Define interface for props
interface NameProps {
    name: string
}

export default function index({ name }: NameProps) {
    const { auth } = usePage<SharedData>().props;

    const loggedInUser = auth.user ? auth.user.name : 'Guest';

    return (
        <>
            <CustomLayout>
                <div className='flex items-center gap-x-4'>
                    <h1
                        className='text-3xl font-medium leading-tight tracking-tight text-gray-800 dark:text-gray-100 sm:text-4xl md:text-5xl'
                    >
                        From About
                    </h1>

                    <AppLogoIcon className="size-12 fill-current p-1 text-white dark:text-black bg-amber-700 rounded-md" />
                </div>

                <p className='text-xl font-medium text-gray-500 dark:text-gray-400'>Welcome <span className='text-amber-700'>@{name ?? loggedInUser}</span></p>

            </CustomLayout>
        </>
    )
}

{/* NOTE - (Local Usage)
    Add CustomLayout component using Wrapping or
    
    
    index.layout = page => <CustomLayout children={index}/>

    export default index
*/ }
