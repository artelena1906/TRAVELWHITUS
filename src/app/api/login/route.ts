import { NextResponse } from "next/server";

type User = {
  email: string;
  password: string;
  name: string;
};

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    // Используем относительный путь, так как users.json в /public
    const res = await fetch("/users.json");
    
    if (!res.ok) {
      console.error("Fetch error:", res.status, res.statusText);
      throw new Error(`Failed to fetch users.json: ${res.statusText}`);
    }

    const json = await res.json();
    
    // Проверяем наличие bodyData.user
    if (!json.bodyData?.user) {
      console.error("Invalid JSON structure:", json);
      throw new Error("Missing bodyData.user in JSON response");
    }

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
