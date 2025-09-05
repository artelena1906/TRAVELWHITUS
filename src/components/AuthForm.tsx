// "use client";
// import { useState, useEffect, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import { auth, db } from "../app/api/firebase";
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut} from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import styles from "../app/MainPageStart.module.css";
// import Image from "next/image";

// interface AuthFormProps {
//   onLogin: (email: string, password: string) => void;
//   errorMessage?: string;
// }

// export default function AuthForm({ onLogin, errorMessage }: AuthFormProps) {
//   const [activeTab, setActiveTab] = useState<"login" | "register">("login");
//   const [message, setMessage] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     const inputs = document.querySelectorAll("input");
//     inputs.forEach((input) => (input.value = ""));
//     setShowPassword(false);
//   }, [activeTab]);

//   const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setMessage(null);
//     setLoading(true);

//     const formData = new FormData(e.currentTarget);
//     const email = formData.get("email")?.toString() || "";
//     const password = formData.get("password")?.toString() || "";

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       localStorage.setItem("token", user.uid);
//       localStorage.setItem("name", user.displayName || email.split("@")[0]);
//       localStorage.setItem("role", "user");

//       onLogin(email, password);
//       router.push("/MainPage");
//     } catch {
//       setMessage("Неправильний email або пароль");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setMessage(null);
//     setLoading(true);

//     const formData = new FormData(e.currentTarget);
//     const name = formData.get("name")?.toString() || "";
//     const surname = formData.get("surname")?.toString() || "";
//     const phone = formData.get("phone")?.toString() || "";
//     const email = formData.get("email")?.toString() || "";
//     const password = formData.get("password")?.toString() || "";
//     const inviteCode = formData.get("inviteCode")?.toString() || "";

//     try {
//       const inviteRef = doc(db, "invites", inviteCode);
//       const inviteDoc = await getDoc(inviteRef);

//       if (!inviteDoc.exists() || inviteDoc.data()?.used === true) {
//         setMessage("Недійсний або використаний код запрошення");
//         return;
//       }

//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await updateProfile(user, {
//         displayName: `${name} ${surname}`,
//       });

//       await setDoc(inviteRef, { used: true, usedAt: new Date().toISOString() }, { merge: true });

//       await setDoc(doc(db, "users", user.uid), {
//         name,
//         surname,
//         phone,
//         email,
//         role: "user",   
//         createdAt: new Date().toISOString(),
//       });

//       localStorage.setItem("token", user.uid);
//       localStorage.setItem("name", `${name} ${surname}`);
//       localStorage.setItem("role", "user");
//       setMessage("Ви успішно зареєстровані");

//       setTimeout(() => {
//         router.push("/MainPage");
//       }, 1000);
//     } catch (error: unknown) {
//   if (error instanceof Error) {
//     setMessage("Помилка при реєстрації: " + error.message);
//   } else {
//     setMessage("Помилка при реєстрації");
//   }
// } finally {
//       setLoading(false);
//     }
//   };

//   const handleGuestLogin = async () => {
//     setLoading(true);
//     try {
//       await signOut(auth); // разлогиниваем текущего пользователя Firebase
//       localStorage.setItem("token", "guest");
//       localStorage.setItem("name", "Гість");
//       localStorage.setItem("role", "guest");
//       router.push("/MainPage");
//     } catch (err) {
//   console.error(err); // теперь переменная используется
//   setMessage("Помилка при вході як гість");
// } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className={styles.tabs}>
//         <button 
//           className={`${styles.tab} ${activeTab === "login" ? styles.active : ""}`}
//           onClick={() => {
//             setActiveTab("login");
//             setMessage(null);
//           }}
//           disabled={loading}
//         >
//           Увійти
//         </button>
//         <button
//           className={`${styles.tab} ${activeTab === "register" ? styles.active : ""}`}
//           onClick={() => {
//             setActiveTab("register");
//             setMessage(null);
//           }}
//           disabled={loading}
//         >
//           Зареєструватися
//         </button>
//       </div>

