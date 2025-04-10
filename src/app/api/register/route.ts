import { NextResponse } from "next/server";

// Тимчасовий масив у пам’яті (зникає при перезапуску Vercel)
let users: { email: string; password: string; name: string; surname: string; phone: string; inviteCode: string }[] = [];

export async function POST(request: Request) {
  const { name, surname, phone, password, inviteCode } = await request.json();

  // Перевірка коду запрошення (можеш змінити код на свій)
  const validInviteCode = "Lena19"; // Твій код запрошення
  if (inviteCode !== validInviteCode) {
    return NextResponse.json(
      { message: "Введіть правильний код запрошення" },
      { status: 400 }
    );
  }

  // Перевірка, чи користувач уже існує (за номером телефону)
  if (users.some((u) => u.phone === phone)) {
    return NextResponse.json(
      { message: "Користувач із таким номером уже існує" },
      { status: 400 }
    );
  }

  const newUser = {
    email: `${name}.${surname}@example.com`,
    password,
    name,
    surname,
    phone,
    inviteCode,
  };
  users.push(newUser);

  return NextResponse.json(
    { message: "Ви успішно зареєстровані", user: { name, surname, phone } },
    { status: 201 }
  );
}