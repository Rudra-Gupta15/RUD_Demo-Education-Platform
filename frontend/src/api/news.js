const API_KEY = import.meta.env.VITE_NEWS_API_KEY?.trim() || "";
const BASE_URL = "https://newsdata.io/api/1/news";

export async function fetchNews() {
  if (!API_KEY) {
    console.warn("News API Key missing. Using fallback data.");
    return getFallbackNews();
  }

  try {
    const query = "artificial intelligence OR cybersecurity OR machine learning OR deep learning OR LLM OR data science";
    const baseUrl = `${BASE_URL}?apikey=${API_KEY}&q=${encodeURIComponent(query)}&language=en&category=technology&size=10`;

    let response = await fetch(baseUrl);
    let data = await response.json();

    if (data.status !== "success" || !data.results) {
      console.error("NewsData API Error:", data.message || "Unknown error");
      return getFallbackNews();
    }

    let allResults = [...data.results];

    if (data.nextPage) {
      try {
        const secondResponse = await fetch(`${baseUrl}&page=${data.nextPage}`);
        const secondData = await secondResponse.json();
        if (secondData.status === "success" && secondData.results) {
          allResults = [...allResults, ...secondData.results];
        }
      } catch (err) {
        console.warn("Could not fetch second page:", err);
      }
    }

    const allNews = allResults
      .filter((article) => article.title && article.link)
      .map((article, idx) => {
        const titleLower = article.title.toLowerCase();
        const descLower = (article.description || "").toLowerCase();

        let displayCategory = "Artificial Intelligence";

        if (
          titleLower.includes("cyber") ||
          titleLower.includes("security") ||
          titleLower.includes("hack") ||
          titleLower.includes("malware") ||
          titleLower.includes("ransomware") ||
          titleLower.includes("vulnerability") ||
          titleLower.includes("breach") ||
          descLower.includes("vapt") ||
          descLower.includes("penetration")
        ) {
          displayCategory = "Cybersecurity / VAPT";
        } else if (
          titleLower.includes("machine learning") ||
          titleLower.includes("neural network") ||
          titleLower.includes("deep learning") ||
          titleLower.includes("mlops") ||
          titleLower.includes("pytorch") ||
          titleLower.includes("tensorflow")
        ) {
          displayCategory = "Machine Learning";
        } else if (
          titleLower.includes("data") ||
          titleLower.includes("analytics") ||
          titleLower.includes("big data") ||
          titleLower.includes("business intelligence")
        ) {
          displayCategory = "Data & Business Analytics";
        } else if (
          titleLower.includes("ai") ||
          titleLower.includes("artificial intelligence") ||
          titleLower.includes("llm") ||
          titleLower.includes("gpt") ||
          titleLower.includes("chatbot") ||
          titleLower.includes("generative") ||
          titleLower.includes("openai") ||
          titleLower.includes("anthropic") ||
          titleLower.includes("gemini")
        ) {
          displayCategory = "Artificial Intelligence";
        }

        return {
          id: `news-${article.article_id || idx}`,
          title: article.title,
          excerpt: article.description || "Explore the latest developments in AI and Cybersecurity.",
          category: displayCategory,
          read_time: "5 min",
          author: (article.creator && article.creator[0]) || article.source_id || "Industry Expert",
          created_at: article.pubDate || new Date().toISOString(),
          image: article.image_url || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80",
          url: article.link,
        };
      });

    if (allNews.length === 0) return getFallbackNews();
    return allNews;

  } catch (error) {
    console.error("Critical News Fetch Error:", error);
    return getFallbackNews();
  }
}

