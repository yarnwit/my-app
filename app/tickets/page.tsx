import Link from 'next/link';

export default function TicketsPage() {
    const tickets = [
        { id: '101', title: 'ปัญหาล็อกอินเข้าใช้งานไม่ได้' },
        { id: '102', title: 'ลืมรหัสผ่าน ทำอย่างไร?' },
        { id: '103', title: 'หน้า Dashboard โหลดช้าผิดปกติ' },
    ];

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">รายการ Tickets ทั้งหมด</h1>

            <div className="flex flex-col gap-4">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                        {/* สร้าง Link ไปยัง Dynamic Route เช่น /tickets/101 */}
                        <Link href={`/tickets/${ticket.id}`} className="block">
                            <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                                Ticket #{ticket.id}
                            </h2>
                            <p className="text-gray-600">{ticket.title}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}