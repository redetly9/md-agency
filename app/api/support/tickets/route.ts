import { NextRequest, NextResponse } from 'next/server';

// GET - получить список всех тикетов
export async function GET(request: NextRequest) {
  try {
    // Здесь должна быть логика получения тикетов из базы данных
    // Пока возвращаем заглушку
    const tickets = [
      {
        id: '1',
        title: 'Вопрос по аренде',
        status: 'open',
        priority: 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Проблема с оплатой',
        status: 'closed',
        priority: 'high',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];

    return NextResponse.json({ tickets });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при получении тикетов' },
      { status: 500 }
    );
  }
}

// POST - создать новый тикет
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, priority, userId } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Заголовок и описание обязательны' },
        { status: 400 }
      );
    }

    // Здесь должна быть логика создания тикета в базе данных
    const newTicket = {
      id: Date.now().toString(),
      title,
      description,
      status: 'open',
      priority: priority || 'medium',
      userId: userId || 'anonymous',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ ticket: newTicket }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при создании тикета' },
      { status: 500 }
    );
  }
}
