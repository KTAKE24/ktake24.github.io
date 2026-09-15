import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "自己紹介", id: "about" },
  { label: "スキル", id: "skills" },
  { label: "制作物", id: "projects" },
  { label: "お問い合わせ", id: "contact" },
];

const SKILLS = [
  { category: "言語", items: ["TypeScript", "Python", "Go", "Rust"] },
  { category: "フロントエンド", items: ["React", "Next.js", "Tailwind CSS", "WebGL"] },
  { category: "バックエンド", items: ["Node.js", "FastAPI", "PostgreSQL", "Redis"] },
  { category: "インフラ", items: ["Docker", "Kubernetes", "AWS", "Terraform"] },
];

const PROJECTS = [
  {
    id: "01",
    name: "物流最適化",
    description: "Go製の高性能分散ジョブキュー。サブミリ秒のレイテンシで毎秒100万件以上のタスク処理を実現。",
    tags: ["Go", "Redis", "gRPC"],
    year: "2025",
    link: "#",
  },
  {
    id: "02",
    name: "Prism UI",
    description: "完全型付きAPIを持つReact向けヘッドレスコンポーネントライブラリ。ゼロランタイム依存・ARIA完全対応。",
    tags: ["TypeScript", "React", "Rollup"],
    year: "2024",
    link: "#",
  },
  {
    id: "03",
    name: "Substrate",
    description: "宣言的なYAML DSLからTerraform設定を自動生成するIaCプラットフォーム。ドリフト検知機能搭載。",
    tags: ["Python", "Terraform", "AWS"],
    year: "2024",
    link: "#",
  },
];

function useTypingEffect(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((w) => (w + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        borderBottom: scrolled ? "1px solid #e2e2de" : "1px solid transparent",
        background: scrolled ? "rgba(248,248,246,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-center">
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="font-sans text-base font-semibold text-[#666] hover:text-[#0a0a0a] transition-colors border-b border-[#e2e2de] pb-0.5"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#666] hover:text-[#0a0a0a] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-px bg-current transition-transform duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-4 h-px bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-current transition-transform duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#e2e2de] bg-[#f8f8f6] px-6 py-4 space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="block font-sans text-sm text-[#666] hover:text-[#0a0a0a] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const roles = ["フルスタックエンジニア", "システム開発者", "OSS コントリビューター", "インフラ好き"];
  const role = useTypingEffect(roles);

  return (
    <section className="flex flex-col justify-center max-w-6xl mx-auto px-6 pt-32 pb-16">
      <div className="grid md:grid-cols-[1fr_auto] gap-16 items-center">
        <div>
          <div className="flex items-end gap-6 mb-6">
            <h1 className="font-sans font-semibold leading-none tracking-tight" style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}>
              金子{" "}<span className="text-[#333]">赳士</span>
            </h1>
            <a
              href="https://github.com/yamadakenji"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#999] hover:text-[#0a0a0a] transition-colors mb-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span className="font-mono text-xs tracking-widest">GitHub</span>
            </a>
          </div>

          <p className="font-sans text-base tracking-[0.3em] text-[#999] mb-8">
            KANEKO TAKESHI
          </p>


</div>

      </div>

    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 border-t border-[#e2e2de]">
      <div className="max-w-6xl mx-auto px-6">
        <span className="font-sans text-xl font-semibold text-[#0a0a0a] border-b-2 border-[#0a0a0a] pb-1">自己紹介</span>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-12 grid md:grid-cols-2 gap-12">
          <div>
<p className="text-[#666] leading-relaxed mb-4 text-base">
              東京都市大学デザイン・デザインデータ科学部3年。大学では、画像処理や信号処理について学んでいました。
            </p>
            <p className="text-[#666] leading-relaxed text-base">
              趣味は運動と小旅行です。
            </p>
          </div>

      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-[#e2e2de]">
      <div className="max-w-6xl mx-auto px-6">
        <span className="font-sans text-xl font-semibold text-[#0a0a0a] border-b-2 border-[#0a0a0a] pb-1">スキル</span>

        <div className="grid grid-cols-2 md:grid-cols-4 border border-[#e2e2de] mt-12">
          {SKILLS.map((group, gi) => (
            <div key={group.category} className={`border-b md:border-b-0 ${gi < SKILLS.length - 1 ? "border-r border-[#e2e2de]" : ""}`}>
              <div className="px-5 py-3 border-b border-[#e2e2de] bg-[#ffffff]">
                <span className="font-mono text-sm tracking-widest text-[#444] uppercase">{group.category}</span>
              </div>
              <div className="px-5 py-4 space-y-3">
                {group.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#0a0a0a] opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="font-mono text-base text-[#888] group-hover:text-[#0a0a0a] transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-[#e2e2de]">
      <div className="max-w-6xl mx-auto px-6">
        <span className="font-sans text-xl font-semibold text-[#0a0a0a] border-b-2 border-[#0a0a0a] pb-1">制作物</span>

        <div className="border border-[#e2e2de] mt-12">
          {PROJECTS.map((project, i) => (
            <a
              key={project.id}
              href={project.link}
              className="group flex flex-col md:flex-row gap-4 md:gap-8 px-6 py-6 border-b border-[#e2e2de] last:border-b-0 hover:bg-[#f0f0ed] transition-colors"
            >
              <div className="flex items-start md:items-center shrink-0">
                <span className="font-mono text-xs text-[#333] tracking-widest">{project.id}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start md:items-center gap-4 mb-2">
                  <h3 className="font-sans font-semibold text-xl group-hover:text-[#0a0a0a] transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] tracking-widest px-2 py-0.5 border border-[#e2e2de] text-[#555] uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[#555] text-base leading-relaxed">{project.description}</p>
              </div>
              <div className="flex md:flex-col items-center md:items-end justify-between shrink-0 gap-2">
                <span className="font-mono text-xs text-[#333]">{project.year}</span>
                <span className="font-mono text-xs text-[#0a0a0a] opacity-0 group-hover:opacity-100 transition-opacity">
                  詳細 →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass =
    "w-full bg-[#ffffff] border border-[#e2e2de] px-4 py-3 font-sans text-base text-[#0a0a0a] placeholder-[#aaa] focus:outline-none focus:border-[#0a0a0a] transition-colors";

  return (
    <section id="contact" className="py-24 border-t border-[#e2e2de]">
      <div className="max-w-6xl mx-auto px-6">
        <span className="font-sans text-xl font-semibold text-[#0a0a0a] border-b-2 border-[#0a0a0a] pb-1">お問い合わせ</span>
      </div>

      <div className="max-w-lg mx-auto px-6 mt-12">
        <div>
          {sent ? (
            <div className="border border-[#e2e2de] flex items-center justify-center p-12">
              <div className="text-center">
                <div className="font-mono text-[#0a0a0a] text-2xl mb-3">✓</div>
                <p className="font-sans text-sm text-[#666]">メッセージを受け取りました。<br />近日中にご連絡します。</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="お名前"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
              <input
                type="email"
                placeholder="メールアドレス"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
              <textarea
                placeholder="メッセージ"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inputClass + " resize-none"}
              />
              <button
                type="submit"
                className="w-full font-sans text-base bg-[#0a0a0a] text-[#f8f8f6] py-3 font-medium hover:opacity-90 transition-opacity"
              >
                送信する
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#e2e2de] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-sans text-sm text-[#333]">© 2026 Takeshi Kaneko. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: "#f8f8f6", color: "#0a0a0a" }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
