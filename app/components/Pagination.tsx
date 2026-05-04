'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-8 text-gray-500">
            {/* ปุ่มย้อนกลับ */}
            <Link
                href={createPageURL(currentPage - 1)}
                className={`px-3 py-2 text-xl ${
                    currentPage <= 1 ? 'pointer-events-none opacity-50' : 'hover:text-red-500'
                }`}>
                    &lt;
            </Link>

            {/* ตัวเลขหน้า */}
            {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                const isActive = currentPage === page;

                return (
                    <Link
                        key={page}
                        href={createPageURL(page)}
                        className={`px-4 py-2 text-lg rounded-md transition-colors ${
                            isActive
                                ? 'bg-[#F05A4A] text-white font-medium'
                                : 'hover:bg-gray-100 hover:text-[#F05A4A]'
                        }`}
                    >
                        {page}
                    </Link>
                );
            })}

            {/* ปุ่มถัดไป */}
            <Link
                href={createPageURL(currentPage + 1)}
                className={`px-3 py-2 text-xl ${
                    currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'hover:text-red-500'
                    }`}>
                        &gt;
            </Link>
        </div>
    );
}