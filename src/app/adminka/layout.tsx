export const metadata = {
  title: "Адмінка",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Здесь мы ничего не рендерим кроме содержимого админки.
  return <>{children}</>;
}

