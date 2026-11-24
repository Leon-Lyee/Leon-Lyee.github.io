import React, { useState, useEffect } from 'react';
import { Briefcase, Code, Globe, Database, Server, ChevronDown, Mail, Github, Award, Zap, Terminal } from 'lucide-react';

// --- Types ---
interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

interface Project {
  id: string;
  title: string;
  role: string;
  tech: string[];
  description: string;
}

// --- Data（職務経歴書 2026年12月版と揃える） ---
const experiences: Experience[] = [
  {
    id: 'exp0',
    company: '離職期間の取り組み',
    role: '生成AIの業務適用（個人での検証）',
    period: '2024.08 - 現在',
    description: '両親のサポートと並行して基本情報技術者試験に合格（2024.10）。2025年4月から生成AIの業務適用を学び、統制を組み込んだ業務ツールを自作・運用。',
    achievements: [
      '領収書の自動読取・記帳ツール：APIコストを実測してモデルを選定、個人情報は自動マスキング',
      '専門用語を「例え話＋操作できる図解」に変換するツール（日中英3言語）',
      'AIエージェントの運用ルール設計：人の役割、AIが確認なしで実行できる範囲、外部送信前のチェック',
      'ローカルLLM＋RAGを検証し、精度不足と判断して業務手順を読み込ませる方式（Skill）へ切り替え'
    ]
  },
  {
    id: 'exp1',
    company: '東洋アルミニウム株式会社',
    role: '情報システム部門 / 社内SE',
    period: '2018.04 - 2024.07',
    description: 'ITGC（IT全般統制）の監査対応、海外拠点のIT立ち上げ、SaaS・業務システムの導入を担当。業務部門と運用方法を一緒に検討し、現場に定着するまで伴走。',
    achievements: [
      'ITGC監査対応、海外子会社のIT監査（通訳・監査補助）',
      '上海オフィス移転：日中の関係6社を両言語で調整し、現地のIT実務を統括',
      'Notes DB移行：プロジェクトリーダーとして2案を経営層に提示し、約50DBを棚卸し・約45DBを移行、期限内に完了',
      '名刺管理（Sansan）のグループ導入：IT担当責任者としてセキュリティ要件を設計',
      '上申書・ワークフロー約40件の電子化、SharePointによる社内ポータル構築',
      'インフラ：端末1,500台超（Citrix VDI 約1,000台を含む）の運用管理'
    ]
  },
  {
    id: 'exp2',
    company: '株式会社ワークスアプリケーションズ',
    role: '開発職（EコマースERPパッケージ）',
    period: '2015.04 - 2018.02',
    description: 'EコマースERPパッケージの保守、要件定義・設計、販売施策の提案を担当。',
    achievements: [
      '化粧品通販企業向けに「一部の商品だけ次回スキップ」機能を企画・提案し、対象商品の売上が2倍以上に',
      '開発チーム6名のマネジメント（6ヶ月）'
    ]
  },
  {
    id: 'exp3',
    company: '中国煙台莱山国際空港',
    role: '事務＆営業',
    period: '2008.09 - 2010.02',
    description: '空港運営における事務および営業業務に従事。',
    achievements: []
  }
];

