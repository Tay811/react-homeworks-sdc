export type NavItem = {
  label: string;
  href?: string;
  target?: string;
  rel?: string;
  tooltip?: string;
};

export type NavSection = {
  title: string;
  titleHref?: string;
  titleTarget?: string;
  dense?: boolean;
  items: NavItem[];
};

export const defaultSections: NavSection[] = [
  {
    title: "footerNav.company.title",
    items: [
      { label: "footerNav.company.items.home", href: "#" },
      { label: "footerNav.company.items.order", href: "#" },
      { label: "footerNav.company.items.faq", href: "#" },
      { label: "footerNav.company.items.contact", href: "#" },
    ],
  },
  {
    title: "footerNav.template.title",
    titleHref: "https://www.google.com",
    titleTarget: "_blank",
    items: [
      {
        label: "footerNav.template.items.styleGuide",
        href: "https://www.google.com",
        target: "_blank",
      },
      {
        label: "footerNav.template.items.changelog",
        href: "https://www.google.com",
        target: "_blank",
      },
      {
        label: "footerNav.template.items.licence",
        href: "https://www.google.com",
        target: "_blank",
      },
      {
        label: "footerNav.template.items.webflowUniversity",
        href: "https://www.google.com",
        target: "_blank",
      },
    ],
  },
  {
    title: "footerNav.flowbase.title",
    dense: true,
    items: [
      { label: "footerNav.flowbase.items.moreCloneables", href: "#" },
      {
        label: "footerNav.flowbase.items.phone",
        href: "#",
        tooltip: "footerNav.flowbase.items.phoneTooltip",
      },
    ],
  },
];
