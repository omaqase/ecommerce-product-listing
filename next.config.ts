import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['api.bookmate.ru', 'assets-ru.bookmate.yandex.net', ''],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;