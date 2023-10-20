'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useState } from 'react';

export default function Page({ params }: { params: { slug: string[] } }) {
    console.log(params);

    const [currentSlug, setCurrentSlug] = useState(params.slug.join('/'));

    const router = useRouter();
    const goBack = () => {
        router.back();
        console.log('go back');
    }

    const concatenateSlug = () => {
        const newSlug = currentSlug.split('/').slice(0, -1).join('/');
        setCurrentSlug(newSlug);
        router.replace(`/${newSlug}`);
    }

    return (
        <main className=' flex flex-col items-center content-around min-h-screen p-3  w-full'>
            <div>my link : {currentSlug}</div>
            {
                params.slug.map((slug, index) => (
                    <Link className='flex flex-col '
                        key={index} href={`/${slug}`}>{slug}</Link>
                ))
            }
            <button className=' bg-white rounded-2xl shadow-md  shadow-grey-600 mt-10 flex items-center justify-center
                  text-gray-700  h-7 w-72 p-2 text-center' onClick={goBack}>precedent</button>
            <button className=' bg-white rounded-2xl shadow-md  shadow-grey-600 mt-10 flex items-center justify-center
                  text-gray-700  h-7 w-72 p-2 text-center' onClick={concatenateSlug}>substract one slug</button>
        </main>
    )
}



