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

export const MOCK_REQUESTS: PostRequest[] = [
  {
    userId: "3",
    userName: "Alex Kumar",
    userRole: "Software Engineer",
    status: "pending",
    createdAt: "2024-01-16T09:00:00Z",
  },
  {
    userId: "4",
    userName: "Emily Rodriguez",
    userRole: "Data Scientist",
    status: "accepted",
    createdAt: "2024-01-15T17:45:00Z",
  },
  {
    userId: "5",
    userName: "Michael Park",
    userRole: "Marketing",
    status: "rejected",
    createdAt: "2024-01-14T13:20:00Z",
  },
  {
    userId: "2",
    userName: "Sarah Chen",
    userRole: "Product Manager",
    status: "pending",
    createdAt: "2024-01-16T12:10:00Z",
  },
]

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
  likedBy: string[]
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
    authorId: "1",
    authorName: "Demo User",
    authorRole: "Software Engineer",
    title: "Looking for UX Designer for a SaaS startup",
    description:
      "We are building an AI-powered analytics platform and looking for a talented UX designer to join our team. Remote-friendly, competitive salary.",
    roles: ["Designer", "Entrepreneur"],
    createdAt: "2024-01-15T10:30:00Z",
    likes: 24,
    likedBy: [],
    comments: [
      {
        id: "c1",
        userId: "3",
        userName: "Alex Kumar",
        text: "This sounds like a great opportunity! Are you open to part-time designers?",
        createdAt: "2024-01-15T11:30:00Z",
      },
    ],
    requests: MOCK_REQUESTS,
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
    likedBy: [],
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
    likedBy: [],
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
    likedBy: [],
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
    hobbies: ["Reading", "Hiking", "Photography"],
    languages: ["English", "Mandarin"],
    followers: 1234,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    experience: [
      {
        position: "Senior Product Manager",
        company: "TechFlow Inc",
        startDate: "2020",
        endDate: null,
        description: "Leading product strategy for B2B analytics platform",
      },
      {
        position: "Product Manager",
        company: "StartupCo",
        startDate: "2016",
        endDate: "2020",
        description: "Built and launched 3 major product features",
      },
    ],
    education: [
      {
        degree: "MBA",
        field: "Business Administration",
        school: "Stanford University",
        startYear: "2014",
        endYear: "2016",
      },
      {
        degree: "BS",
        field: "Computer Science",
        school: "UC Berkeley",
        startYear: "2010",
        endYear: "2014",
      },
    ],
  },
  {
    id: "3",
    name: "Alex Kumar",
    role: "Software Engineer",
    bio: "Full-stack developer | React & Node.js enthusiast | Open source contributor",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    hobbies: ["Gaming", "Coding", "Coffee"],
    languages: ["English", "Hindi"],
    followers: 3421,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    experience: [
      {
        position: "Senior Software Engineer",
        company: "Google",
        startDate: "2021",
        endDate: null,
        description: "Working on cloud infrastructure and microservices",
      },
    ],
    education: [
      {
        degree: "BS",
        field: "Software Engineering",
        school: "MIT",
        startYear: "2017",
        endYear: "2021",
      },
    ],
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    role: "Data Scientist",
    bio: "ML Engineer at TechCorp | PhD in Computer Science",
    skills: ["Machine Learning", "Python", "TensorFlow", "Computer Vision"],
    hobbies: ["Running", "Painting", "Travel"],
    languages: ["English", "Spanish"],
    followers: 2156,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    experience: [
      {
        position: "ML Engineer",
        company: "TechCorp",
        startDate: "2022",
        endDate: null,
        description: "Developing computer vision models for autonomous systems",
      },
    ],
    education: [
      {
        degree: "PhD",
        field: "Computer Science",
        school: "Carnegie Mellon University",
        startYear: "2018",
        endYear: "2022",
      },
      {
        degree: "BS",
        field: "Computer Science",
        school: "UCLA",
        startYear: "2014",
        endYear: "2018",
      },
    ],
  },
  {
    id: "5",
    name: "Michael Park",
    role: "Marketing",
    bio: "Growth marketer | Helped 5 startups reach PMF",
    skills: ["Growth Marketing", "SEO", "Content Strategy", "Analytics"],
    hobbies: ["Writing", "Music", "Cooking"],
    languages: ["English", "Korean"],
    followers: 892,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    experience: [
      {
        position: "Head of Growth",
        company: "GrowthLab",
        startDate: "2020",
        endDate: null,
        description: "Led marketing strategy for 5 successful startups",
      },
    ],
    education: [
      {
        degree: "BA",
        field: "Marketing",
        school: "NYU",
        startYear: "2016",
        endYear: "2020",
      },
    ],
  },
]
// see the followinf users in profile
// add experieces education in profile
// if the login ask the eroles like reddit
//
