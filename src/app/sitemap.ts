import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.BASE_URL as string;
    const publicUsernames = ['john', 'guest']
    return [
        // Homepage
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        // Sign-in
        {
            url: `${baseUrl}/sign-in`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        // Sign-up
        {
            url: `${baseUrl}/sign-up`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        // Public anonymous pages
        ...publicUsernames.map((username) => ({
            url: `${baseUrl}/u/${username}`,
            lastModified: new Date(),
            priority: 0.8,
        })),
    ];
}