/**
 * ─────────────────────────────────────────────────────
 *  COURSE DETAILS CONFIG
 *  Every slug from demoCourses has its own entry here.
 *  Keys must match the `slug` field in demoCourses.
 * ─────────────────────────────────────────────────────
 */

export const COURSE_DETAILS = {

  /* ─────────────────────────────────────────────────────
   *  AI & MACHINE LEARNING  (id: 1)
   * ───────────────────────────────────────────────────── */
  "ai-machine-learning": {
    tagline: "Limited Enrollment — 2025 Cohort",
    fullDescription:
      "Go from Python basics to deploying real ML models in production. This program is built around the full data science workflow — from wrangling messy data to tuning, evaluating, and shipping models that actually work in the wild.",
    highlights: [
      "Hands-on projects with real datasets",
      "Industry-aligned curriculum from Day 1",
      "Placement support & resume referrals",
    ],
    meta: { duration: "5 Months", level: "Beginner → Intermediate", updated: "March 2025", students: "2,100+" },
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
      { module: "Python for Data Science", items: ["NumPy, Pandas, and Matplotlib deep-dive", "Data cleaning and feature engineering", "OOP and scripting for automation"] },
      { module: "Supervised Learning", items: ["Regression: Linear, Ridge, Lasso", "Classification: Logistic, SVM, Decision Trees", "Model evaluation: cross-validation, ROC, F1"] },
      { module: "Unsupervised Learning", items: ["K-Means and Hierarchical Clustering", "PCA and dimensionality reduction", "Anomaly detection techniques"] },
      { module: "Capstone & Deployment", items: ["End-to-end project: data → model → API", "Docker containerization basics", "Monitoring models in production"] },
    ],
    outcomes: [
      "Build and evaluate ML models from scratch",
      "Clean and transform raw real-world datasets",
      "Deploy models via REST APIs",
      "Understand statistical foundations behind every algorithm",
    ],
    learningJourney: [
      { title: "Phase 1: Python & Data Architecture", desc: "Master the foundational data toolkit—Python, NumPy, Pandas—and engineer robust data pipelines.", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Neural Network Engineering", desc: "Design, train, and optimize ML algorithms using real-world enterprise datasets.", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Model Scale & Deployment", desc: "Ship intelligent models to production via Docker & FastAPI, building a portfolio for top-tier hiring.", img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Do I need prior coding experience?", a: "No. The course starts from Python basics. Comfort with basic math is helpful but not required." },
      { q: "How long is the program?", a: "5 months of structured learning, followed by 1 month of placement support." },
      { q: "Is there a certificate?", a: "Yes — an industry-recognized certificate is issued upon successful completion of the capstone project." },
      { q: "What tools will I use?", a: "Python, Jupyter, scikit-learn, FastAPI, Docker. All tools are free and open-source." },
      { q: "Are sessions live or recorded?", a: "Both. Live sessions are held twice a week and are recorded for later access." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  PYTHON AUTOMATION FOR AI (id: 101)
   * ───────────────────────────────────────────────────── */
  "python-automation-ai": {
    tagline: "Automate Everything with Python",
    fullDescription:
      "Stop doing repetitive work manually. This course teaches you to write Python scripts that automate file handling, web scraping, browser control, and AI API calls — so you can spend time on work that actually matters.",
    highlights: [
      "Automate real tasks from day one",
      "Integrate OpenAI, Gemini & HuggingFace APIs",
      "Ship 6 automation projects to your portfolio",
    ],
    meta: { duration: "6 Weeks", level: "Beginner", updated: "April 2025", students: "850+" },
    instructor: {
      name: "Rudra Gupta",
      title: "AI Engineer & Automation Specialist",
      avatar: null,
      bio: "Rudra builds production automation tools and AI-powered workflows. He has shipped multiple AI SaaS tools and Chrome extensions. His teaching style is blunt, project-first, and zero fluff.",
      socials: { linkedin: "#", mail: "rudra@example.com" },
    },
    features: [
      { title: "File Automation", desc: "Auto-organize, rename, and process thousands of files in seconds.", icon: "FileText" },
      { title: "Web Scraping", desc: "Extract data from any website using BeautifulSoup and Playwright.", icon: "Search" },
      { title: "AI API Integration", desc: "Plug OpenAI, Gemini, and HuggingFace APIs into your scripts.", icon: "Zap" },
      { title: "Email & Slack Bots", desc: "Build bots that send automated emails and Slack notifications.", icon: "MessageSquare" },
      { title: "Scheduled Tasks", desc: "Use cron jobs and task schedulers to run scripts on autopilot.", icon: "Code" },
      { title: "Portfolio Projects", desc: "6 deployable automation projects that employers will notice.", icon: "Rocket" },
    ],
    syllabus: [
      { module: "Scripting Basics", items: ["File and folder automation", "Working with CSVs and JSON", "Error handling and logging"] },
      { module: "Task Automation", items: ["Browser automation with Playwright", "Web scraping with BeautifulSoup", "Email automation with smtplib"] },
      { module: "AI API Integration", items: ["OpenAI GPT API calls", "Building a CLI AI assistant", "Gemini & HuggingFace inference"] },
      { module: "Deployment & Scheduling", items: ["Cron jobs and Windows Task Scheduler", "Packaging scripts as executables", "Cloud scheduling with GitHub Actions"] },
    ],
    outcomes: [
      "Automate repetitive file and data tasks in Python",
      "Scrape data from websites without getting blocked",
      "Integrate AI APIs into real automation pipelines",
      "Schedule and deploy scripts to run 24/7",
    ],
    learningJourney: [
      { title: "Phase 1: Python Scripting Fundamentals", desc: "Build the automation mindset and master file handling, error handling, and basic scripting patterns.", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Web & App Automation", desc: "Scrape the web, control browsers programmatically, and build email/Slack bots.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: AI-Powered Pipelines", desc: "Combine automation with AI APIs to build intelligent, self-running workflows.", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Do I need prior Python knowledge?", a: "Basic Python (variables, loops, functions) is sufficient. We cover everything else as needed." },
      { q: "Are the AI APIs free?", a: "OpenAI and Gemini both offer free tiers. We structure all labs to run within the free limits." },
      { q: "Will I build actual projects?", a: "Yes — 6 complete automation projects you can deploy and add to your GitHub portfolio." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  MATHEMATICS FOR ML  (id: 102)
   * ───────────────────────────────────────────────────── */
  "ml-mathematics": {
    tagline: "The Foundation of AI",
    fullDescription:
      "Master the essential mathematics required to understand and build machine learning models. We cover Linear Algebra, Calculus, and Probability with a focus on how they apply to gradients, loss functions, and optimization.",
    highlights: [
      "Visual explanations of complex math",
      "Python-based math implementations",
      "Directly apply math to ML models",
    ],
    meta: { duration: "2 Months", level: "Beginner", updated: "March 2025", students: "2,100+" },
    instructor: {
      name: "Nikky Bisen",
      title: "AI Specialist & Educator",
      avatar: null,
      bio: "Nikky has a passion for making complex topics accessible. With years of experience in AI education, he focuses on the 'why' behind the math to help students build deep intuition for algorithms.",
      socials: { linkedin: "#", mail: "nikky@example.com" },
    },
    features: [
      { title: "Visual Learning", desc: "Understand linear algebra through geometric intuition and code.", icon: "BarChart2" },
      { title: "Calculus for ML", desc: "Master partial derivatives and chain rule for backpropagation.", icon: "Zap" },
      { title: "Probability", desc: "Learn Bayes' theorem and distributions for statistical modeling.", icon: "Search" },
      { title: "Optimization", desc: "Implement gradient descent from scratch using calculus.", icon: "Rocket" },
    ],
    syllabus: [
      { module: "Linear Algebra", items: ["Vectors, Matrices, and Tensors", "Matrix Multiplication and Inverses", "Eigenvalues and Eigenvectors"] },
      { module: "Calculus", items: ["Derivatives and Gradients", "Chain Rule & Backpropagation", "Vector Calculus basics"] },
      { module: "Probability & Stats", items: ["Bayesian Inference", "Gaussian Distributions", "Maximum Likelihood Estimation"] },
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
      { q: "Do I need to be good at math?", a: "High-school level math is enough. We build everything else from the ground up." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1518186239751-2477cf795151?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  APPLIED ML: BUILDING REAL PRODUCTS  (id: 103)
   * ───────────────────────────────────────────────────── */
  "applied-ml-projects": {
    tagline: "From Notebook to Production",
    fullDescription:
      "Theory is useless without execution. This course is entirely project-driven — you build an end-to-end ML product in every module, covering data collection, model training, web integration, monitoring, and cloud deployment.",
    highlights: [
      "10 complete ML products built from scratch",
      "FastAPI + React frontend integration",
      "Cloud deployment on Render & Railway",
    ],
    meta: { duration: "10 Weeks", level: "Intermediate", updated: "March 2025", students: "450+" },
    instructor: {
      name: "Nikky Bisen",
      title: "AI Specialist & Educator",
      avatar: null,
      bio: "Nikky has shipped production AI tools used by thousands. He designed this program specifically for students who are tired of tutorial hell and want to build real things that work.",
      socials: { linkedin: "#", mail: "nikky@example.com" },
    },
    features: [
      { title: "Data Pipelines", desc: "Build robust data collection and preprocessing pipelines.", icon: "Database" },
      { title: "Model Training", desc: "Train, tune, and evaluate models on real-world data.", icon: "BarChart2" },
      { title: "API Integration", desc: "Wrap your model in a FastAPI service and connect a frontend.", icon: "Server" },
      { title: "Cloud Deployment", desc: "Deploy to Render, Railway, or AWS with CI/CD pipelines.", icon: "Rocket" },
      { title: "Monitoring", desc: "Track model drift and performance degradation in production.", icon: "CheckCircle2" },
      { title: "Portfolio Ready", desc: "Every project is designed to impress in your GitHub portfolio.", icon: "Briefcase" },
    ],
    syllabus: [
      { module: "Data Pipelines", items: ["Data collection strategies and APIs", "Cleaning, validation, and versioning with DVC", "Feature stores and data schemas"] },
      { module: "Model Training & Evaluation", items: ["Hyperparameter tuning with Optuna", "Cross-validation and holdout strategies", "Experiment tracking with MLflow"] },
      { module: "Web Integration", items: ["FastAPI model serving", "React dashboard for predictions", "WebSocket for real-time inference"] },
      { module: "Deployment & Monitoring", items: ["Docker and docker-compose for ML apps", "CI/CD with GitHub Actions", "Prometheus + Grafana for model monitoring"] },
    ],
    outcomes: [
      "Build 10 full ML products from scratch",
      "Integrate ML models into React/FastAPI apps",
      "Deploy models to the cloud with monitoring",
      "Present a portfolio that stands out to employers",
    ],
    learningJourney: [
      { title: "Phase 1: Data & Model Foundation", desc: "Learn the engineering discipline behind reliable data pipelines and repeatable model training.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Build & Integrate", desc: "Connect trained models to real web applications with live APIs and interactive dashboards.", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Deploy & Monitor", desc: "Ship to production, set up monitoring, and manage live ML systems like a senior engineer.", img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "What ML knowledge do I need?", a: "You should know the basics — regression, classification, and basic sklearn usage. This course is about building, not teaching fundamentals." },
      { q: "Which cloud provider is used?", a: "Render and Railway for free-tier deployment. AWS is introduced in the advanced module." },
      { q: "Are the 10 projects in a portfolio format?", a: "Yes — each project includes a README template, demo screenshots, and a deployment link ready for your GitHub." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  CYBERSECURITY / VAPT  (id: 3)
   * ───────────────────────────────────────────────────── */
  "cybersecurity-vapt": {
    tagline: "Professional VAPT Certification Track",
    fullDescription:
      "Train under the Vulnerability Assessment and Penetration Testing framework used by security professionals worldwide. This program covers the full attack lifecycle — reconnaissance, exploitation, forensics, and formal compliance reporting.",
    highlights: [
      "Work inside a live VAPT lab environment",
      "Conduct real penetration tests ethically",
      "Prepare for CEH and OSCP certifications",
    ],
    meta: { duration: "6 Months", level: "Beginner → Professional", updated: "February 2025", students: "670+" },
    instructor: {
      name: "Arjun Tiwari",
      title: "Certified Ethical Hacker · OSCP · CISSP",
      avatar: null,
      bio: "Arjun is a full-spectrum security professional with certifications in CEH, OSCP, and CISSP. He spent 8 years running red-team operations for Fortune 500 companies before launching this training program.",
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
      { module: "Networking & Recon", items: ["TCP/IP deep-dive and packet analysis with Wireshark", "Passive and active reconnaissance (Shodan, Maltego)", "Network scanning with Nmap and Masscan"] },
      { module: "Exploitation & Post-Exploitation", items: ["Metasploit framework and manual exploits", "Privilege escalation on Linux and Windows", "Persistence, lateral movement, pivoting"] },
      { module: "Digital Forensics & IR", items: ["Disk imaging and memory forensics (Autopsy, Volatility)", "Log analysis and timeline reconstruction", "Incident response playbooks"] },
      { module: "Compliance & Reporting", items: ["CVSS scoring and risk classification", "Writing executive and technical audit reports", "ISO 27001 and PCI-DSS audit walkthroughs"] },
    ],
    outcomes: [
      "Conduct full VAPT engagements end-to-end",
      "Exploit and patch common vulnerabilities (OWASP Top 10)",
      "Perform digital forensics and incident response",
      "Produce professional-grade security audit reports",
    ],
    learningJourney: [
      { title: "Phase 1: Foundations & Recon", desc: "Learn networking internals and the methodologies used by real-world red teams.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Exploit & Defend", desc: "Attack and defend intentionally vulnerable systems in a controlled lab environment.", img: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Certify & Place", desc: "Prepare for CEH/OSCP, write your first audit report, and enter the placement program.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Is ethical hacking legal in this course?", a: "Yes. All hacking activities take place on systems you are explicitly authorized to test, inside a dedicated lab environment." },
      { q: "Which certifications does this prepare me for?", a: "CEH (Certified Ethical Hacker) and OSCP (Offensive Security Certified Professional)." },
      { q: "Do I need networking knowledge?", a: "Basic TCP/IP is helpful. The course starts with a networking module to get everyone up to speed." },
      { q: "What OS is used?", a: "Kali Linux is the primary OS. A pre-configured VM is provided on enrollment." },
    ],
    isVapt: true,
    mindmapImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  ENTERPRISE NETWORK SECURITY  (id: 301)
   * ───────────────────────────────────────────────────── */
  "network-security-pro": {
    tagline: "Secure Large-Scale Networks",
    fullDescription:
      "Enterprise networks are under constant attack. This course teaches you to design, configure, and monitor secure network infrastructures — from firewall rules and VPN setup to intrusion detection systems and network audits.",
    highlights: [
      "Configure enterprise-grade firewalls and VPNs",
      "Detect and respond to network intrusions",
      "Conduct professional network security audits",
    ],
    meta: { duration: "8 Weeks", level: "Intermediate", updated: "March 2025", students: "1,200+" },
    instructor: {
      name: "Rudra Gupta",
      title: "Network Security Engineer · CEH",
      avatar: null,
      bio: "Rudra specializes in enterprise network hardening and red team operations. He has secured infrastructure for organizations across healthcare, finance, and e-commerce sectors.",
      socials: { linkedin: "#", mail: "rudra@example.com" },
    },
    features: [
      { title: "Firewall Config", desc: "Configure pfSense, iptables, and enterprise firewalls from scratch.", icon: "Shield" },
      { title: "VPN Setup", desc: "Deploy and manage OpenVPN and WireGuard for secure remote access.", icon: "Server" },
      { title: "IDS/IPS", desc: "Deploy Snort and Suricata for real-time intrusion detection.", icon: "Search" },
      { title: "Network Audits", desc: "Conduct compliance-grade network audits with documented findings.", icon: "FileText" },
      { title: "Packet Analysis", desc: "Analyze network traffic with Wireshark and tcpdump.", icon: "Database" },
      { title: "Hardening", desc: "Apply CIS benchmarks to harden network devices and servers.", icon: "CheckCircle2" },
    ],
    syllabus: [
      { module: "Firewalls & Perimeter Defense", items: ["pfSense setup and rule configuration", "DMZ architecture and network segmentation", "Next-gen firewall features and application filtering"] },
      { module: "VPNs & Secure Tunneling", items: ["OpenVPN server setup and client management", "WireGuard configuration and key management", "Site-to-site VPN for branch offices"] },
      { module: "Intrusion Detection & Prevention", items: ["Snort rule writing and alert tuning", "Suricata for high-speed network monitoring", "SIEM integration for centralized alerting"] },
      { module: "Network Audits & Hardening", items: ["CIS benchmark compliance checks", "Network audit report writing", "Patch management and vulnerability scanning"] },
    ],
    outcomes: [
      "Configure and manage enterprise firewalls and VPNs",
      "Deploy and tune IDS/IPS systems for real networks",
      "Conduct formal network security audits",
      "Apply CIS benchmarks to harden infrastructure",
    ],
    learningJourney: [
      { title: "Phase 1: Perimeter Defense", desc: "Master firewall architecture, segmentation, and the fundamentals of enterprise perimeter security.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Detection & Monitoring", desc: "Deploy IDS/IPS and integrate with SIEM for round-the-clock network visibility.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Audit & Harden", desc: "Conduct compliance audits, write formal reports, and apply hardening benchmarks across the network.", img: "https://images.unsplash.com/photo-1614064641913-6b71a2ea3a0e?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "What hardware or software do I need?", a: "A laptop with 8 GB RAM to run VMs (VirtualBox provided). No physical hardware required." },
      { q: "Is this course useful for a home lab?", a: "Absolutely. Everything taught applies equally to home labs and enterprise environments." },
      { q: "Will I get hands-on lab access?", a: "Yes — pre-configured network labs are provided for every module." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  INCIDENT RESPONSE & FORENSICS  (id: 302)
   * ───────────────────────────────────────────────────── */
  "incident-response": {
    tagline: "Be the First Responder",
    fullDescription:
      "When a breach happens, someone has to step up. This program trains you to lead incident response from detection through containment, eradication, and recovery — using real forensics tools and enterprise IR playbooks.",
    highlights: [
      "Conduct full incident response lifecycle",
      "Analyze real malware samples safely",
      "Build evidence-grade forensic reports",
    ],
    meta: { duration: "10 Weeks", level: "Advanced", updated: "March 2025", students: "890+" },
    instructor: {
      name: "Rudra Gupta",
      title: "Incident Responder & Digital Forensics Analyst",
      avatar: null,
      bio: "Rudra has led incident response engagements across financial services and healthcare, handling breaches ranging from ransomware to insider threats. He brings real case studies directly into the curriculum.",
      socials: { linkedin: "#", mail: "rudra@example.com" },
    },
    features: [
      { title: "IR Playbooks", desc: "Use enterprise-grade playbooks for ransomware, phishing, and insider threats.", icon: "FileText" },
      { title: "Memory Forensics", desc: "Analyze RAM dumps with Volatility to catch in-memory malware.", icon: "Search" },
      { title: "Disk Forensics", desc: "Image and analyze drives using Autopsy and FTK Imager.", icon: "Database" },
      { title: "Log Analysis", desc: "Reconstruct attack timelines from Windows Event Logs and Syslog.", icon: "Server" },
      { title: "Malware Analysis", desc: "Perform safe static and dynamic analysis of malware samples.", icon: "Shield" },
      { title: "Report Writing", desc: "Produce chain-of-custody forensic reports admissible in court.", icon: "Award" },
    ],
    syllabus: [
      { module: "Detection & Triage", items: ["Alert triage and initial scoping", "Threat hunting with SIEM and EDR", "Identifying indicators of compromise (IoCs)"] },
      { module: "Digital Forensics", items: ["Drive imaging and chain of custody", "Memory forensics with Volatility", "File system analysis and artifact recovery"] },
      { module: "Recovery & Eradication", items: ["Ransomware containment strategies", "Threat eradication and system reimaging", "Business continuity and recovery procedures"] },
      { module: "Reporting & Legal", items: ["Forensic report structure and standards", "Evidence handling for legal proceedings", "IR metrics and post-mortem reviews"] },
    ],
    outcomes: [
      "Lead end-to-end incident response engagements",
      "Perform memory and disk forensics with industry tools",
      "Reconstruct attack timelines from log evidence",
      "Produce forensic reports suitable for legal use",
    ],
    learningJourney: [
      { title: "Phase 1: Detection & Scoping", desc: "Learn to detect breaches early, triage alerts accurately, and scope incidents before they escalate.", img: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Investigate & Contain", desc: "Use forensics tools to analyze evidence, trace attacker movement, and contain the damage.", img: "https://images.unsplash.com/photo-1614064641913-6b71a2ea3a0e?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Recover & Report", desc: "Eradicate the threat, restore systems, and produce professional forensic documentation.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Are these real malware samples?", a: "Yes — defanged samples in isolated sandbox environments. You will never touch live malware on a production machine." },
      { q: "What tools are used?", a: "Autopsy, Volatility, FTK Imager, Wireshark, Splunk (free trial), and MITRE ATT&CK Navigator." },
      { q: "Do I need prior security knowledge?", a: "Basic networking and OS knowledge is required. Prior VAPT experience is a plus but not mandatory." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1614064641913-6b71a2ea3a0e?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  CLOUD SECURITY & VAPT  (id: 303)
   * ───────────────────────────────────────────────────── */
  "cloud-security-vapt": {
    tagline: "Secure the Cloud — AWS · Azure · GCP",
    fullDescription:
      "The cloud is the new attack surface. This course teaches you to perform VAPT specifically on cloud environments — misconfigured S3 buckets, overprivileged IAM roles, serverless vulnerabilities, and cloud-native attack paths.",
    highlights: [
      "VAPT on real AWS, Azure & GCP labs",
      "Identify and fix cloud misconfigurations",
      "Prepare for AWS Security Specialty exam",
    ],
    meta: { duration: "8 Weeks", level: "Intermediate", updated: "April 2025", students: "560+" },
    instructor: {
      name: "Rudra Gupta",
      title: "Cloud Security Engineer · AWS Certified",
      avatar: null,
      bio: "Rudra has performed cloud security assessments for startups and enterprises running on AWS and Azure. He has a deep focus on IAM security, cloud misconfigurations, and serverless attack surfaces.",
      socials: { linkedin: "#", mail: "rudra@example.com" },
    },
    features: [
      { title: "Cloud IAM", desc: "Audit and fix overprivileged IAM roles, policies, and service accounts.", icon: "Shield" },
      { title: "S3 & Storage", desc: "Find and remediate misconfigured cloud storage buckets.", icon: "Database" },
      { title: "Cloud Networking", desc: "VPC security, security groups, and network access control lists.", icon: "Server" },
      { title: "Serverless Security", desc: "Attack and defend Lambda, Azure Functions, and Cloud Run.", icon: "Zap" },
      { title: "Cloud Audits", desc: "Run automated compliance audits using Scout Suite and Prowler.", icon: "CheckCircle2" },
      { title: "Threat Detection", desc: "Configure AWS GuardDuty, Defender for Cloud, and Security Command Center.", icon: "Search" },
    ],
    syllabus: [
      { module: "Cloud IAM & Identity Security", items: ["IAM policy analysis and privilege escalation paths", "AWS STS, assume-role attacks", "Service account abuse in GCP and Azure"] },
      { module: "Cloud Infrastructure VAPT", items: ["S3 bucket enumeration and misconfiguration", "VPC security group audits", "Metadata service attacks (SSRF → IMDS)"] },
      { module: "Serverless & Container Security", items: ["Lambda function injection and escalation", "Container escape techniques in Kubernetes", "Secrets management best practices"] },
      { module: "Compliance & Threat Detection", items: ["Automated audits with Prowler and Scout Suite", "GuardDuty, Defender for Cloud setup", "Cloud audit log analysis and alerting"] },
    ],
    outcomes: [
      "Perform VAPT on AWS, Azure, and GCP environments",
      "Find and fix critical cloud misconfigurations",
      "Set up cloud-native threat detection and alerting",
      "Produce cloud security audit reports for compliance",
    ],
    learningJourney: [
      { title: "Phase 1: Cloud Attack Surface", desc: "Map the cloud attack surface — IAM, storage, networking, and metadata services.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Exploit & Remediate", desc: "Exploit real cloud misconfigurations in a live lab and immediately remediate them.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Harden & Certify", desc: "Apply hardening best practices, run automated compliance audits, and prep for AWS Security Specialty.", img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Do I need AWS or Azure accounts?", a: "Yes — free tier accounts are sufficient for all labs. We provide step-by-step setup instructions." },
      { q: "Will this cost me cloud credits?", a: "Labs are designed to run within free tier limits. Estimated cost for the full course is under ₹500 in cloud spend." },
      { q: "Does this cover Kubernetes?", a: "Yes — an entire module covers container and Kubernetes security including escape techniques." },
    ],
    isVapt: true,
    mindmapImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  ETHICAL HACKING MASTERCLASS  (id: 6)
   * ───────────────────────────────────────────────────── */
  "ethical-hacking-masterclass": {
    tagline: "Advanced Red Team Operations",
    fullDescription:
      "Go beyond script-kiddie tools. This masterclass covers advanced exploitation — custom exploit development, privilege escalation chains, IoT attack surfaces, and full red team operation planning. For those who want to operate like a professional attacker.",
    highlights: [
      "Develop custom exploits from scratch",
      "Run full red team operations end-to-end",
      "Attack IoT devices and embedded systems",
    ],
    meta: { duration: "10 Weeks", level: "Advanced", updated: "March 2025", students: "1,890+" },
    instructor: {
      name: "Rudra Gupta",
      title: "Red Team Operator · Exploit Developer",
      avatar: null,
      bio: "Rudra has led red team engagements and developed custom exploits for CVE submissions. He brings real-world offensive security experience directly into the labs — no hypotheticals.",
      socials: { linkedin: "#", mail: "rudra@example.com" },
    },
    features: [
      { title: "Exploit Development", desc: "Write buffer overflow, heap spray, and ROP chain exploits from scratch.", icon: "Code" },
      { title: "Privilege Escalation", desc: "Escalate on Linux and Windows using 20+ proven techniques.", icon: "Zap" },
      { title: "IoT Hacking", desc: "Attack embedded systems, UART interfaces, and firmware.", icon: "Server" },
      { title: "Red Teaming", desc: "Plan and execute full red team engagements with MITRE ATT&CK.", icon: "Shield" },
      { title: "Evasion", desc: "Bypass AV/EDR using custom shellcode and obfuscation techniques.", icon: "Search" },
      { title: "Lab Environment", desc: "Full lab with Windows AD, Linux targets, and IoT devices.", icon: "Database" },
    ],
    syllabus: [
      { module: "Advanced Exploitation", items: ["Buffer overflow exploits on x86/x64", "Return-Oriented Programming (ROP) chains", "Heap exploitation techniques"] },
      { module: "Privilege Escalation", items: ["Linux privesc: SUID, cron, capabilities", "Windows privesc: tokens, registry, services", "Active Directory attack paths"] },
      { module: "IoT & Embedded Hacking", items: ["Firmware extraction and analysis with Binwalk", "UART/JTAG interface attacks", "Reverse engineering IoT protocols"] },
      { module: "Red Team Operations", items: ["Red team planning and rules of engagement", "Command & control frameworks (Cobalt Strike, Havoc)", "MITRE ATT&CK-based reporting"] },
    ],
    outcomes: [
      "Write functional exploits for real CVEs",
      "Execute complete privilege escalation chains on Windows and Linux",
      "Attack IoT and embedded systems",
      "Plan and run professional red team engagements",
    ],
    learningJourney: [
      { title: "Phase 1: Exploit Development", desc: "Build your first buffer overflow exploit and understand memory corruption at the binary level.", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Escalate & Evade", desc: "Own the system with privilege escalation and evade detection with advanced evasion techniques.", img: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Red Team Ops", desc: "Simulate a full adversary campaign from initial access to domain admin using ATT&CK tactics.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Is this course legal?", a: "Yes. All exploits are used exclusively against lab systems you own or are authorized to test." },
      { q: "What are the prerequisites?", a: "You need solid Linux/Windows CLI skills and at least one prior security course (VAPT basics recommended)." },
      { q: "Does this cover Active Directory?", a: "Yes — AD attack paths including Kerberoasting, Pass-the-Hash, and DCSync are fully covered." },
    ],
    isVapt: true,
    mindmapImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  WEB APPLICATION PENTESTING  (id: 601)
   * ───────────────────────────────────────────────────── */
  "web-app-security": {
    tagline: "Hunt Bugs, Get Paid",
    fullDescription:
      "Web applications are the most attacked surface on the internet. This course teaches you to find and exploit the OWASP Top 10 vulnerabilities — SQLi, XSS, IDOR, SSRF, and more — using Burp Suite Pro on real-world targets.",
    highlights: [
      "Master Burp Suite Pro from scratch",
      "Exploit all OWASP Top 10 vulnerabilities",
      "Start earning on HackerOne and Bugcrowd",
    ],
    meta: { duration: "8 Weeks", level: "Intermediate", updated: "April 2025", students: "1,100+" },
    instructor: {
      name: "Rudra Gupta",
      title: "Bug Bounty Hunter · Web Security Specialist",
      avatar: null,
      bio: "Rudra has reported vulnerabilities to companies including fintech firms and major SaaS platforms through bug bounty programs. His course is built from real bounty experience — not textbooks.",
      socials: { linkedin: "#", mail: "rudra@example.com" },
    },
    features: [
      { title: "Burp Suite Pro", desc: "Master the industry-standard web pentesting proxy from day one.", icon: "Search" },
      { title: "SQLi Exploitation", desc: "Manual and automated SQL injection from detection to database dump.", icon: "Database" },
      { title: "XSS Attacks", desc: "Reflected, stored, and DOM-based XSS with real-world impact.", icon: "Code" },
      { title: "API Security", desc: "Pentest REST and GraphQL APIs for broken auth and IDOR.", icon: "Server" },
      { title: "Bug Bounty", desc: "Write effective bounty reports and pick targets on HackerOne.", icon: "Award" },
      { title: "Security Headers", desc: "Audit and fix CSP, CORS, and other HTTP security headers.", icon: "Shield" },
    ],
    syllabus: [
      { module: "OWASP Top 10", items: ["Injection attacks (SQL, NoSQL, LDAP)", "Broken authentication and session management", "Security misconfigurations and XXE"] },
      { module: "Advanced Web Attacks", items: ["Server-Side Request Forgery (SSRF)", "Insecure Direct Object Reference (IDOR)", "Business logic vulnerabilities"] },
      { module: "API Security Testing", items: ["REST API fuzzing with Burp and ffuf", "GraphQL introspection and injection", "OAuth 2.0 implementation flaws"] },
      { module: "Bug Bounty Workflow", items: ["Recon methodology for bug bounty", "Writing high-quality vulnerability reports", "Triage process on HackerOne and Bugcrowd"] },
    ],
    outcomes: [
      "Find and exploit OWASP Top 10 vulnerabilities",
      "Pentest REST and GraphQL APIs end-to-end",
      "Write professional penetration testing reports",
      "Submit your first bug bounty report and earn rewards",
    ],
    learningJourney: [
      { title: "Phase 1: Web Attack Fundamentals", desc: "Master Burp Suite and learn to manually test for injection, auth bypass, and session attacks.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Advanced Exploitation", desc: "Move to SSRF, IDOR, business logic flaws, and API-specific vulnerabilities.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Bug Bounty & Reports", desc: "Apply skills on real bug bounty programs and learn to write reports that get paid.", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Which version of Burp Suite is used?", a: "We primarily use Burp Suite Community (free). Pro features are demonstrated but not required." },
      { q: "Can I practice on real websites?", a: "Only on authorized platforms like HackTheBox, TryHackMe, and official bug bounty scopes." },
      { q: "Will I earn money from bug bounties?", a: "Many students have submitted successful reports after this course. Outcomes depend on effort and target selection." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  REVERSE ENGINEERING & MALWARE ANALYSIS  (id: 602)
   * ───────────────────────────────────────────────────── */
  "malware-analysis": {
    tagline: "Dissect Malware at the Binary Level",
    fullDescription:
      "Learn to take apart malicious software piece by piece. This course covers static and dynamic malware analysis, disassembly with Ghidra and IDA Free, debugging with x64dbg, and understanding C2 communication patterns.",
    highlights: [
      "Analyze real-world malware samples safely",
      "Reverse engineer PE binaries with Ghidra",
      "Understand ransomware, trojans & rootkits",
    ],
    meta: { duration: "12 Weeks", level: "Advanced", updated: "February 2025", students: "430+" },
    instructor: {
      name: "Nikky Bisen",
      title: "Malware Analyst & Reverse Engineer",
      avatar: null,
      bio: "Nikky has reverse engineered hundreds of malware samples for threat intelligence teams. His analysis reports have been referenced in industry threat reports. He makes binary-level concepts approachable for security engineers.",
      socials: { linkedin: "#", mail: "nikky@example.com" },
    },
    features: [
      { title: "Static Analysis", desc: "Extract strings, headers, imports, and signatures without running malware.", icon: "Search" },
      { title: "Dynamic Analysis", desc: "Run malware safely in a sandbox and observe its behavior in real time.", icon: "Zap" },
      { title: "Disassembly", desc: "Reverse engineer PE binaries using Ghidra and IDA Free.", icon: "Code" },
      { title: "Debugging", desc: "Step through malware execution with x64dbg and OllyDbg.", icon: "Server" },
      { title: "Packers & Obfuscation", desc: "Unpack and de-obfuscate evasive malware samples.", icon: "Shield" },
      { title: "C2 Analysis", desc: "Identify command-and-control patterns and network indicators.", icon: "Database" },
    ],
    syllabus: [
      { module: "Static Analysis", items: ["PE file format internals", "String extraction with FLOSS and Strings", "YARA rule writing for detection"] },
      { module: "Dynamic Analysis", items: ["Safe sandbox setup with FlareVM and REMnux", "Process monitoring with Procmon and Wireshark", "Registry and network artifact collection"] },
      { module: "Reverse Engineering", items: ["x86/x64 assembly crash course", "Ghidra decompilation and function analysis", "Anti-debugging and anti-VM evasion bypass"] },
      { module: "Advanced Malware Families", items: ["Ransomware encryption logic analysis", "RAT and keylogger internals", "Rootkit and bootkit techniques"] },
    ],
    outcomes: [
      "Perform complete static and dynamic malware analysis",
      "Reverse engineer PE binaries using Ghidra",
      "Write YARA rules for malware detection",
      "Identify C2 infrastructure from network traffic",
    ],
    learningJourney: [
      { title: "Phase 1: Static Analysis", desc: "Learn to extract maximum intelligence from a malware sample without ever running it.", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Dynamic Analysis & Debugging", desc: "Run samples in controlled sandboxes and step through execution with a debugger.", img: "https://images.unsplash.com/photo-1614064641913-6b71a2ea3a0e?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Advanced Families", desc: "Tackle ransomware, RATs, and rootkits — the most sophisticated malware classes.", img: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Is it safe to analyze real malware?", a: "Yes. All samples are analyzed in isolated FlareVM / REMnux environments with network cut-off. Your host machine is never at risk." },
      { q: "Do I need to know assembly language?", a: "No prior assembly knowledge is needed. The course includes a focused crash course on x86/x64 assembly before reversing begins." },
      { q: "What tools are used?", a: "Ghidra, IDA Free, x64dbg, Wireshark, Procmon, FLOSS, REMnux, FlareVM — all free and open-source." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1614064641913-6b71a2ea3a0e?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  SOC ANALYST L1/L2 BOOTCAMP  (id: 603)
   * ───────────────────────────────────────────────────── */
  "soc-analyst-bootcamp": {
    tagline: "Get Hired in a SOC in 10 Weeks",
    fullDescription:
      "SOC Analyst is the highest-demand entry-level cybersecurity role. This bootcamp gives you everything you need to start on Day 1 — SIEM (Splunk), EDR, alert triage, phishing analysis, and the incident escalation workflow used in real SOCs.",
    highlights: [
      "Hands-on Splunk SIEM training",
      "Triage 100+ real security alerts",
      "Job-ready for L1/L2 SOC roles",
    ],
    meta: { duration: "10 Weeks", level: "Beginner", updated: "April 2025", students: "1,500+" },
    instructor: {
      name: "Rudra Gupta",
      title: "SOC Lead & Security Operations Specialist",
      avatar: null,
      bio: "Rudra has managed L1/L2 SOC teams and designed triage workflows for 24/7 security operations centers. He built this bootcamp to bridge the gap between certification theory and actual SOC work.",
      socials: { linkedin: "#", mail: "rudra@example.com" },
    },
    features: [
      { title: "Splunk SIEM", desc: "Search, correlate, and create dashboards in Splunk from scratch.", icon: "BarChart2" },
      { title: "Alert Triage", desc: "Work through 100+ realistic alerts and learn what to escalate.", icon: "CheckCircle2" },
      { title: "Phishing Analysis", desc: "Analyze phishing emails, extract IoCs, and contain the threat.", icon: "Search" },
      { title: "EDR Usage", desc: "Investigate endpoint alerts using CrowdStrike and Defender workflows.", icon: "Shield" },
      { title: "Ticketing", desc: "Document incidents using JIRA and ServiceNow in a SOC workflow.", icon: "FileText" },
      { title: "Wireshark", desc: "Capture and analyze network traffic to identify malicious patterns.", icon: "Database" },
    ],
    syllabus: [
      { module: "SIEM & Log Analysis", items: ["Splunk search language (SPL) fundamentals", "Log source ingestion and correlation rules", "Building SOC dashboards and alerts"] },
      { module: "Alert Triage Workflow", items: ["Alert classification: true positive vs false positive", "Escalation procedures and communication", "Shift handover and documentation"] },
      { module: "Threat Identification", items: ["Phishing email header analysis", "Malware IoC extraction and blocking", "Network traffic anomaly detection"] },
      { module: "Incident Documentation", items: ["Writing SOC tickets and incident notes", "Chain of custody in investigation notes", "Metrics: MTTD, MTTR, false positive rate"] },
    ],
    outcomes: [
      "Operate Splunk SIEM to detect and investigate alerts",
      "Triage and escalate security incidents correctly",
      "Analyze phishing emails and extract actionable IoCs",
      "Work in a 24/7 SOC shift environment confidently",
    ],
    learningJourney: [
      { title: "Phase 1: SOC Tools & Basics", desc: "Get hands-on with Splunk, Wireshark, and EDR tools that form the backbone of any SOC.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Triage & Investigate", desc: "Work through realistic SOC scenarios and learn to separate real threats from noise.", img: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Document & Get Hired", desc: "Master SOC documentation, build your analyst portfolio, and prep for L1/L2 interviews.", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Do I need any prior cybersecurity knowledge?", a: "Basic networking (TCP/IP, ports) is helpful. We provide a quick refresher at the start of the course." },
      { q: "Is Splunk free?", a: "Yes — Splunk offers a free 60-day trial and a permanent free tier sufficient for all course labs." },
      { q: "What jobs can I apply for after this?", a: "SOC Analyst L1/L2, Security Operations Engineer, Threat Analyst. Average starting salary: ₹4–7 LPA." },
      { q: "Is there job placement support?", a: "Yes — resume review, LinkedIn optimization, and referrals to hiring partners in the cybersecurity space." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  DEEP LEARNING MASTERY
   * ───────────────────────────────────────────────────── */
  "deep-learning-mastery": {
    tagline: "Advanced Track — Prerequisites Apply",
    fullDescription:
      "A rigorous deep dive into neural networks, CNNs, RNNs, Transformers, and beyond. Built for those who already know ML and want to operate at the frontier of AI research and enterprise deployment.",
    highlights: [
      "Train models on GPUs via cloud labs",
      "Implement landmark papers from scratch",
      "Enterprise deployment with TensorFlow Serving",
    ],
    meta: { duration: "6 Months", level: "Intermediate → Advanced", updated: "April 2025", students: "890+" },
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
      { module: "Neural Network Foundations", items: ["Backpropagation from scratch in NumPy", "Activation functions and weight initialization", "Regularization: Dropout, BatchNorm, L2"] },
      { module: "Computer Vision with CNNs", items: ["LeNet → VGG → ResNet → EfficientNet", "Transfer learning and fine-tuning", "YOLO and Faster R-CNN for detection"] },
      { module: "Sequence Models & Transformers", items: ["RNNs, LSTMs, GRUs", "Attention mechanism and self-attention", "BERT, GPT architecture from scratch"] },
      { module: "Advanced Topics & Deployment", items: ["Diffusion models and GANs overview", "TensorFlow Serving + TorchServe", "Quantization, pruning, and ONNX export"] },
    ],
    outcomes: [
      "Implement CNNs, RNNs, and Transformers from scratch",
      "Fine-tune pretrained models for custom tasks",
      "Deploy deep learning models at production scale",
      "Read and reproduce AI research papers confidently",
    ],
    learningJourney: [
      { title: "Phase 1: Neural Network Core", desc: "Build backpropagation and gradient descent from scratch before touching any framework.", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Architecture Mastery", desc: "Implement CNNs, Transformers, and GANs on real vision and language tasks.", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Ship & Publish", desc: "Deploy your model, build a research portfolio, and enter the placement pipeline.", img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "What are the prerequisites?", a: "Comfortable with Python and basic ML (linear regression, classification). Calculus and linear algebra knowledge helps." },
      { q: "Which framework is used?", a: "PyTorch is the primary framework. TensorFlow is introduced for deployment." },
      { q: "Can I join if I'm working full-time?", a: "Yes. Sessions are held on weekends with recordings available 24/7." },
      { q: "Is there GPU access?", a: "Yes — all students get cloud GPU credits for training experiments throughout the course." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  GENERATIVE AI PRODUCTION
   * ───────────────────────────────────────────────────── */
  "generative-ai-production": {
    tagline: "Most In-Demand Track · 2025",
    fullDescription:
      "Master the production side of Generative AI. From fine-tuning LLMs and building RAG pipelines to orchestrating multi-agent systems — this program is built for engineers who want to ship GenAI products, not just demo them.",
    highlights: [
      "Fine-tune open-source LLMs (Mistral, LLaMA)",
      "Build RAG systems with vector databases",
      "Deploy AI agents end-to-end",
    ],
    meta: { duration: "4 Months", level: "Intermediate", updated: "May 2025", students: "1,450+" },
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
      { module: "LLM Fundamentals", items: ["Transformer architecture deep-dive", "Tokenization, embeddings, and attention", "Overview of GPT-4, Claude, Gemini, Mistral"] },
      { module: "Fine-Tuning & Alignment", items: ["Supervised fine-tuning (SFT) with Hugging Face", "Parameter-efficient fine-tuning: LoRA, QLoRA", "RLHF and DPO basics"] },
      { module: "RAG & Vector Search", items: ["Embedding models and vector databases", "Chunking strategies and hybrid search", "Evaluation: RAGAS, faithfulness, relevance"] },
      { module: "AI Agents & Deployment", items: ["Tool-use and function calling", "Multi-agent orchestration with LangGraph", "Production deployment on AWS / GCP"] },
    ],
    outcomes: [
      "Fine-tune open-source LLMs for custom domains",
      "Build production RAG systems with vector databases",
      "Orchestrate multi-step AI agent workflows",
      "Reduce LLM inference costs by 60%+ in production",
    ],
    learningJourney: [
      { title: "Phase 1: LLM Internals", desc: "Understand how large language models actually work before touching the API.", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Build & Fine-Tune", desc: "Fine-tune real models, build RAG pipelines, and deploy your first AI agent.", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Ship a Product", desc: "Launch a full-stack GenAI product and enter the placement program.", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Do I need to own a GPU?", a: "No. All fine-tuning labs run on cloud GPUs (Google Colab Pro, RunPod) included in your enrollment." },
      { q: "Which LLMs are covered?", a: "Mistral 7B, LLaMA 3 8B/70B, Gemma, and via API: GPT-4o and Claude 3.5." },
      { q: "Is this for developers or researchers?", a: "Primarily for developers and engineers who want to build and ship products." },
      { q: "What is the project at the end?", a: "You build and deploy a full GenAI application — a domain-specific chatbot or AI agent — that goes into your portfolio." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  DATA & BUSINESS ANALYTICS
   * ───────────────────────────────────────────────────── */
  "data-business-analytics": {
    tagline: "Business-Focused · No Coding Required",
    fullDescription:
      "Transform raw business data into decisions that move the needle. This program bridges the gap between data tools and business strategy — ideal for analysts, managers, and anyone who works with data but isn't a software engineer.",
    highlights: [
      "Master Power BI, Tableau, and SQL",
      "Build executive-ready dashboards",
      "AI-driven analytics with Copilot & ChatGPT",
    ],
    meta: { duration: "3 Months", level: "Beginner → Analyst", updated: "April 2025", students: "3,200+" },
    instructor: {
      name: "Priya Nair",
      title: "Head of Analytics · Ex-McKinsey",
      avatar: null,
      bio: "Priya spent 7 years as a data analyst at McKinsey & Company, advising Fortune 100 clients on data strategy. She has trained over 8,000 professionals in analytics and BI tools. Real business cases, zero fluff.",
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
      { module: "Data Foundations & Excel", items: ["Data types, cleaning, and transformation", "Advanced Excel: PivotTables, XLOOKUP, Power Query", "Statistical thinking for business analysts"] },
      { module: "SQL for Business Intelligence", items: ["SELECT, JOIN, GROUP BY, subqueries", "Window functions for analytics", "Connecting SQL to BI tools"] },
      { module: "Visualization & Dashboards", items: ["Power BI: data modeling, DAX, report design", "Tableau: calculated fields and story points", "Dashboard design principles for executives"] },
      { module: "AI-Assisted Analytics", items: ["ChatGPT for data interpretation and reporting", "Copilot in Excel and Power BI", "Python basics for analysts (optional track)"] },
    ],
    outcomes: [
      "Build Power BI and Tableau dashboards from scratch",
      "Write SQL queries to extract business insights",
      "Present data stories to executive stakeholders",
      "Use AI tools to accelerate the analytics workflow by 3×",
    ],
    learningJourney: [
      { title: "Phase 1: Data Fluency", desc: "Get comfortable with Excel, SQL, and the core mindset of a data analyst.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Build Dashboards", desc: "Create interactive Power BI and Tableau dashboards from real business datasets.", img: "https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Present & Place", desc: "Build your analytics portfolio, prepare for interviews, and enter the placement program.", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Do I need to know coding?", a: "No. This program is designed for non-programmers. Python is an optional add-on track." },
      { q: "Which tools are taught?", a: "Power BI, Tableau, SQL (MySQL/PostgreSQL), Excel, and AI tools (ChatGPT, Copilot)." },
      { q: "What kind of jobs can I get?", a: "Data Analyst, Business Analyst, BI Developer, Product Analyst. Average starting salary: ₹6–10 LPA." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  PHASE 0 — COMPUTER FOUNDATIONS  (id: 700)
   * ───────────────────────────────────────────────────── */
  "phase0-computer-foundations": {
    tagline: "Start from Absolute Zero · Free",
    fullDescription:
      "Every AI engineer starts here. Before you write a single line of ML code, you need to understand how computers work, how to navigate the terminal confidently, and how to manage code with Git and GitHub. This phase is your launchpad.",
    highlights: [
      "Free for all enrolled students",
      "Set up a professional dev environment",
      "Your first Git push in 24 hours",
    ],
    meta: { duration: "1–2 Weeks", level: "Absolute Beginner", updated: "April 2025", students: "1,820+" },
    instructor: {
      name: "Nikky Bisen",
      title: "AI Specialist & Educator",
      avatar: null,
      bio: "Nikky designed Phase 0 to eliminate the invisible barrier that stops most beginners before they even start. His goal: anyone who completes this phase is fully ready for Phase 1 with zero prerequisites.",
      socials: { linkedin: "#", mail: "nikky@example.com" },
    },
    features: [
      { title: "How Computers Work", desc: "Understand CPU, RAM, storage, and OS — without going deep into CS theory.", icon: "Server" },
      { title: "Terminal Mastery", desc: "Navigate, create, copy, move, and automate from the command line.", icon: "Code" },
      { title: "Git & GitHub", desc: "Version control your code and push to GitHub from day one.", icon: "CheckCircle2" },
      { title: "VS Code Setup", desc: "Configure the best coding environment for AI/ML development.", icon: "Zap" },
      { title: "File Handling", desc: "Understand file systems, paths, and how Python reads and writes files.", icon: "FileText" },
      { title: "Package Management", desc: "Install Python, pip, and virtual environments without breaking anything.", icon: "Database" },
    ],
    syllabus: [
      { module: "Computer & OS Basics", items: ["How computers work (practical overview)", "Windows vs Linux vs macOS for developers", "Installing and managing software"] },
      { module: "Terminal & CLI", items: ["Navigation: ls, cd, pwd, mkdir, rm", "File operations and piping", "Shell scripting basics (bash)"] },
      { module: "Git & Version Control", items: ["git init, add, commit, push", "Branching and merging", "GitHub account and repository setup"] },
      { module: "Dev Environment", items: ["Python installation and PATH setup", "Virtual environments with venv", "VS Code extensions for Python and AI"] },
    ],
    outcomes: [
      "Navigate the terminal confidently on any OS",
      "Push code to GitHub and manage repositories",
      "Set up a Python development environment from scratch",
      "Understand how files, paths, and packages work",
    ],
    learningJourney: [
      { title: "Day 1–3: Your Computer & Terminal", desc: "Stop being afraid of the command line. Learn to navigate and control your machine like an engineer.", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" },
      { title: "Day 4–7: Git & GitHub", desc: "Learn version control from scratch. Make your first commit and push to a real GitHub repository.", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80" },
      { title: "Day 8–14: Python Dev Environment", desc: "Install Python, set up VS Code, and configure virtual environments — ready for Phase 1.", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Is this really free?", a: "Yes — Phase 0 is completely free for anyone who enrolls in any course in the AI Mastery Roadmap." },
      { q: "Which OS should I use?", a: "Ubuntu (Linux) is recommended. The course provides setup instructions for Windows (WSL2), macOS, and Ubuntu." },
      { q: "How long does it take?", a: "Most students complete Phase 0 in 1 week, spending 1–2 hours per day." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  PHASE 1 — PYTHON PROGRAMMING  (id: 701)
   * ───────────────────────────────────────────────────── */
  "phase1-python-programming": {
    tagline: "Bestseller · 3,400+ Students",
    fullDescription:
      "Python is the language of AI. This course takes you from variables to advanced OOP, async programming, and every library you need for AI/ML — NumPy, Pandas, and Matplotlib. Built for engineers, not just programmers.",
    highlights: [
      "0 to advanced Python in 6 weeks",
      "5 real Python projects in your portfolio",
      "NumPy, Pandas & Matplotlib mastered",
    ],
    meta: { duration: "4–6 Weeks", level: "Beginner", updated: "April 2025", students: "3,400+" },
    instructor: {
      name: "Nikky Bisen",
      title: "AI Specialist & Educator",
      avatar: null,
      bio: "Nikky has taught Python to over 5,000 students across AI/ML programs. He designed this course to take engineers — not just learners — all the way from syntax to production-grade code.",
      socials: { linkedin: "#", mail: "nikky@example.com" },
    },
    features: [
      { title: "Core Python", desc: "Variables, loops, functions, and data structures with real examples.", icon: "Code" },
      { title: "OOP Mastery", desc: "Classes, inheritance, dunder methods, and design patterns.", icon: "BookOpen" },
      { title: "NumPy", desc: "Arrays, broadcasting, linear algebra operations in NumPy.", icon: "BarChart2" },
      { title: "Pandas", desc: "DataFrames, groupby, merge, and real data analysis workflows.", icon: "Database" },
      { title: "Async Python", desc: "Async/await, asyncio, and concurrent programming basics.", icon: "Zap" },
      { title: "5 Projects", desc: "Web scraper, CLI tool, data analyzer, API client, and automation script.", icon: "Rocket" },
    ],
    syllabus: [
      { module: "Python Foundations", items: ["Variables, data types, control flow", "Functions, modules, and error handling", "Lists, dicts, sets, tuples deep-dive"] },
      { module: "Object-Oriented Python", items: ["Classes, objects, and inheritance", "Magic methods and operator overloading", "Abstract classes and design patterns"] },
      { module: "Advanced Python", items: ["Decorators and context managers", "Generators and iterators", "Async/await and asyncio"] },
      { module: "Data Science Libraries", items: ["NumPy: arrays, slicing, broadcasting", "Pandas: DataFrames, groupby, pivot tables", "Matplotlib & Seaborn: static and interactive plots"] },
    ],
    outcomes: [
      "Write clean, production-grade Python code",
      "Use NumPy and Pandas for real data analysis",
      "Build object-oriented Python applications",
      "Ship 5 Python projects to your GitHub portfolio",
    ],
    learningJourney: [
      { title: "Week 1–2: Python Core", desc: "Master syntax, control flow, functions, and data structures through building real mini-projects.", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80" },
      { title: "Week 3–4: OOP & Advanced Python", desc: "Level up with classes, decorators, generators, and async patterns used in production code.", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80" },
      { title: "Week 5–6: Data Science Libraries", desc: "Apply your Python skills to data analysis with NumPy, Pandas, and Matplotlib.", img: "https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Do I need any prior programming experience?", a: "None at all. The course starts with what a variable is and builds from there." },
      { q: "Is Python 3.x used?", a: "Yes — Python 3.11+ throughout. All code is compatible with 3.10 and above." },
      { q: "Will I build real projects?", a: "Yes — 5 complete projects across web scraping, automation, data analysis, APIs, and CLI tools." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  PHASE 2 — MATHEMATICS FOR AI  (id: 702)
   * ───────────────────────────────────────────────────── */
  "phase2-mathematics-for-ai": {
    tagline: "Math That Makes You a Better Engineer",
    fullDescription:
      "You cannot optimize what you don't understand. This course teaches Linear Algebra, Calculus, Probability, and Statistics with a direct ML application for every concept — so math never feels abstract again.",
    highlights: [
      "Every concept mapped to an ML application",
      "Implement gradient descent in 20 lines",
      "Understand loss functions at the equation level",
    ],
    meta: { duration: "4–6 Weeks", level: "Beginner", updated: "March 2025", students: "2,100+" },
    instructor: {
      name: "Nikky Bisen",
      title: "AI Specialist & Educator",
      avatar: null,
      bio: "Nikky breaks down graduate-level mathematics into intuitive, code-driven explanations. His students routinely report that concepts that were opaque in textbooks become obvious through his teaching.",
      socials: { linkedin: "#", mail: "nikky@example.com" },
    },
    features: [
      { title: "Linear Algebra", desc: "Vectors, matrices, eigenvalues — with NumPy code alongside every concept.", icon: "BarChart2" },
      { title: "Calculus for ML", desc: "Derivatives, partial derivatives, chain rule, and the gradient.", icon: "Zap" },
      { title: "Probability", desc: "Bayes theorem, distributions, MLE — core to every probabilistic ML model.", icon: "Search" },
      { title: "Statistics", desc: "Hypothesis testing, variance, and the intuition behind regularization.", icon: "Database" },
      { title: "Gradient Descent", desc: "Implement and visualize gradient descent from scratch.", icon: "Rocket" },
      { title: "Research Paper Ready", desc: "After this course, you can read and understand ML papers.", icon: "BookOpen" },
    ],
    syllabus: [
      { module: "Linear Algebra", items: ["Vectors, matrices, and tensor operations", "Matrix multiplication, inverses, rank", "Eigenvalues, eigenvectors, SVD"] },
      { module: "Calculus", items: ["Derivatives and rules of differentiation", "Partial derivatives and the gradient", "Chain rule and backpropagation intuition"] },
      { module: "Probability & Statistics", items: ["Bayes theorem and conditional probability", "Gaussian, Bernoulli, and Poisson distributions", "Maximum Likelihood Estimation (MLE)"] },
      { module: "Optimization", items: ["Gradient descent: batch, mini-batch, stochastic", "Adam, RMSProp optimizer intuition", "Loss function landscape visualization"] },
    ],
    outcomes: [
      "Understand the math behind every major ML algorithm",
      "Implement gradient descent and optimization from scratch",
      "Read ML research papers without getting lost in equations",
      "Build intuition for why regularization and dropout work",
    ],
    learningJourney: [
      { title: "Phase 1: Algebra & Geometry", desc: "See machine learning data as vectors and matrices — the shift that changes everything.", img: "https://images.unsplash.com/photo-1509228468518-180dd482195b?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Calculus & Optimization", desc: "Understand how models learn — derivatives, gradients, and the loss landscape.", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Probability & Statistics", desc: "Make sense of uncertainty, distributions, and the probabilistic foundations of ML.", img: "https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "What level of math do I need?", a: "High school math is sufficient. We assume you know basic algebra but nothing beyond that." },
      { q: "Is this pure math or applied?", a: "Pure application. Every concept has a Python notebook that ties it to a real ML algorithm." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1509228468518-180dd482195b?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  PHASE 3 — DATA ANALYSIS & VISUALIZATION  (id: 703)
   * ───────────────────────────────────────────────────── */
  "phase3-data-analysis-visualization": {
    tagline: "Turn Messy Data into Clear Insights",
    fullDescription:
      "Raw data is always messy. This phase teaches the complete data analysis workflow — collecting, cleaning, transforming, and visualizing datasets so you can answer business questions with confidence before any model is built.",
    highlights: [
      "Full EDA workflow on real datasets",
      "Interactive dashboards with Plotly",
      "SQL + Pandas combo for data extraction",
    ],
    meta: { duration: "3–4 Weeks", level: "Beginner", updated: "April 2025", students: "1,650+" },
    instructor: {
      name: "Nikky Bisen",
      title: "AI Specialist & Educator",
      avatar: null,
      bio: "Nikky has mentored hundreds of data science students through their first real EDA and visualization project. He believes a clean dataset and clear chart beats a complex model every single time.",
      socials: { linkedin: "#", mail: "nikky@example.com" },
    },
    features: [
      { title: "Data Cleaning", desc: "Handle missing values, duplicates, and outliers like a senior analyst.", icon: "Database" },
      { title: "Feature Engineering", desc: "Create new features that make models dramatically more accurate.", icon: "Zap" },
      { title: "Exploratory Analysis", desc: "Statistical summaries, correlation matrices, and distribution plots.", icon: "BarChart2" },
      { title: "SQL for Data Science", desc: "Query databases and join tables to extract exactly the data you need.", icon: "Search" },
      { title: "Plotly & Seaborn", desc: "Build publication-quality static and interactive visualizations.", icon: "Code" },
      { title: "Real Datasets", desc: "Work on 3 real Kaggle datasets across finance, healthcare, and e-commerce.", icon: "Briefcase" },
    ],
    syllabus: [
      { module: "Data Collection & Cleaning", items: ["Loading data from CSV, Excel, and APIs", "Handling nulls, duplicates, and outliers", "Data type casting and normalization"] },
      { module: "Feature Engineering", items: ["Creating interaction and polynomial features", "Encoding categorical variables", "Date/time feature extraction"] },
      { module: "EDA & SQL", items: ["Pandas profiling and statistical summaries", "SQL: GROUP BY, window functions, CTEs", "Correlation analysis and multivariate exploration"] },
      { module: "Visualization", items: ["Matplotlib for publication charts", "Seaborn for statistical plots", "Plotly for interactive dashboards"] },
    ],
    outcomes: [
      "Clean and transform any real-world dataset confidently",
      "Perform end-to-end exploratory data analysis",
      "Build interactive visualizations with Plotly",
      "Write SQL to extract and aggregate business data",
    ],
    learningJourney: [
      { title: "Phase 1: Data Wrangling", desc: "Tackle messy data head-on — missing values, type errors, duplicates, and outliers.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Analysis & SQL", desc: "Extract patterns with Pandas and SQL, and build a mental model of your dataset.", img: "https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Visualize & Present", desc: "Translate analysis into charts and dashboards that anyone can understand.", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Which datasets are used?", a: "Real Kaggle datasets from Titanic, Airbnb, and hospital records — messy, real, and interesting." },
      { q: "Do I need to know SQL?", a: "No prior SQL knowledge required. The SQL module starts from absolute basics." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  PHASE 4 — ML FUNDAMENTALS  (id: 704)
   * ───────────────────────────────────────────────────── */
  "phase4-machine-learning-fundamentals": {
    tagline: "Bestseller · Core ML Mastery",
    fullDescription:
      "This is where machine learning actually starts. Master every foundational algorithm — from linear regression to Random Forests and SVMs — and understand the math behind each one. Build models that work, not models that fit.",
    highlights: [
      "15+ ML algorithms implemented from scratch",
      "Compete on Kaggle with real techniques",
      "Understand bias-variance tradeoff deeply",
    ],
    meta: { duration: "6–8 Weeks", level: "Beginner → Intermediate", updated: "April 2025", students: "2,890+" },
    instructor: {
      name: "Nikky Bisen",
      title: "AI Specialist & Educator",
      avatar: null,
      bio: "Nikky is known for making complex ML algorithms feel intuitive. He teaches every algorithm twice — once with math, once with code — so students build permanent understanding, not just working notebooks.",
      socials: { linkedin: "#", mail: "nikky@example.com" },
    },
    features: [
      { title: "Supervised Learning", desc: "Regression, classification, trees, forests, SVM, KNN — all implemented.", icon: "BarChart2" },
      { title: "Unsupervised Learning", desc: "K-Means clustering and PCA for dimensionality reduction.", icon: "Database" },
      { title: "Model Evaluation", desc: "Accuracy, precision, recall, F1, ROC-AUC, and confusion matrices.", icon: "CheckCircle2" },
      { title: "Cross-Validation", desc: "K-Fold, stratified, and time-series cross-validation.", icon: "Search" },
      { title: "Bias-Variance", desc: "Understand overfitting and underfitting at a deep level.", icon: "Zap" },
      { title: "Kaggle Ready", desc: "Hyperparameter tuning, ensembles, and competition strategies.", icon: "Award" },
    ],
    syllabus: [
      { module: "Supervised Learning", items: ["Linear & Logistic Regression from scratch", "Decision Trees and Random Forests", "SVM, KNN, and Naive Bayes"] },
      { module: "Unsupervised Learning", items: ["K-Means and DBSCAN clustering", "PCA and t-SNE for visualization", "Anomaly detection"] },
      { module: "Model Evaluation", items: ["Train/test split and cross-validation", "Evaluation metrics deep-dive", "Learning curves and validation curves"] },
      { module: "Advanced ML Techniques", items: ["Hyperparameter tuning: Grid Search, Optuna", "Ensemble methods: Bagging, Boosting, Stacking", "Feature selection and importance"] },
    ],
    outcomes: [
      "Implement 15+ ML algorithms from scratch",
      "Select the right algorithm for any problem type",
      "Tune models for maximum performance on real data",
      "Submit competitive entries to Kaggle competitions",
    ],
    learningJourney: [
      { title: "Phase 1: Core Algorithms", desc: "Build regression, classification, and tree-based models — with full math intuition behind each.", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Unsupervised & Evaluation", desc: "Master clustering and dimensionality reduction, and evaluate models like a senior data scientist.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Tune & Compete", desc: "Apply hyperparameter tuning, ensemble methods, and Kaggle strategies to real competitions.", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Do I need a GPU?", a: "No. All ML algorithms in this phase run efficiently on CPU. GPUs are introduced in Phase 5 (Deep Learning)." },
      { q: "Which library is used?", a: "Scikit-learn is the primary library. Algorithms are also implemented from scratch in NumPy for understanding." },
      { q: "Will I be able to do Kaggle competitions?", a: "Yes — the final module is specifically designed to prepare you for your first Kaggle competition." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  PHASE 5 — DEEP LEARNING  (id: 705)
   * ───────────────────────────────────────────────────── */
  "phase5-deep-learning": {
    tagline: "From Perceptrons to Transformers",
    fullDescription:
      "Build every major deep learning architecture from scratch — CNNs for vision, LSTMs for sequences, and Transformers for everything. Train on real datasets with TensorFlow and PyTorch and understand why each design decision matters.",
    highlights: [
      "Implement backprop from scratch in NumPy",
      "Build image classifiers with 95%+ accuracy",
      "Understand the full Transformer architecture",
    ],
    meta: { duration: "8–10 Weeks", level: "Intermediate", updated: "April 2025", students: "1,980+" },
    instructor: {
      name: "Nikky Bisen",
      title: "AI Specialist & Educator",
      avatar: null,
      bio: "Nikky designed Phase 5 to produce engineers who understand deep learning at the architecture level — not just API users. Every architecture is built from scratch before switching to a framework.",
      socials: { linkedin: "#", mail: "nikky@example.com" },
    },
    features: [
      { title: "Backpropagation", desc: "Implement the full forward and backward pass in plain NumPy.", icon: "Code" },
      { title: "CNNs", desc: "Build image classifiers from LeNet to ResNet and fine-tune pretrained models.", icon: "Search" },
      { title: "RNNs & LSTMs", desc: "Sequence models for time series, text generation, and sentiment analysis.", icon: "MessageSquare" },
      { title: "Transformers", desc: "Implement scaled dot-product attention and the full Transformer block.", icon: "Zap" },
      { title: "PyTorch & TF", desc: "Master both frameworks. Know when to use which.", icon: "Database" },
      { title: "GPU Training", desc: "Accelerate training on cloud GPUs using Google Colab Pro and Kaggle.", icon: "Rocket" },
    ],
    syllabus: [
      { module: "Neural Network Fundamentals", items: ["Perceptron and multi-layer network from scratch", "Activation functions: ReLU, sigmoid, tanh, GELU", "Backpropagation implementation in NumPy"] },
      { module: "Computer Vision", items: ["CNN architectures: LeNet → VGG → ResNet", "Transfer learning and fine-tuning with torchvision", "Object detection with YOLO basics"] },
      { module: "Sequence Models", items: ["RNNs and vanishing gradient problem", "LSTMs and GRUs for sequence tasks", "Seq2Seq with attention mechanism"] },
      { module: "Transformers & Regularization", items: ["Self-attention and multi-head attention", "BERT and GPT architecture from scratch", "Dropout, BatchNorm, Label Smoothing"] },
    ],
    outcomes: [
      "Implement backpropagation from scratch without frameworks",
      "Build and train CNN image classifiers with 95%+ accuracy",
      "Implement LSTM and Transformer models for text tasks",
      "Fine-tune pretrained models on custom datasets",
    ],
    learningJourney: [
      { title: "Phase 1: Neural Network Core", desc: "Build a neural network from scratch in NumPy — no PyTorch, no TensorFlow, just math and code.", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Vision & Sequences", desc: "Apply deep learning to images and text with CNNs, LSTMs, and the attention mechanism.", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Transformers & Production", desc: "Implement the full Transformer, fine-tune BERT, and deploy your first deep learning API.", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Do I need a GPU?", a: "You'll use Google Colab Pro and Kaggle's free GPUs. No local GPU required." },
      { q: "PyTorch or TensorFlow?", a: "Both. PyTorch is the primary framework. TensorFlow/Keras is introduced for deployment." },
      { q: "What are the prerequisites?", a: "Phase 4 (ML Fundamentals) or equivalent. You should know Python, NumPy, and basic ML." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  PHASE 6 — GENERATIVE AI & LLMs  (id: 706)
   * ───────────────────────────────────────────────────── */
  "phase6-generative-ai-llms": {
    tagline: "Bestseller · 🔥 Highest Demand in 2025",
    fullDescription:
      "Learn how ChatGPT, Claude, and Gemini actually work — then build with them. This phase covers prompt engineering, fine-tuning, RAG pipelines, AI agents, and diffusion models. You'll ship 5 complete GenAI apps by the end.",
    highlights: [
      "Build 5 GenAI apps: chatbot, RAG, voice assistant",
      "Fine-tune LLaMA 3 and Mistral on custom data",
      "Deploy AI agents with LangChain & LlamaIndex",
    ],
    meta: { duration: "8–10 Weeks", level: "Intermediate → Advanced", updated: "May 2025", students: "1,240+" },
    instructor: {
      name: "Nikky Bisen",
      title: "AI Specialist & GenAI Engineer",
      avatar: null,
      bio: "Nikky has shipped multiple production GenAI applications — from PDF Q&A systems to multi-agent research assistants. He designed Phase 6 to be the most practical LLM course available in the market.",
      socials: { linkedin: "#", mail: "nikky@example.com" },
    },
    features: [
      { title: "Prompt Engineering", desc: "Zero-shot, few-shot, chain-of-thought, and ReAct prompting patterns.", icon: "MessageSquare" },
      { title: "LLM Fine-Tuning", desc: "Fine-tune Mistral 7B and LLaMA 3 on custom data using QLoRA.", icon: "Zap" },
      { title: "RAG Pipelines", desc: "Build document Q&A with ChromaDB, Pinecone, and LlamaIndex.", icon: "Database" },
      { title: "AI Agents", desc: "Multi-step agents with tool use, memory, and LangGraph orchestration.", icon: "Rocket" },
      { title: "Diffusion Models", desc: "Understand Stable Diffusion and build image generation pipelines.", icon: "Code" },
      { title: "5 Apps Built", desc: "Chatbot, PDF Q&A, voice assistant, AI search engine, code assistant.", icon: "Briefcase" },
    ],
    syllabus: [
      { module: "LLM Internals & APIs", items: ["Transformer and attention mechanism review", "Using OpenAI, Groq, and Ollama APIs", "Tokenization, context windows, and temperature"] },
      { module: "Prompt Engineering & Fine-Tuning", items: ["CoT, few-shot, and system prompt design", "SFT and QLoRA fine-tuning with Unsloth", "RLHF and DPO overview"] },
      { module: "RAG & Vector Databases", items: ["Embedding models and similarity search", "ChromaDB and Pinecone setup", "RAGAS evaluation for RAG quality"] },
      { module: "Agents & Multimodal AI", items: ["Tool-use and function calling", "LangGraph multi-agent workflows", "Whisper for STT, TTS APIs, image generation"] },
    ],
    outcomes: [
      "Build production RAG pipelines from scratch",
      "Fine-tune open-source LLMs on custom datasets",
      "Deploy multi-step AI agents with tool use",
      "Ship 5 complete GenAI apps to your portfolio",
    ],
    learningJourney: [
      { title: "Phase 1: LLM Fundamentals", desc: "Go under the hood of GPT, Claude, and Gemini. Understand every component before building.", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: RAG & Fine-Tuning", desc: "Build real-world RAG systems and fine-tune open-source LLMs on your own datasets.", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Agents & Apps", desc: "Ship 5 production-quality GenAI applications with agents, voice, and multimodal capabilities.", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Do I need API keys?", a: "OpenAI and Groq provide free tiers sufficient for all labs. Ollama runs locally for free." },
      { q: "Which open-source models are used?", a: "Mistral 7B, LLaMA 3 8B/70B, Gemma 2 9B, and Phi-3 Mini." },
      { q: "Will I build real apps?", a: "Yes — 5 complete GenAI apps that are portfolio-ready and deployable." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  PHASE 7 — MLOPS & AI ENGINEERING  (id: 707)
   * ───────────────────────────────────────────────────── */
  "phase7-mlops-ai-engineering": {
    tagline: "Ship AI to Production Like an Engineer",
    fullDescription:
      "Most ML courses end at the notebook. This one starts there. Learn how to containerize, serve, monitor, and maintain AI models in production using Docker, FastAPI, CI/CD pipelines, cloud platforms, and MLflow.",
    highlights: [
      "Deploy ML APIs on AWS and GCP",
      "Automate deployments with GitHub Actions",
      "Monitor model drift in real production systems",
    ],
    meta: { duration: "6–8 Weeks", level: "Intermediate", updated: "April 2025", students: "760+" },
    instructor: {
      name: "Rudra Gupta",
      title: "AI Engineer · MLOps Specialist",
      avatar: null,
      bio: "Rudra has deployed ML systems serving thousands of daily users. He built this phase specifically to close the gap between data scientists who can build models and engineers who can run them at scale.",
      socials: { linkedin: "#", mail: "rudra@example.com" },
    },
    features: [
      { title: "Docker for ML", desc: "Containerize any ML model into a portable, reproducible Docker image.", icon: "Server" },
      { title: "FastAPI", desc: "Build high-performance REST APIs to serve ML predictions in real time.", icon: "Zap" },
      { title: "CI/CD Pipelines", desc: "Automate test, build, and deploy workflows with GitHub Actions.", icon: "Code" },
      { title: "Cloud Deployment", desc: "Deploy on AWS EC2/ECS, GCP Cloud Run, and Azure Container Apps.", icon: "Rocket" },
      { title: "MLflow Tracking", desc: "Track experiments, compare runs, and version ML models.", icon: "Database" },
      { title: "Model Monitoring", desc: "Detect data drift and performance degradation in live systems.", icon: "BarChart2" },
    ],
    syllabus: [
      { module: "Containerization & APIs", items: ["Docker: Dockerfile, images, and containers", "FastAPI: endpoints, Pydantic schemas, async", "docker-compose for multi-service ML apps"] },
      { module: "CI/CD & Testing", items: ["Unit tests for ML models with pytest", "GitHub Actions: build → test → deploy workflow", "Pre-commit hooks and code quality checks"] },
      { module: "Cloud Deployment", items: ["AWS: EC2, ECS, ECR, and Lambda for ML", "GCP: Cloud Run and Vertex AI basics", "Azure Container Apps and ACI"] },
      { module: "Monitoring & MLflow", items: ["MLflow: experiment tracking and model registry", "Evidently AI for data drift detection", "Grafana dashboards for ML system metrics"] },
    ],
    outcomes: [
      "Containerize and serve any ML model via FastAPI",
      "Build CI/CD pipelines for automated ML deployments",
      "Deploy models to AWS, GCP, and Azure",
      "Monitor production ML systems for drift and degradation",
    ],
    learningJourney: [
      { title: "Phase 1: Container & API", desc: "Package your model in Docker and build a production-grade FastAPI serving layer.", img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: CI/CD & Cloud", desc: "Automate the entire build-test-deploy pipeline and ship your first ML API to the cloud.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Monitor & Scale", desc: "Set up drift detection, performance monitoring, and auto-scaling for production ML.", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Do I need cloud provider accounts?", a: "Yes — AWS, GCP, and Azure all have free tiers. All labs are designed to fit within the free tier limits." },
      { q: "Is Kubernetes covered?", a: "Kubernetes basics are introduced in the context of ECS and Cloud Run. A full K8s deep-dive is out of scope." },
      { q: "What are the prerequisites?", a: "Phase 4 (ML Fundamentals) and basic comfort with the Linux terminal." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  PHASE 8 — ADVANCED AI TOPICS  (id: 708)
   * ───────────────────────────────────────────────────── */
  "phase8-advanced-ai-topics": {
    tagline: "AI Frontier — Research & Specialization",
    fullDescription:
      "Explore the cutting edge of artificial intelligence. From Reinforcement Learning and RLHF to AI safety, federated learning, and multi-agent systems — this phase is for those who want to contribute to, not just consume, the AI frontier.",
    highlights: [
      "Implement Q-learning and policy gradients",
      "Understand RLHF used in ChatGPT training",
      "Explore AI safety and alignment research",
    ],
    meta: { duration: "8–12 Weeks", level: "Advanced", updated: "March 2025", students: "520+" },
    instructor: {
      name: "Nikky Bisen",
      title: "AI Researcher & Specialist",
      avatar: null,
      bio: "Nikky tracks every major AI research paper and distills the most important frontier concepts into hands-on labs. Phase 8 is designed for engineers who want to push the boundary, not just follow it.",
      socials: { linkedin: "#", mail: "nikky@example.com" },
    },
    features: [
      { title: "Reinforcement Learning", desc: "Q-learning, policy gradients, and PPO from scratch.", icon: "Rocket" },
      { title: "RLHF", desc: "Understand the training process behind ChatGPT and Claude.", icon: "Zap" },
      { title: "AI Safety", desc: "Alignment research, constitutional AI, and interpretability.", icon: "Shield" },
      { title: "Federated Learning", desc: "Train models across decentralized data without privacy leaks.", icon: "Database" },
      { title: "Edge AI", desc: "Deploy models on Raspberry Pi and mobile with TFLite and ONNX.", icon: "Server" },
      { title: "Multi-Agent Systems", desc: "Build autonomous agent networks that collaborate and compete.", icon: "Users" },
    ],
    syllabus: [
      { module: "Reinforcement Learning", items: ["Markov Decision Processes (MDPs)", "Q-learning and Deep Q-Networks (DQN)", "Policy gradient methods: REINFORCE, PPO"] },
      { module: "RLHF & Alignment", items: ["Supervised fine-tuning → reward model → PPO pipeline", "Constitutional AI and DPO", "Interpretability: attention maps, probing classifiers"] },
      { module: "Privacy & Federated Learning", items: ["Federated averaging (FedAvg) algorithm", "Differential privacy basics", "Split learning and secure aggregation"] },
      { module: "Edge AI & Agents", items: ["TFLite quantization and on-device inference", "Multi-agent reinforcement learning", "Autonomous agent architectures"] },
    ],
    outcomes: [
      "Implement Q-learning and policy gradient RL algorithms",
      "Understand the RLHF pipeline used to train frontier LLMs",
      "Deploy models on edge devices with TFLite",
      "Build multi-agent systems with autonomous coordination",
    ],
    learningJourney: [
      { title: "Phase 1: Reinforcement Learning", desc: "Master the math and code behind RL — from Q-tables to deep policy networks.", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: RLHF & Safety", desc: "Understand how AI systems are aligned to human values and made safer.", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Edge & Agents", desc: "Deploy AI on embedded devices and build autonomous multi-agent systems.", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "What math is needed for RL?", a: "Basic probability and calculus (covered in Phase 2). Linear algebra helps but isn't strictly required." },
      { q: "Is this useful for industry?", a: "RL is heavily used in robotics, game AI, recommendation systems, and autonomous vehicles — all booming sectors." },
      { q: "Can I publish research from this course?", a: "We have an optional research mentorship track for students who want to write and submit papers." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  PHASE 9 — PORTFOLIO & CAREER BUILDING  (id: 709)
   * ───────────────────────────────────────────────────── */
  "phase9-portfolio-career-building": {
    tagline: "Land Your First AI Job or Freelance Client",
    fullDescription:
      "Skills alone don't get you hired — visibility does. This phase teaches you to build a GitHub portfolio that gets noticed, create a Kaggle profile that ranks, optimize your LinkedIn for AI roles, and ace the technical interview.",
    highlights: [
      "5 must-have AI portfolio projects",
      "Kaggle competition strategy that wins",
      "Mock interviews with real ML practitioners",
    ],
    meta: { duration: "Ongoing", level: "All Levels", updated: "May 2025", students: "3,100+" },
    instructor: {
      name: "Nikky Bisen",
      title: "AI Career Coach & Specialist",
      avatar: null,
      bio: "Nikky has helped 500+ students land their first AI job or freelance client. He designed Phase 9 based on what actually works — not career advice from people who've never hired anyone.",
      socials: { linkedin: "#", mail: "nikky@example.com" },
    },
    features: [
      { title: "GitHub Portfolio", desc: "Structure and present 5 AI projects that impress technical recruiters.", icon: "Code" },
      { title: "Kaggle Strategy", desc: "Competition tips, medal strategies, and how to climb the leaderboard.", icon: "Award" },
      { title: "LinkedIn Optimization", desc: "Profile structure, content strategy, and DM templates that get responses.", icon: "Users" },
      { title: "Technical Blog", desc: "Write AI articles on Medium and Hashnode that generate inbound opportunities.", icon: "FileText" },
      { title: "Interview Prep", desc: "ML theory, coding rounds, and AI system design questions with answers.", icon: "UserCheck" },
      { title: "Freelancing", desc: "Price, pitch, and deliver AI projects on Upwork and Fiverr.", icon: "Briefcase" },
    ],
    syllabus: [
      { module: "Portfolio Building", items: ["Structuring AI project READMEs", "Live demo deployment (Streamlit, Hugging Face Spaces)", "5 must-have projects: NLP, CV, RAG, ML API, Kaggle submission"] },
      { module: "Kaggle & Open Source", items: ["Competition analysis and team strategy", "Winning kernels and notebook presentation", "Contributing to open-source AI projects"] },
      { module: "Personal Brand", items: ["LinkedIn profile optimization for AI roles", "Technical blogging for credibility", "GitHub profile README and contribution graph"] },
      { module: "Interview & Freelance", items: ["ML theory interview questions and answers", "Coding rounds: SQL, Python, ML algorithms", "Freelance pricing, proposals, and client management"] },
    ],
    outcomes: [
      "Build a GitHub portfolio that gets recruiter attention",
      "Submit competitive Kaggle entries and earn medals",
      "Land an AI job or internship offer within 3 months",
      "Build a 6-figure AI freelance business",
    ],
    learningJourney: [
      { title: "Phase 1: Build the Portfolio", desc: "Create 5 high-quality AI projects with live demos, polished READMEs, and deployment links.", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Build the Brand", desc: "Optimize LinkedIn, start a technical blog, and build the online presence that attracts opportunities.", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Get Hired or Go Freelance", desc: "Crush the technical interview or land your first freelance client with proven strategies.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "What if I haven't completed all phases?", a: "You can start Phase 9 anytime. The career module is independent and useful at any point in your learning." },
      { q: "Is there 1-on-1 mentorship?", a: "Yes — Phase 9 includes optional 1-on-1 resume and portfolio review sessions with our career team." },
      { q: "How long until I get a job?", a: "Most serious students with a strong portfolio land interviews within 6–12 weeks of completing the career module." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  COURSE 1: CYBER SECURITY FOUNDATIONS  (id: 901)
   * ───────────────────────────────────────────────────── */
  "course-cyber-foundations": {
    tagline: "Your Entry Point into Cybersecurity",
    fullDescription:
      "The cybersecurity field is massive — and it starts here. This course gives you the bedrock knowledge every security professional needs: networking internals, Linux administration, the CIA Triad, and how a real Security Operations Center operates.",
    highlights: [
      "Master TCP/IP, OSI model, and subnetting",
      "Administer Linux users, permissions, and processes",
      "Understand how a SOC operates day to day",
    ],
    meta: { duration: "4–6 Weeks", level: "Beginner", updated: "April 2025", students: "1,420+" },
    instructor: {
      name: "Tanmay Sukhadeve",
      title: "Cybersecurity Instructor · CEH Certified",
      avatar: null,
      bio: "Tanmay has trained over 2,000 cybersecurity professionals from absolute beginners to working SOC analysts. His teaching style is practical, direct, and built around real-world scenarios from day one.",
      socials: { linkedin: "#", mail: "tanmay@example.com" },
    },
    features: [
      { title: "CIA Triad", desc: "Confidentiality, Integrity, Availability — the foundation of all security decisions.", icon: "Shield" },
      { title: "Networking", desc: "TCP/IP, OSI Model, subnetting, and packet flow explained visually.", icon: "Server" },
      { title: "Linux Admin", desc: "User management, permissions, processes, and basic hardening.", icon: "Code" },
      { title: "Cryptography Basics", desc: "Symmetric vs asymmetric encryption, hashing, and digital signatures.", icon: "CheckCircle2" },
      { title: "SOC Introduction", desc: "How a Security Operations Center works: tiers, tools, and workflows.", icon: "Search" },
      { title: "Practical Labs", desc: "Networking and Linux labs in a guided virtual environment.", icon: "Database" },
    ],
    syllabus: [
      { module: "Cybersecurity Principles", items: ["CIA Triad, security controls, and threat landscape", "Threat actors: script kiddies to nation-states", "Security frameworks: NIST, ISO 27001 overview"] },
      { module: "Networking Fundamentals", items: ["OSI and TCP/IP model deep-dive", "IP addressing, subnetting, and CIDR", "DNS, DHCP, HTTP/S, and common protocols"] },
      { module: "Linux Administration", items: ["File system hierarchy and navigation", "User management and permissions (chmod, chown)", "Process management and system monitoring"] },
      { module: "SOC & Monitoring", items: ["SIEM introduction and log sources", "SOC analyst role and tiers", "Alert triage and escalation basics"] },
    ],
    outcomes: [
      "Explain core cybersecurity principles to any audience",
      "Configure and administer Linux user environments",
      "Analyze network traffic and identify common protocols",
      "Describe how a real SOC operates end-to-end",
    ],
    learningJourney: [
      { title: "Phase 1: Security Principles", desc: "Build the mental model of cybersecurity — how attackers think and how defenders respond.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Networking & Linux", desc: "Master the technical foundation — networking protocols and Linux administration.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: SOC & Monitoring", desc: "Step inside the Security Operations Center and understand how defenders operate 24/7.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Do I need any prior tech knowledge?", a: "Basic computer literacy is enough. This course assumes zero security or networking background." },
      { q: "What VM/tools are needed?", a: "VirtualBox (free) + Ubuntu ISO is all you need. Setup is covered in the first module." },
      { q: "Does this lead into Course 2 (VAPT)?", a: "Yes — Course 1 is the direct prerequisite for Course 2: Ethical Hacking & VAPT." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  COURSE 2: ETHICAL HACKING & VAPT  (id: 902)
   * ───────────────────────────────────────────────────── */
  "course-ethical-hacking-vapt": {
    tagline: "Bestseller · Professional VAPT Training",
    fullDescription:
      "Master the complete ethical hacking methodology used by professional penetration testers worldwide. From reconnaissance to exploitation and reporting — you'll conduct real security assessments using Burp Suite, Nmap, and Wireshark.",
    highlights: [
      "Full VAPT methodology from recon to report",
      "Hands-on Burp Suite and Nmap training",
      "Write professional penetration testing reports",
    ],
    meta: { duration: "6–8 Weeks", level: "Intermediate", updated: "May 2025", students: "2,150+" },
    instructor: {
      name: "Tanmay Sukhadeve",
      title: "Cybersecurity Instructor · Ethical Hacker",
      avatar: null,
      bio: "Tanmay has conducted VAPT engagements for financial institutions and startups. He designed Course 2 to mirror the exact workflow used in professional security engagements — nothing theoretical, everything practical.",
      socials: { linkedin: "#", mail: "tanmay@example.com" },
    },
    features: [
      { title: "Attack Lifecycle", desc: "Recon → Scanning → Exploitation → Post-Exploitation → Reporting.", icon: "Shield" },
      { title: "Recon & OSINT", desc: "Passive and active reconnaissance using Shodan, theHarvester, and Maltego.", icon: "Search" },
      { title: "OWASP Top 10", desc: "Find and exploit SQLi, XSS, IDOR, and authentication bypasses.", icon: "Code" },
      { title: "Network Pentesting", desc: "Scan and enumerate networks with Nmap, Masscan, and Netcat.", icon: "Server" },
      { title: "Burp Suite", desc: "Intercept, modify, and replay HTTP requests with Burp Suite.", icon: "Zap" },
      { title: "Pentest Reports", desc: "Write professional-grade penetration testing reports with CVSS scoring.", icon: "FileText" },
    ],
    syllabus: [
      { module: "Ethical Hacking Methodology", items: ["Legal and ethical framework for pentesting", "Rules of engagement and scoping", "PTES and OWASP Testing Guide overview"] },
      { module: "Reconnaissance & Enumeration", items: ["Passive recon: OSINT, DNS enumeration, Google dorking", "Active recon: Nmap, service fingerprinting", "Vulnerability identification with Nikto and OpenVAS"] },
      { module: "Exploitation", items: ["OWASP Top 10 exploitation techniques", "Authentication bypass and session hijacking", "Network exploitation with Metasploit basics"] },
      { module: "Reporting", items: ["CVSS scoring and risk classification", "Executive and technical report writing", "Remediation recommendations and retesting"] },
    ],
    outcomes: [
      "Conduct professional VAPT engagements end-to-end",
      "Exploit web application vulnerabilities from OWASP Top 10",
      "Perform network enumeration and service exploitation",
      "Write pentest reports that meet enterprise audit standards",
    ],
    learningJourney: [
      { title: "Phase 1: Recon & Scanning", desc: "Learn to map the attack surface before touching a single exploit — recon is where 80% of the work happens.", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Exploit & Own", desc: "Exploit real vulnerabilities on authorized lab targets using industry-standard tools and techniques.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Report & Certify", desc: "Produce professional audit reports and prepare for CEH certification with targeted exam prep.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "Is Course 1 a prerequisite?", a: "Yes — or equivalent knowledge of networking, Linux, and basic security concepts." },
      { q: "Are the targets real websites?", a: "No — all exploitation happens on dedicated lab VMs (HackTheBox, TryHackMe, or local VMs provided)." },
      { q: "Does this prepare me for CEH?", a: "Yes — the methodology and tool coverage aligns directly with the CEH exam blueprint." },
    ],
    isVapt: true,
    mindmapImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  COURSE 3: DFIR  (id: 903)
   * ───────────────────────────────────────────────────── */
  "course-dfir": {
    tagline: "Digital Forensics & Incident Response",
    fullDescription:
      "When an attack happens, the DFIR analyst is the one who finds out how, when, and by whom. This course teaches the complete incident response lifecycle and digital forensics discipline — from evidence collection to court-ready reporting.",
    highlights: [
      "Full incident lifecycle: detect to recover",
      "Real malware evidence labs with Autopsy",
      "Build chain-of-custody forensic reports",
    ],
    meta: { duration: "4–6 Weeks", level: "Advanced", updated: "March 2025", students: "950+" },
    instructor: {
      name: "Tanmay Sukhadeve",
      title: "DFIR Specialist · Cybersecurity Instructor",
      avatar: null,
      bio: "Tanmay has led DFIR investigations for organizations hit by ransomware, insider threats, and nation-state actors. He brings those real cases — anonymized — directly into the course as labs and walkthroughs.",
      socials: { linkedin: "#", mail: "tanmay@example.com" },
    },
    features: [
      { title: "Forensic Methodology", desc: "Chain of custody, evidence standards, and forensic soundness.", icon: "FileText" },
      { title: "Evidence Handling", desc: "Disk imaging with dd and FTK Imager. Memory acquisition with WinPMEM.", icon: "Database" },
      { title: "Log Analysis", desc: "Parse Windows Event Logs, Syslog, and firewall logs for attack timelines.", icon: "Search" },
      { title: "Malware IoCs", desc: "Identify indicators of compromise from memory dumps and disk artifacts.", icon: "Shield" },
      { title: "IR Playbooks", desc: "Follow enterprise IR playbooks for ransomware, phishing, and data exfil.", icon: "CheckCircle2" },
      { title: "Lab Simulations", desc: "6 end-to-end incident simulations with guided evidence analysis.", icon: "Server" },
    ],
    syllabus: [
      { module: "DFIR Methodology", items: ["Forensic principles and chain of custody", "Evidence categories: volatile vs non-volatile", "NIST SP 800-61 incident response framework"] },
      { module: "Evidence Collection", items: ["Disk imaging: dd, FTK Imager, Guymager", "Memory acquisition: WinPMEM, LiME", "Network capture and PCAP analysis"] },
      { module: "Analysis & Investigation", items: ["Autopsy for disk forensics", "Volatility 3 for memory analysis", "Log timeline reconstruction with Plaso"] },
      { module: "Incident Simulations", items: ["Ransomware incident response walkthrough", "Insider threat investigation lab", "Phishing-to-data-breach simulation"] },
    ],
    outcomes: [
      "Conduct end-to-end digital forensics investigations",
      "Respond to and contain real security incidents",
      "Analyze system memory and disk artifacts for IoCs",
      "Produce chain-of-custody forensic reports for legal use",
    ],
    learningJourney: [
      { title: "Phase 1: Forensic Methodology", desc: "Learn the science of evidence — how to collect, preserve, and handle digital artifacts without tainting them.", img: "https://images.unsplash.com/photo-1614064641913-6b71a2ea3a0e?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Investigate & Analyze", desc: "Dig into disk images, memory dumps, and log files to reconstruct exactly what happened.", img: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 3: Simulate & Report", desc: "Run through 6 realistic incident simulations and produce court-ready forensic reports.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80" },
    ],
    faqs: [
      { q: "What are the prerequisites?", a: "Course 1 (Foundations) and ideally Course 2 (VAPT). Understanding of how attacks happen makes DFIR much more intuitive." },
      { q: "Are the malware samples real?", a: "Yes — defanged, in an isolated VM. You will never touch live malware outside a controlled sandbox." },
      { q: "What tools are used?", a: "Autopsy, Volatility 3, FTK Imager, Wireshark, Plaso, and MITRE ATT&CK Navigator — all free." },
    ],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80",
  },

  /* ─────────────────────────────────────────────────────
   *  CYBER SECURITY PHASES (0-5)
   * ───────────────────────────────────────────────────── */
  "cyber-phase0": {
    tagline: "Computer & IT Foundations",
    fullDescription: "Before you can secure a system, you must understand how it works. This phase covers the bedrock of IT — from computer architecture to operating systems and file systems.",
    highlights: ["Master computer hardware fundamentals", "Understand Windows & Linux basics", "Navigate the terminal confidently"],
    meta: { duration: "2-3 Weeks", level: "Beginner", updated: "May 2025", students: "500+" },
    instructor: {
      name: "Tanmay Sukhadeve",
      title: "Cybersecurity Instructor",
      avatar: null,
      bio: "Tanmay has trained over 2,000 cybersecurity professionals. His teaching style is practical and direct.",
      socials: { linkedin: "#", mail: "tanmay@example.com" },
    },
    features: [
      { title: "Computer Basics", desc: "Understand CPU, RAM, and storage architecture.", icon: "Server" },
      { title: "OS Foundations", desc: "How operating systems manage resources and processes.", icon: "Database" },
      { title: "Terminal Mastery", desc: "Navigate systems entirely via command line.", icon: "Code" }
    ],
    syllabus: [
      { module: "Computer Fundamentals", items: ["Hardware basics", "Memory management", "Storage systems"] },
      { module: "Operating Systems", items: ["Windows vs Linux architecture", "File systems (NTFS, EXT4)", "Process management"] }
    ],
    outcomes: ["Understand core IT infrastructure", "Navigate OS environments via CLI"],
    learningJourney: [
      { title: "Phase 1: IT Basics", desc: "Learn the fundamentals of computing.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: OS & CLI", desc: "Master the operating system and terminal.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" }
    ],
    faqs: [{ q: "Is prior knowledge required?", a: "No, this starts from absolute scratch." }],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  },

  "cyber-phase1": {
    tagline: "Networking Fundamentals",
    fullDescription: "Networks are the battlefield of cybersecurity. Understand how data moves across the internet, master the OSI model, and learn to analyze network traffic with Wireshark.",
    highlights: ["Master TCP/IP and OSI models", "Deep dive into IP addressing and subnetting", "Perform packet analysis"],
    meta: { duration: "3-4 Weeks", level: "Beginner", updated: "May 2025", students: "1,200+" },
    instructor: {
      name: "Tanmay Sukhadeve",
      title: "Cybersecurity Instructor",
      avatar: null,
      bio: "Tanmay brings networking concepts to life with visual explanations and packet-level analysis.",
      socials: { linkedin: "#", mail: "tanmay@example.com" },
    },
    features: [
      { title: "OSI Model", desc: "The 7 layers of networking explained.", icon: "Server" },
      { title: "Subnetting", desc: "Master IP addressing and CIDR notation.", icon: "Database" },
      { title: "Packet Analysis", desc: "Use Wireshark to dissect network traffic.", icon: "Search" }
    ],
    syllabus: [
      { module: "Networking Concepts", items: ["OSI & TCP/IP Models", "IP Addressing & Subnetting", "Routing & Switching"] },
      { module: "Protocols & Analysis", items: ["DNS, DHCP, HTTP/HTTPS", "TCP vs UDP", "Wireshark packet analysis"] }
    ],
    outcomes: ["Design and subnet networks", "Analyze PCAP files for anomalies"],
    learningJourney: [
      { title: "Phase 1: Networking Core", desc: "Learn how networks are built.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Packet Level", desc: "Look inside the traffic using Wireshark.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80" }
    ],
    faqs: [{ q: "Do I need hardware?", a: "No, all networking labs are virtualized." }],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80",
  },

  "cyber-phase2": {
    tagline: "Linux & System Administration",
    fullDescription: "Linux is the operating system of hackers and defenders. Gain complete control over Linux systems, user permissions, services, and basic hardening techniques.",
    highlights: ["Navigate Linux like a pro", "Manage users, groups, and permissions", "Secure and harden Linux servers"],
    meta: { duration: "3-4 Weeks", level: "Beginner", updated: "May 2025", students: "1,500+" },
    instructor: {
      name: "Tanmay Sukhadeve",
      title: "Cybersecurity Instructor",
      avatar: null,
      bio: "Tanmay makes Linux administration intuitive and practical for security professionals.",
      socials: { linkedin: "#", mail: "tanmay@example.com" },
    },
    features: [
      { title: "Command Line", desc: "Bash scripting and terminal utilities.", icon: "Code" },
      { title: "Permissions", desc: "Master chmod, chown, and ACLs.", icon: "Shield" },
      { title: "System Hardening", desc: "Lock down services and configure firewalls.", icon: "CheckCircle2" }
    ],
    syllabus: [
      { module: "Linux Core", items: ["File system hierarchy", "Command line basics", "User & group management"] },
      { module: "Administration", items: ["Process management", "Services (systemd)", "Basic server hardening"] }
    ],
    outcomes: ["Administer Linux servers", "Implement basic security controls"],
    learningJourney: [
      { title: "Phase 1: Linux Basics", desc: "Get comfortable in the terminal.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Administration", desc: "Manage and secure the system.", img: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80" }
    ],
    faqs: [{ q: "Which distro is used?", a: "Ubuntu and Kali Linux." }],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
  },

  "cyber-phase3": {
    tagline: "Cyber Security Foundations",
    fullDescription: "Bridge the gap between IT and Security. Learn the core principles of information security, cryptography, and risk management.",
    highlights: ["Master the CIA Triad", "Understand encryption and hashing", "Analyze the modern threat landscape"],
    meta: { duration: "3-4 Weeks", level: "Beginner", updated: "May 2025", students: "1,800+" },
    instructor: {
      name: "Tanmay Sukhadeve",
      title: "Cybersecurity Instructor",
      avatar: null,
      bio: "Tanmay simplifies complex security concepts into digestible, real-world examples.",
      socials: { linkedin: "#", mail: "tanmay@example.com" },
    },
    features: [
      { title: "CIA Triad", desc: "The foundation of all security decisions.", icon: "Shield" },
      { title: "Cryptography", desc: "Symmetric, asymmetric, and hashing.", icon: "Code" },
      { title: "Threat Intel", desc: "Understand threat actors and their motives.", icon: "Search" }
    ],
    syllabus: [
      { module: "Security Principles", items: ["CIA Triad", "Risk Management", "Security Controls"] },
      { module: "Cryptography", items: ["Encryption basics", "Hashing & Digital Signatures", "PKI"] }
    ],
    outcomes: ["Apply security frameworks", "Understand cryptographic implementations"],
    learningJourney: [
      { title: "Phase 1: Concepts", desc: "Learn the theory of security.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Cryptography", desc: "Understand how data is protected.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80" }
    ],
    faqs: [{ q: "Is this highly technical?", a: "This phase balances theory with practical examples." }],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  },

  "cyber-phase4": {
    tagline: "Ethical Hacking & VAPT",
    fullDescription: "Think like a hacker to defeat one. Master the penetration testing lifecycle from reconnaissance to exploitation using industry-standard tools.",
    highlights: ["Conduct web application pentesting", "Exploit OWASP Top 10 vulnerabilities", "Write professional VAPT reports"],
    meta: { duration: "6-8 Weeks", level: "Intermediate", updated: "May 2025", students: "2,500+" },
    instructor: {
      name: "Tanmay Sukhadeve",
      title: "Cybersecurity Instructor",
      avatar: null,
      bio: "Tanmay's VAPT training is strictly hands-on, simulating real-world enterprise environments.",
      socials: { linkedin: "#", mail: "tanmay@example.com" },
    },
    features: [
      { title: "Reconnaissance", desc: "OSINT and network scanning.", icon: "Search" },
      { title: "Exploitation", desc: "Web and network attacks.", icon: "Zap" },
      { title: "Reporting", desc: "Professional pentest reports.", icon: "FileText" }
    ],
    syllabus: [
      { module: "Information Gathering", items: ["OSINT", "Nmap scanning", "Vulnerability assessment"] },
      { module: "Web Exploitation", items: ["OWASP Top 10", "Burp Suite mastery", "SQLi & XSS"] }
    ],
    outcomes: ["Perform comprehensive pentests", "Exploit common vulnerabilities"],
    learningJourney: [
      { title: "Phase 1: Recon & Scan", desc: "Map the attack surface.", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Exploit", desc: "Attack vulnerable systems in the lab.", img: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80" }
    ],
    faqs: [{ q: "Is this legal?", a: "Yes, all attacks are performed in an authorized lab environment." }],
    isVapt: true,
    mindmapImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },

  "cyber-phase5": {
    tagline: "Digital Forensics & Incident Response",
    fullDescription: "When an attack happens, you are the first responder. Learn digital evidence collection, log analysis, and how to track attackers across compromised systems.",
    highlights: ["Acquire and analyze digital evidence", "Reconstruct attack timelines", "Handle active security incidents"],
    meta: { duration: "6-8 Weeks", level: "Advanced", updated: "May 2025", students: "1,100+" },
    instructor: {
      name: "Tanmay Sukhadeve",
      title: "Cybersecurity Instructor",
      avatar: null,
      bio: "Tanmay teaches DFIR through realistic incident simulations based on actual enterprise breaches.",
      socials: { linkedin: "#", mail: "tanmay@example.com" },
    },
    features: [
      { title: "Evidence Collection", desc: "Disk and memory imaging.", icon: "Database" },
      { title: "Log Analysis", desc: "Timeline reconstruction.", icon: "Search" },
      { title: "Malware Basics", desc: "Identify Indicators of Compromise.", icon: "Shield" }
    ],
    syllabus: [
      { module: "Digital Forensics", items: ["Chain of Custody", "Disk Forensics (Autopsy)", "Memory Forensics"] },
      { module: "Incident Response", items: ["IR Lifecycle", "Log Analysis", "Malware Identification"] }
    ],
    outcomes: ["Conduct forensic investigations", "Respond to enterprise incidents"],
    learningJourney: [
      { title: "Phase 1: Forensics", desc: "Collect and analyze evidence.", img: "https://images.unsplash.com/photo-1614064641913-6b71a2ea3a0e?auto=format&fit=crop&w=800&q=80" },
      { title: "Phase 2: Incident Response", desc: "Hunt threats and respond to breaches.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80" }
    ],
    faqs: [{ q: "What tools are covered?", a: "Autopsy, Volatility, FTK Imager, and more." }],
    isVapt: false,
    mindmapImage: "https://images.unsplash.com/photo-1614064641913-6b71a2ea3a0e?auto=format&fit=crop&w=800&q=80",
  }
};

/**
 * Returns the detail config for a slug, or a safe fallback.
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