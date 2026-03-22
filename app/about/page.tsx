import { Code2, Briefcase, GraduationCap, Heart, Sparkles, Zap, Layers, Database, Globe, Server, Terminal, GitBranch, Cloud, Container } from "lucide-react"

const skills = [
  { name: "JavaScript", icon: Zap },
  { name: "TypeScript", icon: Code2 },
  { name: "React", icon: Layers },
  { name: "Next.js", icon: Globe },
  { name: "Node.js", icon: Server },
  { name: "MongoDB", icon: Database },
  { name: "PostgreSQL", icon: Database },
  { name: "Tailwind CSS", icon: Sparkles },
  { name: "Python", icon: Terminal },
  { name: "Git", icon: GitBranch },
  { name: "Docker", icon: Container },
  { name: "AWS", icon: Cloud },
]

const experiences = [
  {
    title: "Senior Developer",
    company: "Tech Company",
    period: "2022 - Present",
    description: "Leading frontend development and mentoring junior developers.",
  },
  {
    title: "Full Stack Developer",
    company: "Startup Inc",
    period: "2020 - 2022",
    description: "Built and maintained web applications using React and Node.js.",
  },
  {
    title: "Junior Developer",
    company: "Agency Co",
    period: "2018 - 2020",
    description: "Developed responsive websites and learned best practices.",
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <section className="py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          About <span className="text-primary">Jaydeep</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          I'm a passionate developer with expertise in building modern web
          applications. I love solving complex problems and creating intuitive
          user experiences.
        </p>
      </section>

      {/* Skills */}
      <section className="py-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Code2 className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.name}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:scale-105 hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Experience */}
      <section className="py-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Briefcase className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
        </div>
        <div className="mt-6 space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold group-hover:text-primary">{exp.title}</h3>
                  <p className="text-muted-foreground">{exp.company}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {exp.period}
                </span>
              </div>
              <p className="mt-3 leading-relaxed text-muted-foreground">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="py-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Education</h2>
        </div>
        <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold">Bachelor of Computer Science</h3>
              <p className="text-muted-foreground">University Name</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              2014 - 2018
            </span>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="py-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Heart className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Interests</h2>
        </div>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          When I'm not coding, you can find me exploring new technologies,
          contributing to open-source projects, playing video games, or enjoying
          a good book. I'm always eager to learn and grow as a developer.
        </p>
      </section>
    </div>
  )
}