const projects: Project[] = [
  {
    id: 'p2',
    title: 'Notes DB 移行',
    role: 'プロジェクトリーダー',
    tech: ['Migration', 'Planning', 'Change Management'],
    description: 'グループ再編に伴う期限付き案件。当初6ヶ月の計画を作業量と体制から検証し、「増員で6ヶ月」「最短9ヶ月」の2案を経営層に提示、9ヶ月案が採用。約50DBを棚卸しして約45DBを移行し、残りは廃止・統合して期限内に完了。'
  },
  {
    id: 'p1',
    title: '上海オフィス移転 & グローバルIT統制',
    role: 'IT実務統括',
    tech: ['Network', 'File Server', 'IT Governance'],
    description: '現地ネットワーク・ファイルサーバー構築、国際TV会議網の移設を統括。NEC・KDDI・現地法人・引越業者等の6社を日中両言語で調整し、本社の統制ルールを現地に展開。'
  },
  {
    id: 'p3',
    title: '障害報告アプリ（自主開発）',
    role: '企画・開発',
    tech: ['PowerApps', 'Power Automate', 'SharePoint'],
    description: '障害情報を共有するアプリをローコードで開発。利用者約150名に定着し、退職時点で延べ約170名が利用。退職後も継続運用。'
  },
  {
    id: 'p4',
    title: '領収書の自動読取・記帳ツール',
    role: '個人開発（2026〜）',
    tech: ['Claude API', 'Python', 'Data Masking'],
    description: '写真・PDFから経費台帳（Excel）へ自動記帳。1枚あたりのAPIコスト（約3〜6円）を実測して精度とコストでモデルを選び、氏名・住所等は自動マスキングしてからAIへ送信。'
  },
  {
    id: 'p5',
    title: '専門用語の例え話・図解ツール',
    role: '個人開発（2026〜）',
    tech: ['Claude API', 'FastAPI', 'Sandbox'],
    description: 'IT・金融・法務などの専門用語を、身近な例え話と操作できる図解に変換（日中英3言語）。部門間の認識のずれを埋める用途を想定し、AIが生成したプログラムは通信を禁止した隔離環境で実行。'
  }
];

const skills = [
  { category: 'Development', items: ['Claude API / Claude Code', 'Python', 'Java', 'SQL', 'PowerApps'] },
  { category: 'Infrastructure', items: ['Active Directory', 'Citrix VDI', 'Network', 'Microsoft 365', 'SharePoint'] },
  { category: 'Management', items: ['IT Governance (ITGC / J-SOX)', 'Security Policy', 'Vendor Control', 'Project Leadership'] },
  { category: 'Languages', items: ['Japanese (JLPT N1)', 'Chinese (Native)', 'English (Reading)'] }
];

// --- Components ---

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000); // Pause at end
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100); // Typing speed vs deleting speed

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
      {words[index].substring(0, subIndex)}
      <span className={`text-white ml-1 ${blink ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </span>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-12 relative">
    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 relative z-10 tracking-tighter">
      {title}
    </h2>
    <div className="text-gray-400 font-mono text-sm tracking-widest uppercase pl-1">
      {subtitle}
    </div>
    <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -z-0"></div>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-lg hover:border-blue-500/50 transition-all duration-300 group ${className}`}>
    {children}
  </div>
);

// --- Main App ---

