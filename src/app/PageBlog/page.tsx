"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./css/PageBlog.module.css";

export default function PageBlog() {
  interface TextItem {
    text: string;
  }

  interface Blog {
    id: string;
    name: string;
    title: string;
    description: string;
    urlphoto: string;
    date: string;
  }

  interface BlogItem {
    title: string;
    description: TextItem[];
    blog: Blog[];
  }

  const [blogs, setBlogs] = useState<BlogItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch("/PageBlog.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Не удалось загрузить JSON");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Загруженные данные:", data);
        setBlogs(data.bodyData);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
      });
  }, []);

  if (!blogs) {
    return <div>Завантаження...</div>;
  }

  const groupedPosts = blogs.blog
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce((acc, post) => {
      if (!acc[post.name]) {
        acc[post.name] = [];
      }
      acc[post.name].push(post);
      return acc;
    }, {} as { [key: string]: Blog[] });

  const categories: { [key: string]: string } = {
    culture: "Культура та традиції",
    places: "Цікаві місця",
    food: "Смаки світу",
    wine: "Вино та натхнення",
  };

  // Начальный вид: 1 большое + 4 маленьких
  const renderInitialCategoryPosts = (category: string, posts: Blog[]) => {
    const latestPosts = posts.slice(0, 5);
    const bigPost = latestPosts[0];
    const smallPosts = latestPosts.slice(1, 5);

    return (
      <div key={category} className={styles.categorySection}>
        <h3>{categories[category]}</h3>
        <div className={styles.postsLayout}>
          {bigPost && (
            <Link href={`/PageBlogIndividual/${bigPost.id}`} className={styles.bigPost}>
            <Image
              src={bigPost.urlphoto}
              alt={bigPost.title}
              width={700}
              height={500}
              className={styles.bigPostImage} // Добавляем класс для изображения
            />
            <div className={styles.titleOverlay}>{bigPost.title}</div>
          </Link>
          )}
         <div className={styles.smallPosts}>
  {smallPosts.map((post, index) => (
    <Link
      key={index}
      href={`/PageBlogIndividual/${post.id}`}
      className={styles.smallPost}
    >
      <Image
        src={post.urlphoto}
        alt={post.title}
        width={280}
        height={260}
        className={styles.smallPostImage} // Добавляем класс для изображения
      />
      <div className={styles.titleOverlay}>{post.title}</div>
    </Link>
  ))}
</div>
        </div>
      </div>
    );
  };

  // Вид после клика: все статьи категории
  const renderSelectedCategoryPosts = (category: string, posts: Blog[]) => {
    return (
      <div className={styles.categorySection}>
        <h3>{categories[category]}</h3>
        <div className={styles.postsGrid}>
          {posts.map((post, index) => (
            <Link
              key={index}
              href={`/PageBlogIndividual/${post.id}`}
              className={styles.postItem}
            >
              <Image
                src={post.urlphoto}
                alt={post.title}
                width={300}
                height={200}
              />
              <p className={styles.postTitle}>{post.title}</p> {/* Текст ПОД картинкой */}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.containerBlog}>
      <div className={styles.containerBlogTitle}>
      <h1>{blogs.title}</h1>
<nav className={styles.nav}>
        <ul>
          {Object.entries(categories).map(([key, title]) => (
            <li key={key}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory(key);
                }}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
</div>
      <hr className={styles.hr}/>
      {blogs.description.map((text, index) => (
        <div key={index} className={styles.descriptionItem}>
          {text.text}
        </div>
      ))}
      
      <div className={styles.blogContainer}>
        {selectedCategory
          ? renderSelectedCategoryPosts(selectedCategory, groupedPosts[selectedCategory])
          : Object.entries(groupedPosts).map(([category, posts]) =>
              renderInitialCategoryPosts(category, posts)
            )}
      </div>
    </div>
  );
}