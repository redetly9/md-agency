import { NextRequest, NextResponse } from 'next/server';

// GET - получить конкретный тикет
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ticketId = params.id;
    
    // Здесь должна быть логика получения тикета из базы данных
    // Пока возвращаем заглушку
    const ticket = {
      id: ticketId,
      title: 'Вопрос по аренде',
      status: 'open',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ ticket });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при получении тикета' },
      { status: 500 }
    );
  }
}

// PUT - обновить тикет
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ticketId = params.id;
    const body = await request.json();
    const { status, priority } = body;

    // Здесь должна быть логика обновления тикета в базе данных
    const updatedTicket = {
      id: ticketId,
      status: status || 'open',
      priority: priority || 'medium',
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ ticket: updatedTicket });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при обновлении тикета' },
      { status: 500 }
    );
  }
}

// DELETE - удалить тикет
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ticketId = params.id;
    
    // Здесь должна быть логика удаления тикета из базы данных
    
    return NextResponse.json({ message: 'Тикет успешно удален' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при удалении тикета' },
      { status: 500 }
    );
  }
}
