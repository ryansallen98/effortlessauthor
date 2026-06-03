// Single source of truth for site navigation, so nav + footer stay in sync
// and every link resolves to a real route or on-page anchor.
export const primaryNav = [
  { href: "/", label: "Home" },
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
    title: "Docs",
    links: [
      { href: "/resources", label: "All docs" },
      { href: "/resources/quick-start", label: "Quick start" },
      { href: "/resources/kdp-metadata", label: "KDP metadata" },
      { href: "/resources/api-overview", label: "API reference" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/updates", label: "Updates" },
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
