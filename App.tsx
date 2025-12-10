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

// --- Data (Extracted from OCR) ---
const experiences: Experience[] = [
  {
    id: 'exp1',
    company: '東洋アルミニウム株式会社',
    role: 'ITマネジメント / 社内SE',
    period: '2018.04 - 2024.07',
    description: 'グローバルIT統制、社内DX推進、インフラ管理を担当。創業100年近い企業の変革期において、経営層と現場の橋渡し役として従事。',
    achievements: [
      '上海オフィス移転プロジェクト：現地法人設立に伴うネットワーク・サーバー構築を主導',
      'Notes DB移行：半年間で50DBの移行を達成、納期遵守と現場の定着化を実現',
      '社内DX：PowerAppsを用いた障害報告アプリ開発（150ユーザー利用）',
      'インフラ・セキュリティ：Citrix VDI環境運用、全社ヘルプデスク管理'
    ]
  },
  {
    id: 'exp2',
    company: '株式会社ワークスアプリケーションズ',
    role: 'パッケージ開発エンジニア',
    period: '2015.04 - 2018.02',
    description: 'EコマースERPパッケージ（ECERP）の開発および保守を担当。',
    achievements: [
      'CACWEB販売特定商品売上 200%UPに貢献',
      '要件定義から設計、保守まで幅広いフェーズを担当',
      '6人チームの開発リード経験'
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
    id: 'p1',
    title: 'グローバルIT統制 & 上海オフィス立ち上げ',
    role: 'PM / インフラ担当',
    tech: ['Network Design', 'Server Construction', 'IT Governance'],
    description: '中国現地法人設立に伴い、単独でネットワーク・ファイルサーバー構築を主導。現地ベンダー（KDDI/NEC等）および引っ越し業者計6社をコントロールし、IT統制基盤を確立。'
  },
  {
    id: 'p2',
    title: 'Notes DB マイグレーション',
    role: 'プロジェクトリーダー',
    tech: ['Migration', 'Data Analysis', 'Change Management'],
    description: '会社合併の必須条件として、半年間で50DBの移行プロジェクトを完遂。「技術的難易度」と「現場の抵抗」という二重の課題に対し、段階的導入計画と徹底したリソース管理で解決。'
  },
  {
    id: 'p3',
    title: '社内DX / 障害報告プラットフォーム',
    role: '企画・開発',
    tech: ['PowerApps', 'Power Automate', 'SharePoint'],
    description: '「みんなで障害報告」アプリをローコード開発。約170名までユーザーが増加し、社内の障害共有フローを効率化。'
  }
];

const skills = [
  { category: 'Development', items: ['Java', 'SQL', 'HTML/CSS', 'PowerApps', 'Python (AI Learning)'] },
  { category: 'Infrastructure', items: ['Windows Server', 'Network', 'Citrix VDI', 'Azure/O365', 'IT Security'] },
  { category: 'Management', items: ['Project Management', 'IT Governance', 'Vendor Control', 'Bridge SE (JP/CN)'] },
  { category: 'Languages', items: ['Japanese (N1/Fluent)', 'Chinese (Native)', 'English (Reading)'] }
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
            I am a <Typewriter words={['Bridge SE.', 'Project Manager.', 'DX Promoter.', 'Solutions Architect.']} />
          </div>
          
          <div className="max-w-2xl text-gray-400 leading-relaxed animate-fade-in-up text-xl" style={{ animationDelay: '0.3s' }}>
            グローバルな視点と技術力で、ビジネスの課題を解決するITプロフェッショナル。<br className="hidden md:block"/>
            異文化間の架け橋となり、複雑なプロジェクトを成功に導きます。
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
                1986年生まれ。中国出身、日本在住のエンジニア兼プロジェクトマネージャーです。
                経済学部出身という異色のバックグラウンドを持ちながら、ITキャリアをスタートさせ、
                「未経験分野」を「新たな強み」に変える適応力を培ってきました。
              </p>
              <p>
                日系大手メーカーでのグローバルIT統制や、ERPパッケージ開発の経験を通じて、
                技術的な課題解決だけでなく、組織間の政治的・文化的課題の解決にも強みを持っています。
              </p>
              <p>
                直近ではAI技術（LLM）の研究や、金融トレーディングアルゴリズムの学習など、
                常に新しい技術領域への挑戦を続けています。
              </p>
              
              <div className="pt-6 grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-3">
                    <Award className="text-blue-500 w-6 h-6" />
                    <span className="text-base font-mono">基本情報技術者</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Zap className="text-yellow-500 w-6 h-6" />
                    <span className="text-base font-mono">二等無人機操縦士</span>
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
            <a href="#" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-lg">
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