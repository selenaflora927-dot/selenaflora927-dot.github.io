/**
 * astro-theme-ink · site configuration
 * Everything the theme needs in one typed object — no virtual modules,
 * just import { config } from '@/site-config' where needed.
 */

export interface NavItem {
  title: string
  link: string
}

export interface FriendLink {
  name: string
  desc: string
  url: string
  /** Absolute URL of the avatar image. Optional. */
  avatar?: string
}

export interface EducationItem {
  school: string
  /** e.g. "计算机技术" */
  major?: string
  /** e.g. "硕士" */
  degree?: string
  /** e.g. "August 2021 - July 2024" */
  date: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface HomeHeroConfig {
  /** Tagline chip above the name, e.g. "Developer / Designer / Photographer" */
  tagline?: string
  /** Location label, e.g. "China / QingDao" */
  location?: string
  /** About paragraph under the name */
  about: string
  /** Short homepage introduction; falls back to the first paragraph of about. */
  summary?: string
  /** Action buttons */
  buttons?: { title: string; link: string }[]
}

/** Home page content — edit this file and sections appear/disappear automatically. */
export interface HomeConfig {
  hero: HomeHeroConfig
  /** How many recent posts to show; capped at 5 (0 hides the section). */
  recentPosts: number
  /** Education timeline; renders when non-empty */
  education?: EducationItem[]
  /** Skill groups; renders when non-empty */
  skills?: SkillGroup[]
  /** Show the tag cloud on the home page */
  showTags: boolean
  /** Show friend links on the home page */
  showFriends: boolean
}

export interface Config {
  /** Site identity */
  site: {
    title: string
    /** Shown on the home page hero and in the footer copyright */
    author: string
    description: string
    lang: string
    favicon: string
    /** Avatar image shown on the home page hero; a path under `public/` */
    avatar: string
    /** Open-graph image path under `public/` */
    ogImage: string
    /** Founding year of the blog — used by the console easter egg */
    since: number
    /** Default color palette for first-time visitors: 'ink' (warm) | 'fresh' (mint) */
    palette: 'ink' | 'fresh'
    /** Default theme for first-time visitors: 'light' | 'dark' | 'system' (follow OS) */
    theme: 'light' | 'dark' | 'system'
    /** e.g. " · " */
    titleDelimiter: string
  }
  header: {
    menu: NavItem[]
  }
  /** Article page views — Waline server URL; leave empty to disable.
   *  Waline 3 counts via POST `/article` (v2 counted on GET); the theme
   *  handles both. The same server also powers the site-wide counter below. */
  pageview: {
    server: string
    /** Site-wide total-visits counter in the footer (shares the same server) */
    siteWide: boolean
  }
  footer: {
    /** Show a quote selected at build time; omitted or false keeps the footer quiet. */
    showQuote?: boolean
    /** Shown as `© <year> <author>`; set a custom string to override entirely */
    copyright?: string
    /** Extra plain-text links rendered next to the copyright */
    links?: { title: string; url: string }[]
    social?: Record<string, { label: string; url: string }>
  }
  blog: {
    pageSize: number
  }
  /** Home page content (config-driven sections) */
  home: HomeConfig
  /** Lightweight client-side search (no external indexer) */
  search: {
    enabled: boolean
  }
  /**
   * Waline comment system. Leave `server` empty to disable.
   * See https://waline.js.org to deploy your own Waline instance.
   */
  comment: {
    provider: 'waline'
    server: string
  }
  friends: FriendLink[]
}

export const config: Config = {
  site: {
    title: '君子攸宁',
    author: '小宁',
    description: '小宁的自留地 —— 记录日常、小插件与生活碎片。',
    lang: 'zh-CN',
    favicon: '/favicon/favicon.ico',
    avatar: '/avatar.webp',
    ogImage: '/og-card.svg',
    since: 2026,
    palette: 'ink',
    theme: 'system',
    titleDelimiter: ' · '
  },
  header: {
    menu: [
      { title: '博客', link: '/blog' },
      { title: '归档', link: '/archives' },
      { title: '标签', link: '/tags' },
      { title: '友链', link: '/links' },
      { title: '关于', link: '/about' }
    ]
  },

  // Article page views + site-wide visit counter (your own Waline server)
  pageview: {
    server: 'https://junzi-youning.netlify.app/.netlify/functions/comment',
    siteWide: false
  },

  footer: {
    showQuote: true,
    copyright: `© 2026 - ${new Date().getFullYear()} 小宁`,
    links: [
      { title: 'RSS', url: '/rss.xml' }
    ],
    social: {
      github: { label: 'GitHub', url: 'https://github.com/selenaflora927-dot' }
    }
  },

  blog: {
    pageSize: 8
  },

  // Home page content — edit this and the sections render automatically
  home: {
    hero: {
      tagline: '折腾小插件 / 记录生活',
      location: 'China / ChangSha',
      about:
        '你好，我是小宁。这里是我的自留地，写写日常、放放自制的小插件，欢迎认真看完这里，认识一下我。\n\n博客还在慢慢搭，慢慢来。',
      buttons: [{ title: '关于我', link: '/about' }]
    },
    recentPosts: 5,
    education: [],
    skills: [
      { title: '折腾过的东西', items: ['Termux', 'Linux', 'fcitx5', 'Hugo', 'Astro'] }
    ],
    showTags: false,
    showFriends: false
  },

  search: {
    enabled: true
  },

  comment: {
    provider: 'waline',
    // Waline server deployed as Netlify Function (zip direct-upload).
    // Function direct path — see /tmp route notes; CORS open via a-c-allow-origin: *
    server: 'https://junzi-youning.netlify.app/.netlify/functions/comment'
  },

  friends: []
}