function getFallbackNews() {
  return [
    {
      id: "ai-1",
      title: "GPT-5 Rumors: What to Expect from the Next Frontier",
      excerpt: "Deep dive into the leaked capabilities of the next major LLM release and how it might redefine general intelligence.",
      category: "Artificial Intelligence",
      read_time: "6 min",
      author: "Tech Insider",
      created_at: "2026-05-01T10:00:00Z",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80",
      url: "#",
    },
    {
      id: "ai-2",
      title: "The Rise of Autonomous AI Agents in Software Engineering",
      excerpt: "Exploring the capabilities and limits of tools like Devin and open-source alternatives for everyday coding tasks.",
      category: "Artificial Intelligence",
      read_time: "8 min",
      author: "Future Labs",
      created_at: "2026-04-10T12:00:00Z",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&h=600&q=80",
      url: "#",
    },
    {
      id: "ai-3",
      title: "Generative Video: The New Frontier of Content Creation",
      excerpt: "How Sora and its competitors are transforming Hollywood and social media with text-to-video technology.",
      category: "Artificial Intelligence",
      read_time: "5 min",
      author: "Media Tech",
      created_at: "2026-04-28T09:30:00Z",
      image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&q=80",
      url: "#",
    },
    {
      id: "ai-4",
      title: "On-Device AI: Running LLMs on your Smartphone",
      excerpt: "The shift towards local inference is prioritizing privacy and reducing latency for mobile AI applications.",
      category: "Artificial Intelligence",
      read_time: "7 min",
      author: "Silicon Valley",
      created_at: "2026-04-25T14:20:00Z",
      image: "https://images.unsplash.com/photo-1512428559083-a401c33c2b65?auto=format&fit=crop&q=80",
      url: "#",
    },
    {
      id: "cyber-1",
      title: "Critical Zero-Day Vulnerability Found in Linux Kernel",
      excerpt: "A newly discovered exploit allows for unauthenticated remote code execution. Patch your systems immediately.",
      category: "Cybersecurity / VAPT",
      read_time: "4 min",
      author: "Security First",
      created_at: "2026-05-03T08:00:00Z",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
      url: "#",
    },
    {
      id: "cyber-2",
      title: "Understanding Prompt Injection: The New Security Threat",
      excerpt: "How attackers are manipulating LLMs through prompt engineering to bypass safety filters and leak data.",
      category: "Cybersecurity / VAPT",
      read_time: "5 min",
      author: "Infosec Daily",
      created_at: "2026-04-15T12:00:00Z",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&h=600&q=80",
      url: "#",
    },
    {
      id: "cyber-3",
      title: "Log4j Style Bug Discovered in Popular NPM Package",
      excerpt: "Security researchers have identified a critical bug that could affect millions of JavaScript applications worldwide.",
      category: "Cybersecurity / VAPT",
      read_time: "10 min",
      author: "Global Sec",
      created_at: "2026-04-20T11:15:00Z",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80",
      url: "#",
    },
    {
      id: "cyber-4",
      title: "Ransomware-as-a-Service: The Evolution of Digital Extortion",
      excerpt: "How organized groups are scaling their operations with affiliate models and sophisticated encryption tools.",
      category: "Cybersecurity / VAPT",
      read_time: "8 min",
      author: "Sec Intel",
      created_at: "2026-04-22T10:00:00Z",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
      url: "#",
    },
    {
      id: "ml-1",
      title: "Advanced Neural Architecture Search for Edge Devices",
      excerpt: "New methods for optimizing machine learning models to run on low-power hardware without sacrificing accuracy.",
      category: "Machine Learning",
      read_time: "12 min",
      author: "ML Daily",
      created_at: "2026-05-02T16:00:00Z",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80",
      url: "#",
    },
    {
      id: "ml-2",
      title: "Essential MLOps Tools for Data Teams in 2026",
      excerpt: "A comprehensive review of the best tools for versioning models and automating large-scale deployments.",
      category: "Machine Learning",
      read_time: "6 min",
      author: "DevOps World",
      created_at: "2026-04-05T12:00:00Z",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=600&q=80",
      url: "#",
    },
    {
      id: "ml-3",
      title: "Synthetic Data: Solving the Data Scarcity Problem",
      excerpt: "How companies are using generative models to create high-quality training data for specialized ML tasks.",
      category: "Machine Learning",
      read_time: "9 min",
      author: "Data Craft",
      created_at: "2026-04-18T11:00:00Z",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80",
      url: "#",
    },
    {
      id: "ml-4",
      title: "The Impact of Quantum Computing on Modern Cryptography",
      excerpt: "Analyzing the timeline for Shor's algorithm and the urgent need for post-quantum cryptographic standards.",
      category: "Machine Learning",
      read_time: "15 min",
      author: "Quantum Lab",
      created_at: "2026-04-12T14:00:00Z",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80",
      url: "#",
    },
  ];
}