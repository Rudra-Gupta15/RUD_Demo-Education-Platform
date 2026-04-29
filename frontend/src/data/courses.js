export const demoCourses = [
  // Generative AI
  { id: 1, topic: "Generative AI", title: "Generative AI Mastery: From Prompt Engineering to LLM Ops", instructor: "Dr. Aris Thorne", rating: 4.8, reviews: 12450, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: ["Premium", "Bestseller"] },
  { id: 2, topic: "Generative AI", title: "Advanced Prompt Engineering & Vector Databases", instructor: "Sarah Jenkins", rating: 4.7, reviews: 8940, price: "₹579.00", originalPrice: "₹3,469.00", image: "/program_genai.png", badges: ["Premium"] },
  { id: 3, topic: "Generative AI", title: "Building AI Agents with LangChain and LlamaIndex", instructor: "Alex Rivera", rating: 4.9, reviews: 5120, price: "₹719.00", originalPrice: "₹4,339.00", image: "/program_genai.png", badges: ["Bestseller"] },
  { id: 4, topic: "Generative AI", title: "Fine-Tuning LLMs on Custom Datasets", instructor: "Michael Chang", rating: 4.6, reviews: 3100, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: ["Premium"] },
  { id: 5, topic: "Generative AI", title: "AI-Powered Application Development", instructor: "David Smith", rating: 4.5, reviews: 2200, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: [] },
  { id: 6, topic: "Generative AI", title: "Generative AI for Business Leaders", instructor: "Emma Watson", rating: 4.8, reviews: 1500, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: ["Bestseller"] },
  { id: 7, topic: "Generative AI", title: "Ethics and Safety in Generative AI", instructor: "Dr. Lisa Ray", rating: 4.7, reviews: 950, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: [] },

  // AI & Machine Learning
  { id: 8, topic: "AI & Machine Learning", title: "Machine Learning Engineering for Production (MLOps)", instructor: "Andrew Ng", rating: 4.9, reviews: 45120, price: "₹529.00", originalPrice: "₹799.00", image: "/program_genai.png", badges: ["Premium", "Bestseller"] },
  { id: 9, topic: "AI & Machine Learning", title: "Deep Learning Specialization: Neural Networks", instructor: "Jose Portilla", rating: 4.6, reviews: 56034, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: ["Premium"] },
  { id: 10, topic: "AI & Machine Learning", title: "Computer Vision and NLP with PyTorch", instructor: "Daniel Bourke", rating: 4.8, reviews: 12130, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: ["Premium"] },
  { id: 11, topic: "AI & Machine Learning", title: "TensorFlow Developer Certificate Bootcamp", instructor: "Andrei Neagoie", rating: 4.7, reviews: 8500, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: ["Bestseller"] },
  { id: 12, topic: "AI & Machine Learning", title: "Reinforcement Learning: Zero to Hero", instructor: "Phil Tabor", rating: 4.5, reviews: 3200, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: [] },
  { id: 13, topic: "AI & Machine Learning", title: "Feature Engineering for Machine Learning", instructor: "Soledad Galli", rating: 4.6, reviews: 2100, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: [] },
  { id: 14, topic: "AI & Machine Learning", title: "Math for Machine Learning: Linear Algebra", instructor: "Imperial College", rating: 4.8, reviews: 15000, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: ["Premium"] },

  // Data Science & Business Analytics
  { id: 15, topic: "Data Science & Business Analytics", title: "Data Science Bootcamp: Python, Pandas & SQL", instructor: "Kirill Eremenko", rating: 4.7, reviews: 24100, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: ["Premium", "Bestseller"] },
  { id: 16, topic: "Data Science & Business Analytics", title: "Business Analytics: Predictive Modeling with R", instructor: "Prof. David Brown", rating: 4.5, reviews: 8500, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: ["Premium"] },
  { id: 17, topic: "Data Science & Business Analytics", title: "Tableau & Power BI for Data Visualization", instructor: "Maven Analytics", rating: 4.8, reviews: 35000, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: ["Bestseller"] },
  { id: 18, topic: "Data Science & Business Analytics", title: "Statistics for Data Science and Business", instructor: "365 Data Science", rating: 4.6, reviews: 12000, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: [] },
  { id: 19, topic: "Data Science & Business Analytics", title: "SQL for Data Analytics: MySQL & PostgreSQL", instructor: "Colt Steele", rating: 4.9, reviews: 45000, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: ["Premium", "Bestseller"] },
  { id: 20, topic: "Data Science & Business Analytics", title: "Financial Modeling and Valuation", instructor: "365 Careers", rating: 4.7, reviews: 25000, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: ["Premium"] },
  { id: 21, topic: "Data Science & Business Analytics", title: "Big Data with Spark and Hadoop", instructor: "Frank Kane", rating: 4.5, reviews: 8000, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_genai.png", badges: [] },

  // Project Management
  { id: 22, topic: "Project Management", title: "PMP® Certification Training & Exam Prep", instructor: "Andrew Ramdayal", rating: 4.9, reviews: 45120, price: "₹529.00", originalPrice: "₹799.00", image: "/program_pmp.png", badges: ["Premium", "Bestseller"] },
  { id: 23, topic: "Project Management", title: "Agile & Scrum Master Certification", instructor: "Scrum.org", rating: 4.7, reviews: 10500, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_pmp.png", badges: ["Premium"] },
  { id: 24, topic: "Project Management", title: "Product Management: Build, Launch, and Scale", instructor: "Cole Mercer", rating: 4.6, reviews: 15200, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_pmp.png", badges: ["Bestseller"] },
  { id: 25, topic: "Project Management", title: "Six Sigma Green Belt Certification", instructor: "Craig Setter", rating: 4.5, reviews: 5200, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_pmp.png", badges: [] },
  { id: 26, topic: "Project Management", title: "JIRA Masterclass: Agile Project Management", instructor: "Krystian Kaczor", rating: 4.8, reviews: 18000, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_pmp.png", badges: ["Premium"] },
  { id: 27, topic: "Project Management", title: "CAPM® Certification Exam Prep", instructor: "Joseph Phillips", rating: 4.7, reviews: 12000, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_pmp.png", badges: [] },
  { id: 28, topic: "Project Management", title: "Risk Management Professional (PMI-RMP)", instructor: "Tris Carpenter", rating: 4.6, reviews: 3000, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_pmp.png", badges: [] },

  // Cyber Security
  { id: 29, topic: "Cyber Security", title: "Ethical Hacking: Zero to Hero in Penetration Testing", instructor: "Sarah Jenkins", rating: 4.7, reviews: 8940, price: "₹579.00", originalPrice: "₹3,469.00", image: "/program_cyber.png", badges: ["Premium"] },
  { id: 30, topic: "Cyber Security", title: "CompTIA Security+ (SY0-701) Complete Course", instructor: "Jason Dion", rating: 4.8, reviews: 65000, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_cyber.png", badges: ["Premium", "Bestseller"] },
  { id: 31, topic: "Cyber Security", title: "Cloud Security Architecture (CCSP Prep)", instructor: "Gwen Bettwy", rating: 4.6, reviews: 3200, price: "₹719.00", originalPrice: "₹4,339.00", image: "/program_cyber.png", badges: ["Bestseller"] },
  { id: 32, topic: "Cyber Security", title: "CISSP Certification All-in-One Exam Guide", instructor: "Thor Pedersen", rating: 4.9, reviews: 15000, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_cyber.png", badges: ["Premium", "Bestseller"] },
  { id: 33, topic: "Cyber Security", title: "Network Security & Wireshark Analysis", instructor: "Chris Greer", rating: 4.7, reviews: 8500, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_cyber.png", badges: [] },
  { id: 34, topic: "Cyber Security", title: "Python for Cyber Security & Ethical Hacking", instructor: "Zaid Sabih", rating: 4.8, reviews: 22000, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_cyber.png", badges: ["Premium"] },
  { id: 35, topic: "Cyber Security", title: "Incident Response and Threat Hunting", instructor: "John Strand", rating: 4.6, reviews: 4100, price: "₹529.00", originalPrice: "₹3,199.00", image: "/program_cyber.png", badges: [] }
];