//       {(message || errorMessage) && (
//         <p className={message === "Ви успішно зареєстровані" ? styles.success : styles.error}>
//           {message || errorMessage}
//         </p>
//       )}

//       {activeTab === "login" ? (
//         <form className={styles.form} onSubmit={handleLogin} autoComplete="off">
//           <input
//             type="email"
//             name="email"
//             placeholder="e-mail"
//             required
//             disabled={loading}
//             autoComplete="username"
//           />
//           <div className={styles.passwordWrapper}>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Пароль"
//               required
//               disabled={loading}
//               autoComplete="current-password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className={styles.eyeButton}
//               tabIndex={-1}
//             >
//               <Image
//                 src={showPassword ? "/img/open.png" : "/img/close.png"}
//                 alt={showPassword ? "Сховати пароль" : "Показати пароль"}
//                 width={20}
//                 height={15}
//                 className={styles.eyeIcon}
//               />
//             </button>
//           </div>
//           <button 
//           type="submit" 
//           disabled={loading}
//           className={styles.formButton}
//           >
//             Увійти
//             </button>

//           {/* Кнопка входа как гость */}
//           <button
//             type="button"
//             disabled={loading}
//             onClick={handleGuestLogin}
//             className={styles.guestButton}
//           >
//             Увійти без реєстрації
//           </button>
//         </form>
//       ) : (
//         <form className={styles.form} onSubmit={handleRegister} autoComplete="off">
//           <input
//             type="text"
//             name="name"
//             placeholder="Ім’я"
//             required
//             disabled={loading}
//             autoComplete="off"
//           />
//           <input
//             type="text"
//             name="surname"
//             placeholder="Прізвище"
//             required
//             disabled={loading}
//             autoComplete="off"
//           />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Номер телефону"
//             required
//             disabled={loading}
//             autoComplete="tel"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="e-mail"
//             required
//             disabled={loading}
//             autoComplete="new-email"
//           />
//           <div className={styles.passwordWrapper}>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Пароль"
//               required
//               disabled={loading}
//               autoComplete="new-password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className={styles.eyeButton}
//               tabIndex={-1}
//             >
//               <Image
//                 src={showPassword ? "/img/open.png" : "/img/close.png"}
//                 alt={showPassword ? "Сховати пароль" : "Показати пароль"}
//                 width={20}
//                 height={15}
//                 className={styles.eyeIcon}
//               />
//             </button>
//           </div>
//           <input
//             type="text"
//             name="inviteCode"
//             placeholder="Код запрошення"
//             required
//             disabled={loading}
//             autoComplete="off"
//           />
//           <button 
//           type="submit" 
//           disabled={loading}
//           className={styles.formButton}
//           > 
//           Зареєструватися
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }


"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../app/api/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import styles from "../app/MainPageStart.module.css";
import Image from "next/image";

interface AuthFormProps {
  onLogin: (email: string, password: string) => void;
  errorMessage?: string;
}

