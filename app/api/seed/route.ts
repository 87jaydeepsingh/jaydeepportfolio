import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

const sampleProjects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with payment integration",
    longDescription:
      "Built a comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, and Stripe payment integration. The application uses Next.js for the frontend and MongoDB for data persistence.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    tags: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
    link: "https://example.com",
    github: "https://github.com",
    featured: true,
    createdAt: new Date(),
  },
  {
    title: "Task Management App",
    description: "A collaborative task management tool for teams",
    longDescription:
      "Developed a real-time task management application with drag-and-drop functionality, team collaboration features, and progress tracking. Built with React and Firebase for real-time updates.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    tags: ["React", "Firebase", "TypeScript", "DnD"],
    link: "https://example.com",
    github: "https://github.com",
    featured: true,
    createdAt: new Date(),
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather data visualization dashboard",
    longDescription:
      "Created an interactive weather dashboard that displays real-time weather data, forecasts, and historical trends using data visualization libraries and weather APIs.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
    tags: ["Vue.js", "D3.js", "Weather API", "CSS"],
    link: "https://example.com",
    featured: false,
    createdAt: new Date(),
  },
  {
    title: "AI Chat Assistant",
    description: "An intelligent chatbot powered by machine learning",
    longDescription:
      "Built an AI-powered chat assistant using natural language processing and machine learning models. The assistant can answer questions, provide recommendations, and learn from conversations.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    tags: ["Python", "OpenAI", "FastAPI", "React"],
    github: "https://github.com",
    featured: true,
    createdAt: new Date(),
  },
  {
    title: "Fitness Tracker",
    description: "Mobile-first fitness and workout tracking application",
    longDescription:
      "Designed and developed a mobile-responsive fitness tracking app with workout logging, progress charts, and personalized recommendations based on user goals.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    tags: ["React Native", "Node.js", "PostgreSQL", "Charts"],
    link: "https://example.com",
    featured: false,
    createdAt: new Date(),
  },
  {
    title: "Blog Platform",
    description: "A modern blogging platform with markdown support",
    longDescription:
      "Created a feature-rich blogging platform with markdown editing, syntax highlighting, image uploads, and SEO optimization. Includes an admin dashboard for content management.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    tags: ["Next.js", "MDX", "Prisma", "Vercel"],
    link: "https://example.com",
    github: "https://github.com",
    featured: false,
    createdAt: new Date(),
  },
]

export async function POST() {
  try {
    const db = await getDatabase()

    // Check if projects already exist
    const existingCount = await db.collection("projects").countDocuments()
    if (existingCount > 0) {
      return NextResponse.json({
        message: "Database already seeded",
        count: existingCount,
      })
    }

    const result = await db.collection("projects").insertMany(sampleProjects)

    return NextResponse.json({
      message: "Database seeded successfully",
      count: result.insertedCount,
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    )
  }
}
