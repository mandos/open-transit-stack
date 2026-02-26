import gettingStarted from '../../docs/getting-started.md?raw';
import architecture from '../../docs/architecture.md?raw';
import contributing from '../../docs/contributing.md?raw';
import { DocEntry } from './types';

export const docs: DocEntry[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    order: 1,
    content: gettingStarted,
  },
  {
    slug: 'architecture',
    title: 'Architecture',
    order: 2,
    content: architecture,
  },
  {
    slug: 'contributing',
    title: 'Contributing',
    order: 3,
    content: contributing,
  },
];
