// Single source of truth for site navigation, so nav + footer stay in sync
// and every link resolves to a real route or on-page anchor.
export const primaryNav = [
  { href: "/features", label: "Features" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features overview" },
      { href: "/features#workflow", label: "File-first workflow" },
      { href: "/features#kdp", label: "KDP pipeline" },
      { href: "/features#kdp", label: "EPUB export" },
      { href: "/features#audio", label: "Audio rendering" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/resources", label: "All guides" },
      { href: "/resources/markdown-to-kdp-epub", label: "Markdown to KDP EPUB" },
      { href: "/resources/structure-a-nonfiction-book", label: "Structure a nonfiction book" },
      { href: "/resources/nav-xhtml-vs-toc-ncx", label: "nav.xhtml vs toc.ncx" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/early-access", label: "Early access" },
      { href: "/early-access#demo", label: "Request a demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/cookies", label: "Cookies" },
    ],
  },
];
