const SKILL_GROUPS = [
  {
    category: 'Languages',
    skills: ['Python', 'TypeScript', 'Java', 'C++', 'Bash'],
  },
  {
    category: 'Data & Databases',
    skills: ['SQL', 'Cypher (Neo4j)'],
  },
  {
    category: 'Tools & Workflow',
    skills: ['Git / GitHub'],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            Skills &amp; Technologies
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            The toolkit I reach for.
          </h2>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
