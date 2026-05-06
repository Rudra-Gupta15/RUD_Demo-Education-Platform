export function parseCourse(row) {
  if (!row) return null;
  return {
    ...row,
    price: Number(row.price),
    original_price: row.original_price ? Number(row.original_price) : null,
    featured: Boolean(row.featured),
    syllabus: JSON.parse(row.syllabus || "[]"),
    badges: JSON.parse(row.badges || "[]"),
    outcomes: JSON.parse(row.outcomes || "[]")
  };
}

export function parseProject(row) {
  if (!row) return null;
  return {
    ...row,
    tech_stack: JSON.parse(row.tech_stack || "[]")
  };
}
