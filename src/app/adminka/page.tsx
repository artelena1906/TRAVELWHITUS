'use client';

import { useState, useEffect } from "react";
import { Box, Drawer, List, ListItemButton, ListItemText, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../../firebase"; // путь к твоей инициализации Firebase
import ToursAdmin from './ToursAdmin';

// Заглушки для форм
const ToursForm = () => <Typography>Форма для турів</Typography>;
const BlogForm = () => <Typography>Форма для блогу</Typography>;
const DreamsForm = () => <Typography>Форма для мрій</Typography>;

export default function AdminPanelPage() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<"tours" | "blog" | "dreams">("tours");

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // ищем документ в коллекции users
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setRole(data.role || "guest");
          } else {
            setRole("guest");
          }
        } catch (error) {
          console.error("Ошибка при получении роли:", error);
          setRole("guest");
        }
      } else {
        setRole("guest");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Typography sx={{ p: 5 }}>Завантаження...</Typography>;

  if (role !== "admin") {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h4">Доступ заборонено</Typography>
        <Typography variant="body1">У вас немає прав для входу в адмінку.</Typography>
        <Link href="../MainPage"><Button variant="contained">Повернутись на сайт</Button></Link>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ width: 200, flexShrink: 0, "& .MuiDrawer-paper": { width: 200, boxSizing: "border-box" } }}
      >
        <Toolbar />
        <List>
          <ListItemButton selected={activeSection === "tours"} onClick={() => setActiveSection("tours")}>
            <ListItemText primary="Тури" />
          </ListItemButton>
          <ListItemButton selected={activeSection === "blog"} onClick={() => setActiveSection("blog")}>
            <ListItemText primary="Блог" />
          </ListItemButton>
          <ListItemButton selected={activeSection === "dreams"} onClick={() => setActiveSection("dreams")}>
            <ListItemText primary="Мрії" />
          </ListItemButton>
        </List>
        <Box sx={{ m: 2 }}>
          <Link href="../MainPage" passHref>
            <Button variant="outlined" fullWidth>Повернутись на сайт</Button>
          </Link>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {activeSection === "tours" && <ToursAdmin />}
        {activeSection === "blog" && <BlogForm />}
        {activeSection === "dreams" && <DreamsForm />}
      </Box>
    </Box>
  );
}
