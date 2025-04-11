import { NextResponse } from "next/server";

type User = {
  email: string;
  password: string;
  name: string;
};

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/users.json`
    );
    const json = await res.json();

    const users: User[] = json.bodyData.user;

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      return NextResponse.json({
        token: "fake-jwt-token",
        name: foundUser.name,
      });
    }

    return NextResponse.json(
      { message: "Невірний e-mail або пароль" },
      { status: 401 }
    );
  } catch (_error) {
    // `_error` с подчёркиванием не вызывает ошибку eslint
    return NextResponse.json(
      { message: "Помилка при зчитуванні даних" },
      { status: 500 }
    );
  }
}
