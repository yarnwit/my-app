interface TicketDetailProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function TicketDetailPage({ params }: TicketDetailProps) {
    const { id } = await params;
    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">รายละเอียด Ticket</h1>

            <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-lg">
                    คุณกำลังดูข้อมูลของ Ticket หมายเลข: <span className="font-bold text-blue-700">{id}</span>
                </p>
            </div>

            <div className="mt-6">
                <a href="/tickets" className="text-blue-500 hover:underline">
                    &larr; กลับไปหน้ารวม Tickets
                </a>
            </div>
        </div>
    );
}