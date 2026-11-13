import { ViewTransition } from "react";

/**
 * Shared-element transition between a project's grid thumbnail and its case
 * study hero. Both sides use the same name (from the project's URL), so the
 * browser morphs one into the other during navigation. `default="none"` keeps
 * it still during unrelated transitions; `share` names the CSS class used in
 * globals.css for the morph's timing and fit.
 */
export function ProjectMorph({ href, children }: { href: string; children: React.ReactNode }) {
  const slug = href.split("/").filter(Boolean).pop() ?? href;
  return (
    <ViewTransition name={`project-${slug}`} share="project-morph" default="none">
      {children}
    </ViewTransition>
  );
}
