import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Code2, Rocket, Github, Linkedin, Mail, Download } from "lucide-react"
import { ProjectsGrid } from "@/components/projects-grid"

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Hero Section */}
      <section className="py-12 sm:py-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
          {/* Profile Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary/20 shadow-xl shadow-primary/10 sm:h-80 sm:w-80">
              <Image
                src="/images/jaydeep-profile.jpg"
                alt="Jaydeep"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <Code2 className="h-7 w-7" />
            </div>
            <div className="absolute -left-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
          
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Rocket className="h-4 w-4" />
              Welcome to my portfolio
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Jaydeep
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground lg:mx-0">
              I build modern web applications with a focus on user experience,
              performance, and clean code. Explore my projects below.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primary/90"
              >
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium shadow-sm transition-all hover:scale-105 hover:bg-accent"
              >
                <Download className="h-4 w-4" />
                Download CV
              </Link>
            </div>
            
            {/* Social Links */}
            <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
              <a
                href="https://github.com/87jaydeepsingh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-card text-muted-foreground shadow-sm transition-all hover:scale-110 hover:bg-accent hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/jaydeep-s/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-card text-muted-foreground shadow-sm transition-all hover:scale-110 hover:bg-accent hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:jaydeepsingh8767@gmail.com"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-card text-muted-foreground shadow-sm transition-all hover:scale-110 hover:bg-accent hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ProjectsGrid limit={6} />
      </section>
    </div>
  )
}
