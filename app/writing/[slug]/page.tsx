import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../../site.module.css';
import { POSTS, getPost } from '@/data/posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<'/writing/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const description = post.lede ?? post.paragraphs[0];
  return {
    title: `${post.title} | Jared Alonzo`,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `/writing/${post.slug}`,
      type: 'article',
    },
  };
}

export default async function WritingPage({ params }: PageProps<'/writing/[slug]'>) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className={styles.page}>
      <Link href="/#writing" className={styles.back}>← All writing</Link>

      <article>
        <header className={styles.articleHead}>
          <h1 className={styles.articleTitle}>{post.title}</h1>
          <span className={styles.postDate}>{post.date}</span>
        </header>

        {post.hero && (
          <div className={styles.postHero}>
            <Image src={post.hero} alt="" fill priority sizes="(max-width: 640px) 100vw, 640px" />
          </div>
        )}

        <div className={styles.postContent}>
          {post.lede && <p className={styles.lede}>{post.lede}</p>}
          {post.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>

      <footer className={styles.articleFoot}>
        <Link href="/#writing" className={styles.back}>← Back to Jared Alonzo</Link>
      </footer>
    </main>
  );
}
