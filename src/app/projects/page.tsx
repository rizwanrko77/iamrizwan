import { redirect } from 'next/navigation';

/**
 * Redirect from old /projects URL to /company.
 * Preserves bookmarks and backlinks after the rename.
 */
export default function ProjectsRedirect() {
  redirect('/company');
}
