import { NextRequest, NextResponse } from 'next/server';

// GET - получить сообщения для конкретного тикета
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ticketId = params.id;
    
    // Здесь должна быть логика получения сообщений из базы данных
    // Пока возвращаем заглушку
    const messages = [
      {
        id: '1',
        ticketId: ticketId,
        message: 'Добрый день! Чем могу помочь?',
        sender: 'support',
        timestamp: new Date().toISOString(),
      }
    ];

    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при получении сообщений' },
      { status: 500 }
    );
  }
}

// POST - создать новое сообщение в тикете
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ticketId = params.id;
    const body = await request.json();
    const { message, sender } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Сообщение обязательно' },
        { status: 400 }
      );
    }

    // Здесь должна быть логика сохранения сообщения в базу данных
    const newMessage = {
      id: Date.now().toString(),
      ticketId,
      message,
      sender: sender || 'user',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при создании сообщения' },
      { status: 500 }
    );
  }
} 