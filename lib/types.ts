export interface Project {
  _id: string
  title: string
  description: string
  longDescription?: string
  image: string
  tags: string[]
  link?: string
  github?: string
  featured?: boolean
  createdAt: Date
}

export interface Contact {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
  read: boolean
}
