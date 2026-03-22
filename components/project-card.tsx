"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project._id}`} className="group block">
      <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
            <ExternalLink className="h-5 w-5" />
          </div>
        </div>
        <div className="p-5">
          <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground group-hover:text-primary">
            {project.title}
            <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-lg bg-primary/10 text-xs font-medium text-primary hover:bg-primary/20">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="rounded-lg text-xs">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
