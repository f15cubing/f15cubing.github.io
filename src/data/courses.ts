/**
 * Coursework. Add a line when you register for a class; the CV renders it.
 *
 * `status` controls where it shows up:
 *   completed   — listed under Coursework
 *   in-progress — listed under In progress, grouped by term
 *   planned     — NOT rendered. Use it to stage a future term privately;
 *                 flip to in-progress when the term starts.
 *
 * Ordering within a group follows this array, so keep it roughly chronological.
 */

export type CourseStatus = 'completed' | 'in-progress' | 'planned';

export interface Course {
  /** MIT subject number, e.g. '18.701'. */
  number: string;
  title: string;
  status: CourseStatus;
  /** e.g. 'Fall 2026'. Used to group the in-progress list. */
  term?: string;
}

export const courses: Course[] = [
  // --- Completed -----------------------------------------------------------
  { number: '18.701', title: 'Abstract Algebra I', status: 'completed', term: 'Fall 2025' },
  { number: '18.702', title: 'Abstract Algebra II', status: 'completed', term: 'Spring 2026' },
  { number: '18.100A', title: 'Real Analysis', status: 'completed', term: 'Spring 2026' },
  {
    number: '6.190',
    title: 'Low-Level Programming in C & Assembly',
    status: 'completed',
    term: 'Spring 2026',
  },


  // --- In progress ---------------------------------------------------------
  { number: '6.1210', title: 'Algorithms', status: 'in-progress', term: 'Fall 2026' },
  {
    number: '6.1010',
    title: 'Fundamentals of Programming',
    status: 'in-progress',
    term: 'Fall 2026',
  },
  {
    number: '6.1910',
    title: 'Computation Structures',
    status: 'in-progress',
    term: 'Fall 2026',
  },
  {
    number: '18.404',
    title: 'Theory of Computation',
    status: 'in-progress',
    term: 'Fall 2026',
  },
  {
    number: '18.901',
    title: 'Introduction to Topology',
    status: 'in-progress',
    term: 'Fall 2026',
  },
  {
    number: '24.241',
    title: 'Logic I',
    status: 'in-progress',
    term: 'Fall 2026',
  },
];

/** Completed classes, in the order listed above. */
export const completedCourses = courses.filter((c) => c.status === 'completed');

/**
 * In-progress classes grouped by term, so a new semester appears as its own
 * heading without touching the page. Terms are ordered by first appearance.
 */
export const coursesInProgress: { term: string; items: Course[] }[] = (() => {
  const groups = new Map<string, Course[]>();
  for (const c of courses) {
    if (c.status !== 'in-progress') continue;
    const term = c.term ?? 'Current';
    const bucket = groups.get(term);
    if (bucket) bucket.push(c);
    else groups.set(term, [c]);
  }
  return [...groups].map(([term, items]) => ({ term, items }));
})();
