'use client'

import dynamic from 'next/dynamic';

export const DynamicTeamGridSection = dynamic(
    () => import('@/features/landing/TeamSection').then(mod => mod.TeamGridSection),
    { ssr: false }
);

export const DynamicDiplomaSection = dynamic(
    () => import('@/features/landing/Diploma').then(mod => mod.DiplomaSection),
    { ssr: false }
);

export const DynamicContactMessageSection = dynamic(
    () => import('@/features/contact/message/contactMessageSection').then(mod => mod.ContactMessageSection),
    { ssr: false }
);