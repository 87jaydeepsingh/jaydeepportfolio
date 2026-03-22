"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MessageSquare, FolderKanban, TrendingUp, ArrowRight } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    unreadContacts: 0,
    totalProjects: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contactsRes, projectsRes] = await Promise.all([
          fetch("/api/contacts"),
          fetch("/api/projects"),
        ])
        
        const contacts = await contactsRes.json()
        const projects = await projectsRes.json()
        
        setStats({
          totalContacts: Array.isArray(contacts) ? contacts.length : 0,
          unreadContacts: Array.isArray(contacts) ? contacts.filter((c: { read: boolean }) => !c.read).length : 0,
          totalProjects: Array.isArray(projects) ? projects.length : 0,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Contacts",
      value: stats.totalContacts,
      icon: MessageSquare,
      href: "/admin/contacts",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Unread Messages",
      value: stats.unreadContacts,
      icon: TrendingUp,
      href: "/admin/contacts",
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: FolderKanban,
      href: "/admin/projects",
      color: "bg-green-500/10 text-green-500",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back! Here's an overview of your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", card.color)}>
                  <Icon className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{card.title}</p>
              <p className="mt-1 text-3xl font-bold">{card.value}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
