import Image from 'next/image';
import ExperienceTabs from './components/ExperienceTabs';
import IdleController from './components/IdleController';
import IdleLink from './components/IdleLink';
import VisitorMap from './components/VisitorMap';
import styles from './site.module.css';
import { POSTS } from '@/data/posts';
import {
  CLOSING_LINE,
  CONTACT,
  CONTACT_INTRO,
  INVOLVEMENT,
  PROFILE,
  PROGRAMS,
  PROJECTS,
  WORK,
} from '@/data/site';

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <>
      <IdleController />

      <main className={styles.page}>
        <header id="about" className={styles.intro}>
          <div className={styles.introHead}>
            <h1 className={styles.name}>{PROFILE.name}</h1>
            <span className={styles.location}>{PROFILE.location}</span>
          </div>
          <div className={styles.bio}>
            {PROFILE.bio.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <a className={styles.cta} href={PROFILE.cta.href} target="_blank" rel="noopener noreferrer">
            {PROFILE.cta.label} <span aria-hidden>→</span>
          </a>
        </header>

        <Section id="experience" title="Experience">
          <ExperienceTabs
            tabs={[
              { id: 'work', label: 'Work', items: WORK },
              { id: 'involvement', label: 'Involvement', items: INVOLVEMENT },
              { id: 'programs', label: 'Programs', items: PROGRAMS },
            ]}
          />
        </Section>

        <Section id="projects" title="Projects">
          <ul className={styles.projList}>
            {PROJECTS.map(project => (
              <li key={project.name}>
                <a className={styles.projRow} href={project.link} target="_blank" rel="noopener noreferrer">
                  <span className={styles.projHead}>
                    <span className={styles.projName}>{project.name}</span>
                    <span className={styles.projArrow} aria-hidden>↗</span>
                  </span>
                  <span className={styles.projDesc}>{project.desc}</span>
                  <span className={styles.projTags}>{project.tags.join(', ')}</span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="writing" title="Writing">
          {POSTS.map(post => (
            <details key={post.slug} id={post.slug} className={styles.post}>
              <summary className={styles.postSummary}>
                <span className={styles.postTitle}>
                  <span className={styles.postMarker} aria-hidden>▸</span>
                  {post.title}
                </span>
                <span className={styles.postDate}>{post.date}</span>
              </summary>
              <div className={styles.postContent}>
                {post.hero && (
                  <div className={styles.postHero}>
                    <Image src={post.hero} alt="" fill sizes="(max-width: 640px) 100vw, 640px" />
                  </div>
                )}
                {post.lede && <p className={styles.lede}>{post.lede}</p>}
                {post.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </details>
          ))}
        </Section>

        <Section id="last-visitor" title="Last Visitor">
          <VisitorMap />
        </Section>

        <Section id="contact" title="Contact">
          <p className={styles.contactIntro}>{CONTACT_INTRO}</p>
          <div className={styles.contactGrid}>
            {CONTACT.map(link => (
              <a key={link.label} className={styles.contactCard} href={link.href} target="_blank" rel="noopener noreferrer">
                <span className={styles.ccLabel}>{link.label}</span>
                <span className={styles.ccValue}>{link.value}</span>
                <span className={styles.ccAction}>{link.action} →</span>
              </a>
            ))}
          </div>
        </Section>

        <footer className={styles.footer}>
          <nav className={styles.footerLinks} aria-label="Footer">
            <a className={styles.footerLink} href="#about">About</a>
            <a className={styles.footerLink} href="#contact">Contact</a>
            <IdleLink className={styles.footerLink} />
          </nav>
          <span>{CLOSING_LINE}</span>
        </footer>
      </main>
    </>
  );
}
