/**
 * ─────────────────────────────────────────────────────
 *  COURSE DETAILS CONFIG
 *  Edit this file to update any course's page content.
 *  Keys must match the `slug` field in demoCourses.
 * ─────────────────────────────────────────────────────
 */

import { 
  Code, Database, Rocket, BarChart2, Briefcase, UserCheck, 
  Zap, BookOpen, Search, MessageSquare, Shield, Award, 
  FileText, Server, CheckCircle2, Users
} from "lucide-react";

export const COURSE_DETAILS = {

  /* ───────────────────────────────
   *  AI & Machine Learning
   * _____________________________________________*/
  "ai-machine-learning": {
    tagline: "Limited Enrollment — 2025 Cohort",
    fullDescription:
      "Go from Python basics to deploying real ML models in production. This program is built around the full data science workflow — from wrangling messy data to tuning, evaluating, and shipping models that actually work in the wild.",
    highlights: [
      "Hands-on projects with real datasets",
      "Industry-aligned curriculum from Day 1",
      "Placement support & resume referrals",
    ],
    meta: {
      duration: "5 Months",
      level: "Beginner → Intermediate",
      updated: "March 2025",
      students: "2,100+",
    },
    instructor: {
      name: "Dr. Anika Sharma",
      title: "Senior ML Engineer · Ex-Google Brain",
      avatar: null,
      bio: "Dr. Sharma has 10+ years of experience building ML systems at scale. She led the recommendation engine team at Google Brain before transitioning to education. Her philosophy: every concept must be learned by building something real.",
      socials: { linkedin: "#", mail: "anika@example.com" },
    },
    features: [
      { title: "Python First", desc: "Master Python for data science, automation, and scripting from scratch.", icon: "Code" },
      { title: "Real Datasets", desc: "Work on Kaggle-grade datasets, not toy examples.", icon: "Database" },
      { title: "Model Deployment", desc: "Ship models via FastAPI and Docker — not just Jupyter notebooks.", icon: "Rocket" },
      { title: "Math Made Simple", desc: "Linear algebra and stats explained visually with code.", icon: "BarChart2" },
      { title: "Career Support", desc: "Resume review, LinkedIn optimization, and referrals.", icon: "Briefcase" },
      { title: "Mock Interviews", desc: "Unlimited technical mock sessions with ML practitioners.", icon: "UserCheck" },
    ],
    syllabus: [
      {
        module: "Python for Data Science",
        items: ["NumPy, Pandas, and Matplotlib deep-dive", "Data cleaning and feature engineering", "OOP and scripting for automation"],
      },
      {
        module: "Supervised Learning",
        items: ["Regression: Linear, Ridge, Lasso", "Classification: Logistic, SVM, Decision Trees", "Model evaluation: cross-validation, ROC, F1"],
      },
      {
        module: "Unsupervised Learning",
        items: ["K-Means and Hierarchical Clustering", "PCA and dimensionality reduction", "Anomaly detection techniques"],
      },
      {
        module: "Capstone & Deployment",
        items: ["End-to-end project: data → model → API", "Docker containerization basics", "Monitoring models in production"],
      },
    ],
    outcomes: [
      "Build and evaluate ML models from scratch",
      "Clean and transform raw real-world datasets",
      "Deploy models via REST APIs",
      "Understand statistical foundations behind every algorithm",
    ],
    learningJourney: [
      {
        title: "Phase 1: Python & Data",
        desc: "Master the tools of the trade — Python, NumPy, Pandas — and learn to think like a data scientist.",
        img: "/assets/foundation.png",
      },
      {
        title: "Phase 2: Build & Train Models",
        desc: "Implement ML algorithms from scratch and optimize them on real industry datasets.",
        img: "/assets/build.png",
      },
      {
        title: "Phase 3: Deploy & Get Hired",
        desc: "Ship your model, build your portfolio, and enter our placement pipeline.",
        img: "/assets/career.png",
      },
    ],
    faqs: [
      { q: "Do I need prior coding experience?", a: "No. The course starts from Python basics. Comfort with basic math is helpful but not required." },
      { q: "How long is the program?", a: "5 months of structured learning, followed by 1 month of placement support." },
      { q: "Is there a certificate?", a: "Yes — an industry-recognized certificate is issued upon successful completion of the capstone project." },
      { q: "What tools will I use?", a: "Python, Jupyter, scikit-learn, FastAPI, Docker. All tools are free and open-source." },
      { q: "Are sessions live or recorded?", a: "Both. Live sessions are held twice a week and are recorded for later access." },
      { q: "What is the fee structure?", a: "A one-time enrollment fee with an optional EMI plan. Career success guarantee included." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1518186239751-2477cf795151?auto=format&fit=crop&w=800&q=80",
  },

  /* ───────────────────────────────
   *  Mathematics for ML
   * ─────────────────────────────── */
  "ml-mathematics": {
    tagline: "The Foundation of AI",
    fullDescription:
      "Master the essential mathematics required to understand and build machine learning models. We cover Linear Algebra, Calculus, and Probability with a focus on how they apply to gradients, loss functions, and optimization.",
    highlights: [
      "Visual explanations of complex math",
      "Python-based math implementations",
      "Directly apply math to ML models",
    ],
    meta: {
      duration: "2 Months",
      level: "Beginner",
      updated: "March 2025",
      students: "2,100+",
    },
    instructor: {
      name: "Nikky Bisen",
      title: "AI Specialist & Educator",
      avatar: null,
      bio: "Nikky has a passion for making complex topics accessible. With years of experience in AI education, he focuses on the 'why' behind the math to help students build a deep intuition for algorithms.",
      socials: { linkedin: "#", mail: "nikky@example.com" },
    },
    features: [
      { title: "Visual Learning", desc: "Understand linear algebra through geometric intuition and code.", icon: "BarChart2" },
      { title: "Calculus for ML", desc: "Master partial derivatives and chain rule for backpropagation.", icon: "Zap" },
      { title: "Probability", desc: "Learn Bayes' theorem and distributions for statistical modeling.", icon: "Search" },
      { title: "Optimization", desc: "Implement gradient descent from scratch using calculus.", icon: "Rocket" },
    ],
    syllabus: [
      {
        module: "Linear Algebra",
        items: ["Vectors, Matrices, and Tensors", "Matrix Multiplication and Inverses", "Eigenvalues and Eigenvectors"],
      },
      {
        module: "Calculus",
        items: ["Derivatives and Gradients", "Chain Rule & Backpropagation", "Vector Calculus basics"],
      },
      {
        module: "Probability & Stats",
        items: ["Bayesian Inference", "Gaussian Distributions", "Maximum Likelihood Estimation"],
      },
    ],
    outcomes: [
      "Read and understand ML research papers",
      "Implement optimization algorithms from scratch",
      "Understand how loss functions actually work",
      "Build a solid foundation for Deep Learning",
    ],
    learningJourney: [
      { title: "Phase 1: Linear Algebra", desc: "Master the language of data and matrices.", img: "https://images.unsplash.com/photo-1509228468518-180dd482195b?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Calculus", desc: "Learn how models learn through gradients.", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Statistics", desc: "Understand uncertainty and data distributions.", img: "https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Is this course for mathematicians?", a: "No. This is math for engineers. We focus on application and intuition using Python." },
      { q: "Do I need to be good at math?", a: "Just high-school level math is enough. We build everything else from the ground up." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1518186239751-2477cf795151?auto=format&fit=crop&w=800&q=80",
  },

  /* ───────────────────────────────
   *  Deep Learning
   * ─────────────────────────────── */
  "deep-learning-mastery": {
    tagline: "Advanced Track — Prerequisites Apply",
    fullDescription:
      "A rigorous deep dive into neural networks, CNNs, RNNs, Transformers, and beyond. Built for those who already know ML and want to operate at the frontier of AI research and enterprise deployment.",
    highlights: [
      "Train models on GPUs via cloud labs",
      "Implement papers from scratch",
      "Enterprise deployment with TensorFlow Serving",
    ],
    meta: {
      duration: "6 Months",
      level: "Intermediate → Advanced",
      updated: "April 2025",
      students: "890+",
    },
    instructor: {
      name: "Prof. Rajeev Menon",
      title: "AI Researcher · NeurIPS Contributor",
      avatar: null,
      bio: "Rajeev has published 14 papers in top-tier AI venues including NeurIPS and ICML. He spent 8 years at DeepMind before founding this program. His approach: understand the math, then the code.",
      socials: { linkedin: "#", mail: "rajeev@example.com" },
    },
    features: [
      { title: "GPU Cloud Labs", desc: "Train on real GPU instances — no expensive hardware needed.", icon: "Zap" },
      { title: "Paper Implementation", desc: "Reproduce landmark papers: ResNet, BERT, Diffusion Models.", icon: "BookOpen" },
      { title: "Computer Vision", desc: "CNNs, object detection, image segmentation from the ground up.", icon: "Search" },
      { title: "NLP Track", desc: "RNNs, LSTMs, Attention, and Transformer architectures.", icon: "MessageSquare" },
      { title: "MLOps Basics", desc: "Versioning, experiment tracking with MLflow and W&B.", icon: "Shield" },
      { title: "Research Guidance", desc: "Optional track for students interested in publishing.", icon: "Award" },
    ],
    syllabus: [
      {
        module: "Neural Network Foundations",
        items: ["Backpropagation from scratch in NumPy", "Activation functions and weight initialization", "Regularization: Dropout, BatchNorm, L2"],
      },
      {
        module: "Computer Vision with CNNs",
        items: ["LeNet → VGG → ResNet → EfficientNet", "Transfer learning and fine-tuning", "YOLO and Faster R-CNN for detection"],
      },
      {
        module: "Sequence Models & Transformers",
        items: ["RNNs, LSTMs, GRUs", "Attention mechanism and self-attention", "BERT, GPT architecture from scratch"],
      },
      {
        module: "Advanced Topics & Deployment",
        items: ["Diffusion models and GANs overview", "TensorFlow Serving + TorchServe", "Quantization, pruning, and ONNX export"],
      },
    ],
    outcomes: [
      "Implement CNNs, RNNs, and Transformers from scratch",
      "Fine-tune pretrained models for custom tasks",
      "Deploy deep learning models at production scale",
      "Read and reproduce AI research papers confidently",
    ],
    learningJourney: [
      {
        title: "Phase 1: Neural Network Core",
        desc: "Build backpropagation and gradient descent from scratch before touching any framework.",
        img: "/assets/foundation.png",
      },
      {
        title: "Phase 2: Architecture Mastery",
        desc: "Implement CNNs, Transformers, and GANs on real vision and language tasks.",
        img: "/assets/build.png",
      },
      {
        title: "Phase 3: Ship & Publish",
        desc: "Deploy your model, build a research portfolio, and enter our placement pipeline.",
        img: "/assets/career.png",
      },
    ],
    faqs: [
      { q: "What are the prerequisites?", a: "You should be comfortable with Python and basic ML (linear regression, classification). Calculus and linear algebra knowledge helps." },
      { q: "Which framework is used?", a: "PyTorch is the primary framework. TensorFlow is introduced for deployment." },
      { q: "Can I join if I am working full-time?", a: "Yes. Sessions are held on weekends with recordings available 24/7." },
      { q: "Is there GPU access?", a: "Yes — all students get cloud GPU credits for training experiments throughout the course." },
    ],
    isVapt: false,
    mindmapImage: "/assets/ai_mindmap.png",
  },

  /* ───────────────────────────────
   *  Generative AI
   * ─────────────────────────────── */
  "generative-ai-production": {
    tagline: "Most In-Demand Track · 2025",
    fullDescription:
      "Master the production side of Generative AI. From fine-tuning LLMs and building RAG pipelines to orchestrating multi-agent systems — this program is built for engineers who want to ship GenAI products, not just demo them.",
    highlights: [
      "Fine-tune open-source LLMs (Mistral, LLaMA)",
      "Build RAG systems with vector databases",
      "Deploy AI agents end-to-end",
    ],
    meta: {
      duration: "4 Months",
      level: "Intermediate",
      updated: "May 2025",
      students: "1,450+",
    },
    instructor: {
      name: "Sanya Kapoor",
      title: "GenAI Lead Engineer · Ex-OpenAI",
      avatar: null,
      bio: "Sanya spent 4 years at OpenAI working on fine-tuning infrastructure before joining the startup ecosystem. She has shipped GenAI products used by 500k+ users and brings that production mindset directly into the curriculum.",
      socials: { linkedin: "#", mail: "sanya@example.com" },
    },
    features: [
      { title: "LLM Fine-Tuning", desc: "QLoRA and LoRA fine-tuning on Mistral, LLaMA 3, Gemma.", icon: "Zap" },
      { title: "RAG Pipelines", desc: "Build retrieval-augmented generation with Pinecone and ChromaDB.", icon: "Database" },
      { title: "Agent Orchestration", desc: "Multi-step AI agents using LangChain and LlamaIndex.", icon: "Rocket" },
      { title: "Cost Optimization", desc: "Cut LLM inference costs with caching, batching, and quantization.", icon: "BarChart2" },
      { title: "Prompt Engineering", desc: "Advanced prompting: CoT, ReAct, DSPy frameworks.", icon: "MessageSquare" },
      { title: "Product Deployment", desc: "Ship full-stack GenAI apps with FastAPI + Next.js.", icon: "Briefcase" },
    ],
    syllabus: [
      {
        module: "LLM Fundamentals",
        items: ["Transformer architecture deep-dive", "Tokenization, embeddings, and attention", "Overview of GPT-4, Claude, Gemini, Mistral"],
      },
      {
        module: "Fine-Tuning & Alignment",
        items: ["Supervised fine-tuning (SFT) with Hugging Face", "Parameter-efficient fine-tuning: LoRA, QLoRA", "RLHF and DPO basics"],
      },
      {
        module: "RAG & Vector Search",
        items: ["Embedding models and vector databases", "Chunking strategies and hybrid search", "Evaluation: RAGAS, faithfulness, relevance"],
      },
      {
        module: "AI Agents & Deployment",
        items: ["Tool-use and function calling", "Multi-agent orchestration with LangGraph", "Production deployment on AWS / GCP"],
      },
    ],
    outcomes: [
      "Fine-tune open-source LLMs for custom domains",
      "Build production RAG systems with vector databases",
      "Orchestrate multi-step AI agent workflows",
      "Reduce LLM inference costs by 60%+ in production",
    ],
    learningJourney: [
      {
        title: "Phase 1: LLM Internals",
        desc: "Understand how large language models actually work before touching the API.",
        img: "/assets/foundation.png",
      },
      {
        title: "Phase 2: Build & Fine-Tune",
        desc: "Fine-tune real models, build RAG pipelines, and deploy your first AI agent.",
        img: "/assets/build.png",
      },
      {
        title: "Phase 3: Ship a Product",
        desc: "Launch a full-stack GenAI product and enter the placement program.",
        img: "/assets/career.png",
      },
    ],
    faqs: [
      { q: "Do I need to own a GPU?", a: "No. All fine-tuning labs run on cloud GPUs (Google Colab Pro, RunPod) included in your enrollment." },
      { q: "Which LLMs are covered?", a: "Mistral 7B, LLaMA 3 8B/70B, Gemma, and via API: GPT-4o and Claude 3.5." },
      { q: "Is this for developers or researchers?", a: "Primarily for developers and engineers who want to build and ship products." },
      { q: "What is the project at the end?", a: "You build and deploy a full GenAI application — a domain-specific chatbot or AI agent — that goes into your portfolio." },
    ],
    isVapt: false,
    mindmapImage: "/assets/ai_mindmap.png",
  },

  /* ───────────────────────────────
   *  Cybersecurity / VAPT
   * ─────────────────────────────── */
  "cybersecurity-vapt": {
    tagline: "Professional VAPT Certification Track",
    fullDescription:
      "Train under the Vulnerability Assessment and Penetration Testing framework used by security professionals worldwide. This program covers the full attack lifecycle — reconnaissance, exploitation, forensics, and formal compliance reporting.",
    highlights: [
      "Work inside a live VAPT lab environment",
      "Conduct real penetration tests ethically",
      "Prepare for CEH and OSCP certifications",
    ],
    meta: {
      duration: "6 Months",
      level: "Beginner → Professional",
      updated: "February 2025",
      students: "670+",
    },
    instructor: {
      name: "Arjun Tiwari",
      title: "Certified Ethical Hacker · OSCP · CISSP",
      avatar: null,
      bio: "Arjun is a full-spectrum security professional with certifications in CEH, OSCP, and CISSP. He spent 8 years running red-team operations for Fortune 500 companies before launching this training program. His labs are based on real-world attack scenarios.",
      socials: { linkedin: "#", mail: "arjun@example.com" },
    },
    features: [
      { title: "VAPT Framework", desc: "Professional VA/PT methodology used in real security audits.", icon: "Shield" },
      { title: "Live Lab Env", desc: "Practice on intentionally vulnerable systems — legally.", icon: "Server" },
      { title: "Digital Forensics", desc: "Evidence collection, chain of custody, incident response.", icon: "Search" },
      { title: "Compliance", desc: "ISO 27001, GDPR, and PCI-DSS compliance frameworks.", icon: "CheckCircle2" },
      { title: "Report Writing", desc: "Professional audit reports that meet enterprise standards.", icon: "FileText" },
      { title: "Cert Prep", desc: "CEH and OSCP exam prep included in the curriculum.", icon: "Award" },
    ],
    syllabus: [
      {
        module: "Networking & Recon",
        items: ["TCP/IP deep-dive and packet analysis with Wireshark", "Passive and active reconnaissance (Shodan, Maltego)", "Network scanning with Nmap and Masscan"],
      },
      {
        module: "Exploitation & Post-Exploitation",
        items: ["Metasploit framework and manual exploits", "Privilege escalation on Linux and Windows", "Persistence, lateral movement, pivoting"],
      },
      {
        module: "Digital Forensics & IR",
        items: ["Disk imaging and memory forensics (Autopsy, Volatility)", "Log analysis and timeline reconstruction", "Incident response playbooks"],
      },
      {
        module: "Compliance & Reporting",
        items: ["CVSS scoring and risk classification", "Writing executive and technical audit reports", "ISO 27001 and PCI-DSS audit walkthroughs"],
      },
    ],
    outcomes: [
      "Conduct full VAPT engagements end-to-end",
      "Exploit and patch common vulnerabilities (OWASP Top 10)",
      "Perform digital forensics and incident response",
      "Produce professional-grade security audit reports",
    ],
    learningJourney: [
      {
        title: "Phase 1: Foundations & Recon",
        desc: "Learn networking internals and the methodologies used by real-world red teams.",
        img: "/assets/foundation.png",
      },
      {
        title: "Phase 2: Exploit & Defend",
        desc: "Attack and defend intentionally vulnerable systems in a controlled lab environment.",
        img: "/assets/build.png",
      },
      {
        title: "Phase 3: Certify & Place",
        desc: "Prepare for CEH/OSCP, write your first audit report, and enter the placement program.",
        img: "/assets/career.png",
      },
    ],
    faqs: [
      { q: "Is ethical hacking legal in this course?", a: "Yes. All hacking activities take place on systems you are explicitly authorized to test, inside a dedicated lab environment." },
      { q: "Which certifications does this prepare me for?", a: "CEH (Certified Ethical Hacker) and OSCP (Offensive Security Certified Professional)." },
      { q: "Do I need networking knowledge?", a: "Basic networking (TCP/IP, subnets) is helpful. The course starts with a networking module to get everyone up to speed." },
      { q: "Is there job placement?", a: "Yes. We have partnerships with security firms and placement support is included for all graduates." },
      { q: "What OS is used?", a: "Kali Linux is the primary operating system. A pre-configured VM is provided." },
    ],
    isVapt: true,
    mindmapImage: "/assets/vapt_mindmap.png",
  },

  /* ───────────────────────────────
   *  Data & Business Analytics
   * ─────────────────────────────── */
  "data-business-analytics": {
    tagline: "Business-Focused · No Coding Required",
    fullDescription:
      "Transform raw business data into decisions that move the needle. This program bridges the gap between data tools and business strategy — ideal for analysts, managers, and anyone who works with data but isn't a software engineer.",
    highlights: [
      "Master Power BI, Tableau, and SQL",
      "Build executive-ready dashboards",
      "AI-driven analytics with Copilot & ChatGPT",
    ],
    meta: {
      duration: "3 Months",
      level: "Beginner → Analyst",
      updated: "April 2025",
      students: "3,200+",
    },
    instructor: {
      name: "Priya Nair",
      title: "Head of Analytics · Ex-McKinsey",
      avatar: null,
      bio: "Priya spent 7 years as a data analyst at McKinsey & Company, advising Fortune 100 clients on data strategy. She has trained over 8,000 professionals in analytics and BI tools. Her teaching style: real business cases, zero fluff.",
      socials: { linkedin: "#", mail: "priya@example.com" },
    },
    features: [
      { title: "Power BI Mastery", desc: "Build interactive dashboards from raw Excel and SQL data.", icon: "BarChart2" },
      { title: "SQL for Analysts", desc: "Write queries that actually answer business questions.", icon: "Database" },
      { title: "Storytelling", desc: "Present data insights to non-technical stakeholders.", icon: "MessageSquare" },
      { title: "AI Analytics", desc: "Use ChatGPT and Copilot to speed up your analysis workflow.", icon: "Zap" },
      { title: "Excel Advanced", desc: "PivotTables, Power Query, and advanced formulas.", icon: "FileText" },
      { title: "Career Placement", desc: "Resume and portfolio tailored for analytics roles.", icon: "Briefcase" },
    ],
    syllabus: [
      {
        module: "Data Foundations & Excel",
        items: ["Data types, cleaning, and transformation", "Advanced Excel: PivotTables, XLOOKUP, Power Query", "Statistical thinking for business analysts"],
      },
      {
        module: "SQL for Business Intelligence",
        items: ["SELECT, JOIN, GROUP BY, subqueries", "Window functions for analytics", "Connecting SQL to BI tools"],
      },
      {
        module: "Visualization & Dashboards",
        items: ["Power BI: data modeling, DAX, report design", "Tableau: calculated fields and story points", "Dashboard design principles for executives"],
      },
      {
        module: "AI-Assisted Analytics",
        items: ["ChatGPT for data interpretation and reporting", "Copilot in Excel and Power BI", "Python basics for analysts (optional track)"],
      },
    ],
    outcomes: [
      "Build Power BI and Tableau dashboards from scratch",
      "Write SQL queries to extract business insights",
      "Present data stories to executive stakeholders",
      "Use AI tools to accelerate the analytics workflow by 3×",
    ],
    learningJourney: [
      {
        title: "Phase 1: Data Fluency",
        desc: "Get comfortable with Excel, SQL, and the core mindset of a data analyst.",
        img: "/assets/foundation.png",
      },
      {
        title: "Phase 2: Build Dashboards",
        desc: "Create interactive Power BI and Tableau dashboards from real business datasets.",
        img: "/assets/build.png",
      },
      {
        title: "Phase 3: Present & Place",
        desc: "Build your analytics portfolio, prepare for interviews, and enter the placement program.",
        img: "/assets/career.png",
      },
    ],
    faqs: [
      { q: "Do I need to know coding?", a: "No. This program is designed for non-programmers. Python is an optional add-on track." },
      { q: "Which tools are taught?", a: "Power BI, Tableau, SQL (MySQL/PostgreSQL), Excel, and AI tools (ChatGPT, Copilot)." },
      { q: "What kind of jobs can I get?", a: "Data Analyst, Business Analyst, BI Developer, Product Analyst. Average starting salary: ₹6–10 LPA." },
      { q: "Is there a certificate?", a: "Yes — a completion certificate and a portfolio project that can be shared on LinkedIn." },
    ],
    isVapt: false,
    mindmapImage: "/assets/ai_mindmap.png",
  },
};

/**
 * Helper — returns detail config for a slug, or a safe fallback.
 * Usage: const detail = getCourseDetail(slug);
 */
export function getCourseDetail(slug) {
  return (
    COURSE_DETAILS[slug] ?? {
      tagline: "Upcoming Program",
      fullDescription: "Full details coming soon. Contact us for early access.",
      highlights: ["Expert-led curriculum", "Hands-on projects", "Placement support"],
      meta: { duration: "TBD", level: "All Levels", updated: "2025", students: "—" },
      instructor: {
        name: "TBD",
        title: "Industry Expert",
        avatar: null,
        bio: "Instructor details will be announced shortly.",
        socials: {},
      },
      features: [],
      syllabus: [{ module: "Details coming soon", items: ["Full syllabus will be published before enrollment opens."] }],
      outcomes: ["Full details coming soon."],
      learningJourney: [
        { title: "Phase 1", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80" },
        { title: "Phase 2", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1518186239751-2477cf795151?auto=format&fit=crop&w=800&q=80" },
        { title: "Phase 3", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" },
      ],
      faqs: [{ q: "When does this course start?", a: "Details will be announced shortly. Register your interest to be notified." }],
      isVapt: false,
      mindmapImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    }
  );
}
