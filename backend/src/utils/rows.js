export function parseCourse(row) {
  if (!row) return null;
  return {
    ...row,
    price: Number(row.price),
    featured: Boolean(row.featured),
    syllabus: JSON.parse(row.syllabus || "[]")
  };
}

export function parseProject(row) {
  if (!row) return null;
  return {
    ...row,
    tech_stack: JSON.parse(row.tech_stack || "[]")
  };
}
