// 'use client';
// import { useState, useEffect } from "react";
// import styles from "../css/MainPageSectionBlog.module.css";
// import Link from "next/link";
// import Image from "next/image";

// export default function MainPageSectionBlog() {
//     interface TextItem {
//         text: string;
//     }
//     interface Blog {
//         id: string;
//         name: string;
//         title: string;
//         description: string;
//         urlphoto: string;
//         date: string;
//     }

//     interface BlogItem {
//         title: string;
//         description: TextItem[];
//         blog: Blog[];
//     }

//     const [blogs, setBlogs] = useState<BlogItem | null>(null);
//     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


//     useEffect(() => {
//         fetch("/PageBlog.json")
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error("Не удалось загрузить JSON");
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 console.log("Загруженные данные:", data);
//                 setBlogs(data.bodyData);
//             })
//             .catch((error) => {
//                 console.error("Ошибка загрузки данных:", error);
//             });
//     }, []);

//     if (!blogs) {
//         return <div>Завантаження...</div>;
//     }

//     const renderInitialCategoryPosts = (category: string, posts: Blog[]) => {
//         const latestPosts = posts.slice(0, 5);
//         const bigPost = latestPosts[0];
//         const smallPosts = latestPosts.slice(1, 5);

//         return (
//             <div className={styles.containerBlog}>
//                 <div className={styles.containerBlogTitle}>
//                     <h1>Блог</h1>
//                     {/* <button className={styles.buttonBlog}> Всі статті Блогу</button> */}
//                     <Link href="/PageBlog" className={styles.linkBlog}>
//                         <button className={styles.buttonBlog}>Всі статті Блогу</button>
//                     </Link>
//                 </div>
//                 <hr className={styles.hr} />
//                 <div>
//                     <div className={styles.smallPosts}>
//                         {smallPosts.map((post, index) => (
//                             <Link
//                                 key={index}
//                                 href={`/PageBlogIndividual/${post.id}`}
//                                 className={styles.smallPost}
//                             >
//                                 <Image
//                                     src={post.urlphoto}
//                                     alt={post.title}
//                                     width={280}
//                                     height={260}
//                                     className={styles.smallPostImage} // Добавляем класс для изображения
//                                 />
//                                 <div className={styles.titleOverlay}>{post.title}</div>
//                             </Link>
//                         ))}
//                     </div>

//                 </div>
//             </div>
//         );
//     }
// }

'use client';
import { useState, useEffect } from "react";
import styles from "../css/MainPageSectionBlog.module.css";
import Link from "next/link";
import Image from "next/image";

export default function MainPageSectionBlog() {
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

  // Берём последние 10 постов
  const latestPosts = blogs.blog.slice(0, 10);

  return (
    <div className={styles.containerBlog}>
      <div className={styles.containerBlogTitle}>
        <h1>{blogs.title}</h1>
        <Link href="/PageBlog" className={styles.linkBlog}>
          <button className={styles.buttonBlog}>Всі статті Блогу</button>
        </Link>
      </div>
      <hr className={styles.hr} />
      {latestPosts.length === 0 ? (
        <div>Нет постов для отображения</div>
      ) : (
        <div className={styles.postsContainer}>
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/PageBlogIndividual/${post.id}`}
              className={styles.postItem}
            >
              <Image
                src={post.urlphoto}
                alt={post.title}
                width={150}
                height={150}
                className={styles.postImage}
              />
              <div className={styles.postContent}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                {/* <p className={styles.postDescription}>{post.description}</p> */}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}