import { NextResponse } from "next/server";

type User = {
  email: string;
  password: string;
  name: string;
  surname?: string; // Добавляем необязательные поля
  phone?: string;
};

export async function POST(req: Request) {
  try {
    // Проверяем входные данные
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      console.error("Missing email or password:", body);
      return NextResponse.json(
        { message: "E-mail і пароль обов'язкові" },
        { status: 400 }
      );
    }

    // Выполняем fetch
    const res = await fetch("https://travelclub-psi.vercel.app/users.json", {
      cache: "no-store", // Отключаем кэширование
    });
    console.log("Fetch status:", res.status, res.statusText);

    if (!res.ok) {
      console.error("Fetch error:", res.status, res.statusText);
      throw new Error(`Fetch failed with status ${res.status}: ${res.statusText}`);
    }

    // Парсим JSON
    let json;
    try {
      json = await res.json();
      console.log("JSON response:", JSON.stringify(json, null, 2));
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      throw new Error("Failed to parse JSON response");
    }

    // Проверяем структуру
    if (!json.bodyData?.user || !Array.isArray(json.bodyData.user)) {
      console.error("Invalid JSON structure:", json);
      throw new Error("Missing or invalid bodyData.user in JSON");
    }

    const users: User[] = json.bodyData.user;
    console.log("Parsed users:", users);

    // Ищем пользователя
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
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      {
        message: "Помилка при зчитуванні даних",
        error: String(error),
      },
      { status: 500 }
    );
  }
}