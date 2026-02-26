import { Navigate, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { docs } from '../../docs';
import styles from './docs-content.module.css';

export function DocsContent() {
  const { slug } = useParams<{ slug: string }>();
  const doc = docs.find((d) => d.slug === slug);

  if (!doc) {
    return <Navigate to={`/docs/${docs[0].slug}`} replace />;
  }

  return (
    <main className={styles.content}>
      <Markdown remarkPlugins={[remarkGfm]}>{doc.content}</Markdown>
    </main>
  );
}
