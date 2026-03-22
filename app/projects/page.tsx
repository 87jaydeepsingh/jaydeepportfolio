import { ProjectsGrid } from "@/components/projects-grid"

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Projects</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A collection of projects I've worked on, showcasing my skills in web
          development, design, and problem-solving.
        </p>
      </section>

      <section className="py-8">
        <ProjectsGrid />
      </section>
    </div>
  )
}
