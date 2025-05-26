'use client'

import { NextStudio } from 'next-sanity/studio'
import { config } from '@/sanity/sanity.config'

export default function AdminPage() {
    return (
        <div className='w-full'>
            <NextStudio config={config} />
        </div>
    )
}