export default function AuthForm({ onLogin, errorMessage }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    setShowPassword(false);
  }, [activeTab]);

  // ------------------- LOGIN -------------------
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Получаем роль из Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.exists() ? userDoc.data().role : "user";

      localStorage.setItem("token", user.uid);
      localStorage.setItem("name", user.displayName || email.split("@")[0]);
      localStorage.setItem("role", role);

      onLogin(email, password);
      router.push("/MainPage");
    } catch {
      setMessage("Неправильний email або пароль");
    } finally {
      setLoading(false);
    }
  };

  // ------------------- REGISTER -------------------
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const surname = formData.get("surname")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const inviteCode = formData.get("inviteCode")?.toString() || "";

    try {
      const inviteRef = doc(db, "invites", inviteCode);
      const inviteDoc = await getDoc(inviteRef);

      if (!inviteDoc.exists() || inviteDoc.data()?.used === true) {
        setMessage("Недійсний або використаний код запрошення");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${name} ${surname}`,
      });

      // Отмечаем код приглашения как использованный
      await setDoc(inviteRef, { used: true, usedAt: new Date().toISOString() }, { merge: true });

      // Создаём документ пользователя с ролью "user"
      await setDoc(doc(db, "users", user.uid), {
        name,
        surname,
        phone,
        email,
        role: "user",                  // <-- добавляем роль
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("token", user.uid);
      localStorage.setItem("name", `${name} ${surname}`);
      localStorage.setItem("role", "user");
      setMessage("Ви успішно зареєстровані");

      setTimeout(() => {
        router.push("/MainPage");
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage("Помилка при реєстрації: " + error.message);
      } else {
        setMessage("Помилка при реєстрації");
      }
    } finally {
      setLoading(false);
    }
  };

  // ------------------- GUEST LOGIN -------------------
  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await signOut(auth); // разлогиниваем текущего пользователя Firebase
      localStorage.setItem("token", "guest");
      localStorage.setItem("name", "Гість");
      localStorage.setItem("role", "guest");
      router.push("/MainPage");
    } catch (err) {
      console.error(err);
      setMessage("Помилка при вході як гість");
    } finally {
      setLoading(false);
    }
  };

  // ------------------- RENDER -------------------
  return (
    <div>
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === "login" ? styles.active : ""}`}
          onClick={() => { setActiveTab("login"); setMessage(null); }}
          disabled={loading}
        >
          Увійти
        </button>
        <button
          className={`${styles.tab} ${activeTab === "register" ? styles.active : ""}`}
          onClick={() => { setActiveTab("register"); setMessage(null); }}
          disabled={loading}
        >
          Зареєструватися
        </button>
      </div>

      {(message || errorMessage) && (
        <p className={message === "Ви успішно зареєстровані" ? styles.success : styles.error}>
          {message || errorMessage}
        </p>
      )}

      {activeTab === "login" ? (
        <form className={styles.form} onSubmit={handleLogin} autoComplete="off">
          <input
            type="email"
            name="email"
            placeholder="e-mail"
            required
            disabled={loading}
            autoComplete="username"
          />
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Пароль"
              required
              disabled={loading}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles.eyeButton}
              tabIndex={-1}
            >
              <Image
                src={showPassword ? "/img/open.png" : "/img/close.png"}
                alt={showPassword ? "Сховати пароль" : "Показати пароль"}
                width={20}
                height={15}
                className={styles.eyeIcon}
              />
            </button>
          </div>
          <button type="submit" disabled={loading} className={styles.formButton}>
            Увійти
          </button>
          <button type="button" disabled={loading} onClick={handleGuestLogin} className={styles.guestButton}>
            Увійти без реєстрації
          </button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleRegister} autoComplete="off">
          <input type="text" name="name" placeholder="Ім’я" required disabled={loading} autoComplete="off" />
          <input type="text" name="surname" placeholder="Прізвище" required disabled={loading} autoComplete="off" />
          <input type="tel" name="phone" placeholder="Номер телефону" required disabled={loading} autoComplete="tel" />
          <input type="email" name="email" placeholder="e-mail" required disabled={loading} autoComplete="new-email" />
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Пароль"
              required
              disabled={loading}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles.eyeButton}
              tabIndex={-1}
            >
              <Image
                src={showPassword ? "/img/open.png" : "/img/close.png"}
                alt={showPassword ? "Сховати пароль" : "Показати пароль"}
                width={20}
                height={15}
                className={styles.eyeIcon}
              />
            </button>
          </div>
          <input type="text" name="inviteCode" placeholder="Код запрошення" required disabled={loading} autoComplete="off" />
          <button type="submit" disabled={loading} className={styles.formButton}>
            Зареєструватися
          </button>
        </form>
      )}
    </div>
  );
}