export default function App() {
  // Smooth scroll handler
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 selection:bg-blue-500/30 selection:text-white font-sans">
      
      {/* Background Animated Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full mix-blend-screen blur-[100px] animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full mix-blend-screen blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-900/20 rounded-full mix-blend-screen blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="text-xl font-bold font-mono tracking-tighter text-white">
          LH.<span className="text-blue-500">DEV</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-mono text-gray-400">
          {['About', 'Experience', 'Projects', 'Skills'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="hover:text-white transition-colors uppercase tracking-widest relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex flex-col justify-center items-center px-6 z-10">
        <div className="max-w-5xl w-full">
          <p className="font-mono text-blue-400 mb-4 animate-fade-in-up text-lg">こんにちは、私は</p>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-6 tracking-tighter leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Li Hanbing
          </h1>
          <div className="text-2xl md:text-4xl font-light text-gray-300 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            I am an <Typewriter words={['In-house SE.', 'IT Governance Specialist.', 'AI Practitioner.']} />
          </div>
          
          <div className="max-w-2xl text-gray-400 leading-relaxed animate-fade-in-up text-xl" style={{ animationDelay: '0.3s' }}>
            IT統制の実務と生成AIの活用で、「便利さ」と「統制」を両立させる社内SE。<br className="hidden md:block"/>
            日本語・中国語で、現場と経営、日本と海外をつなぎます。
          </div>

          <div className="mt-16 animate-bounce cursor-pointer" onClick={() => scrollTo('about')}>
            <ChevronDown className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative z-10 bg-black/30">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="About Me" subtitle="WHO I AM" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-300 leading-loose text-lg">
              <p>
                1986年生まれ。中国出身、日本在住の社内SEです。
                経済学の修士課程を修了後にITキャリアをスタートし、
                業務側の視点から、技術を現場の言葉に置き換えて伝えることを得意としています。
              </p>
              <p>
                素材メーカーの情報システム部門で約6年、ITGC対応、海外拠点のIT立ち上げ、
                SaaS・業務システムの導入を担当してきました。
              </p>
              <p>
                2025年からは生成AIの業務適用に取り組み、コスト計測や個人情報保護を
                組み込んだ業務ツールを自作・運用しています。
              </p>
              
              <div className="pt-6 grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-3">
                    <Award className="text-blue-500 w-6 h-6" />
                    <span className="text-base font-mono">基本情報技術者</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Globe className="text-yellow-500 w-6 h-6" />
                    <span className="text-base font-mono">日本語能力試験 N1</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg transform rotate-3 blur opacity-30"></div>
              <div className="bg-[#111] border border-white/10 p-8 rounded-lg relative overflow-hidden">
                <Terminal className="w-8 h-8 text-gray-500 mb-6" />
                <div className="font-mono text-base space-y-2 text-green-400">
                  <p><span className="text-purple-400">const</span> <span className="text-blue-400">philosophy</span> = &#123;</p>
                  <p className="pl-4">mission: <span className="text-yellow-300">'Bridge the Gap'</span>,</p>
                  <p className="pl-4">values: [<span className="text-yellow-300">'Adaptability'</span>, <span className="text-yellow-300">'Ownership'</span>],</p>
                  <p className="pl-4">focus: <span className="text-yellow-300">'Value Creation'</span></p>
                  <p>&#125;;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Experience" subtitle="CAREER PATH" />
          
          <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-8 md:pl-12 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] top-2 w-[11px] h-[11px] rounded-full bg-gray-600 group-hover:bg-blue-500 transition-colors duration-300 ring-4 ring-[#050505]"></div>
                
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                  <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {exp.company}
                  </h3>
                  <span className="font-mono text-base text-gray-500">{exp.period}</span>
                </div>
                
                <h4 className="text-xl text-gray-300 mb-4 font-mono">{exp.role}</h4>
                
                <p className="text-gray-400 mb-4 leading-relaxed text-lg">
                  {exp.description}
                </p>

                {exp.achievements.length > 0 && (
                  <ul className="space-y-2">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-base text-gray-400">
                        <span className="text-blue-500 mt-1">▹</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative z-10 bg-black/30">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Skills" subtitle="TECHNOLOGIES" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup) => (
              <Card key={skillGroup.category} className="h-full">
                <div className="mb-4">
                  {skillGroup.category === 'Development' && <Code className="w-10 h-10 text-blue-500" />}
                  {skillGroup.category === 'Infrastructure' && <Server className="w-10 h-10 text-purple-500" />}
                  {skillGroup.category === 'Management' && <Briefcase className="w-10 h-10 text-green-500" />}
                  {skillGroup.category === 'Languages' && <Globe className="w-10 h-10 text-pink-500" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <span key={item} className="px-3 py-1.5 bg-white/5 text-sm font-mono text-gray-300 border border-white/5 rounded-full hover:bg-white/10 transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Projects" subtitle="SELECTED WORK" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col h-full group">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <Database className="w-10 h-10 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    <div className="flex gap-2">
                       {/* Placeholder for project links if any */}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-sm font-mono text-blue-400 mb-4">{project.role}</div>
                  <p className="text-gray-400 text-base leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                  {project.tech.map((t) => (
                    <span key={t} className="text-sm font-mono text-gray-500">
                      #{t}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8 tracking-tighter">
            Let's work together.
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            新しいプロジェクト、技術的な相談、または単なる挨拶でも構いません。<br />
            お気軽にご連絡ください。
          </p>
          
          <div className="flex justify-center gap-8 mb-16">
            <a href="mailto:wolfvslion100@yahoo.co.jp" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-lg">
              <Mail className="w-6 h-6 group-hover:text-blue-400" />
              <span>Email Me</span>
            </a>
            <a href="https://github.com/Leon-Lyee" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-lg">
              <Github className="w-6 h-6 group-hover:text-purple-400" />
              <span>GitHub</span>
            </a>
          </div>

          <div className="text-sm text-gray-600 font-mono">
            <p>&copy; {new Date().getFullYear()} Li Hanbing. All rights reserved.</p>
            <p className="mt-2">Designed with React & Tailwind CSS.</p>
          </div>
        </div>
      </section>
    </div>
  );
}