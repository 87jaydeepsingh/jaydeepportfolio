"use client"

import useSWR from "swr"
import { ProjectCard } from "@/components/project-card"
import { Spinner } from "@/components/ui/spinner"
import type { Project } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface ProjectsGridProps {
  limit?: number
}

export function ProjectsGrid({ limit }: ProjectsGridProps) {
  const { data: projects, error, isLoading } = useSWR<Project[]>("/api/projects", fetcher)

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
        <p className="text-muted-foreground">Failed to load projects</p>
        <SeedButton />
      </div>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
        <p className="text-muted-foreground">No projects found</p>
        <SeedButton />
      </div>
    )
  }

  const displayProjects = limit ? projects.slice(0, limit) : projects

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayProjects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  )
}

function SeedButton() {
  const handleSeed = async () => {
    try {
      const res = await fetch("/api/seed", { method: "POST" })
      const data = await res.json()
      if (data.count) {
        window.location.reload()
      }
    } catch (error) {
      console.error("Failed to seed:", error)
    }
  }

  return (
    <button
      onClick={handleSeed}
      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      Add Sample Projects
    </button>
  )
}
