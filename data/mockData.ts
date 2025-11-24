export interface Comment {
  id: string
  userId: string
  userName: string
  text: string
  createdAt: string
}

export interface PostRequest {
  userId: string
  userName: string
  userRole?: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

export interface Post {
  id: string
  authorId: string
  authorName: string
  authorAvatar?: string
  authorRole?: string
  title: string
  description: string
  roles: string[]
  createdAt: string
  likes: number
  comments: Comment[]
  requests: PostRequest[]
}

export const ROLES = [
  "Software Engineer",
  "Product Manager",
  "Designer",
  "Data Scientist",
  "Marketing",
  "Sales",
  "Student",
  "Entrepreneur",
]

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    authorId: "2",
    authorName: "Sarah Chen",
    authorRole: "Product Manager",
    title: "Looking for UX Designer for a SaaS startup",
    description:
      "We are building an AI-powered analytics platform and looking for a talented UX designer to join our team. Remote-friendly, competitive salary.",
    roles: ["Designer", "Entrepreneur"],
    createdAt: "2024-01-15T10:30:00Z",
    likes: 24,
    comments: [
      {
        id: "c1",
        userId: "3",
        userName: "Alex Kumar",
        text: "This sounds like a great opportunity! Are you open to part-time designers?",
        createdAt: "2024-01-15T11:30:00Z",
      },
    ],
    requests: [],
  },
  {
    id: "2",
    authorId: "3",
    authorName: "Alex Kumar",
    authorRole: "Software Engineer",
    title: "Free React Workshop - Building Modern Web Apps",
    description:
      "Hosting a free workshop this Saturday on building production-ready React applications with TypeScript and modern best practices. Limited spots available!",
    roles: ["Software Engineer", "Student"],
    createdAt: "2024-01-14T15:20:00Z",
    likes: 156,
    comments: [
      {
        id: "c2",
        userId: "4",
        userName: "Emily Rodriguez",
        text: "Registered! Looking forward to it.",
        createdAt: "2024-01-14T16:00:00Z",
      },
    ],
    requests: [],
  },
  {
    id: "3",
    authorId: "4",
    authorName: "Emily Rodriguez",
    authorRole: "Data Scientist",
    title: "Internship Opportunity: ML Research at TechCorp",
    description:
      "TechCorp is hiring ML interns for summer 2024. Work on cutting-edge projects in computer vision and NLP. Great mentorship and learning opportunities.",
    roles: ["Data Scientist", "Student"],
    createdAt: "2024-01-13T09:15:00Z",
    likes: 89,
    comments: [],
    requests: [],
  },
  {
    id: "4",
    authorId: "5",
    authorName: "Michael Park",
    authorRole: "Marketing",
    title: "Growth Marketing Tips for Early Stage Startups",
    description:
      "Just published a comprehensive guide on growth marketing strategies that helped us go from 0 to 10K users in 6 months. Link in comments!",
    roles: ["Marketing", "Entrepreneur"],
    createdAt: "2024-01-12T14:45:00Z",
    likes: 203,
    comments: [
      {
        id: "c3",
        userId: "2",
        userName: "Sarah Chen",
        text: "Great insights! The customer acquisition funnel section was particularly helpful.",
        createdAt: "2024-01-12T15:30:00Z",
      },
    ],
    requests: [],
  },
]

export const MOCK_USERS = [
  {
    id: "2",
    name: "Sarah Chen",
    role: "Product Manager",
    bio: "Product leader with 8 years of experience building B2B SaaS products",
    skills: ["Product Strategy", "User Research", "Agile", "Data Analysis"],
    followers: 1234,
  },
  {
    id: "3",
    name: "Alex Kumar",
    role: "Software Engineer",
    bio: "Full-stack developer | React & Node.js enthusiast | Open source contributor",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    followers: 3421,
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    role: "Data Scientist",
    bio: "ML Engineer at TechCorp | PhD in Computer Science",
    skills: ["Machine Learning", "Python", "TensorFlow", "Computer Vision"],
    followers: 2156,
  },
  {
    id: "5",
    name: "Michael Park",
    role: "Marketing",
    bio: "Growth marketer | Helped 5 startups reach PMF",
    skills: ["Growth Marketing", "SEO", "Content Strategy", "Analytics"],
    followers: 892,
  },
]


// see the followed users(left bar bottom the filter section)
//chhange the cretea post button it is like your feed section(like fb post )
// click the post and see the detail and apply button(see the comment in post detail)
// and change the profile sectoin like my user data
// profile picture is 10 customize image in internet user can choose the random. defultis users first letter 
// signup section has repeat password
//if i apply user see the applied user and approve or reject system
// add about us page in left bar bottom

  // id: string
  // name: string
  // email: string
  // bio?: string
  // skills?: string[]
  // hobbies?: string[]
  // languages?: string[]
  // followers userId[]