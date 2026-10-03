export const site = {
  name: "Yutong Zhen",
  title: "Yutong Zhen",
  description:
    "Yutong is a visual and experience designer studying Design, Human-Computer Interaction, Physical Computing @ Carnegie Mellon University. ",
  email: "yzhen2@andrew.cmu.edu",
  resume: "/Yutong-Zhen-Resume.pdf",
  linkedin: "https://www.linkedin.com/in/yutongzhen",
  medium: "https://medium.com/@zhenyutongg",
  x: "https://x.com/zhenyutong",
  links: {
    design:
      "https://design.cmu.edu/about-our-programs/undergraduate-degrees/environments",
    hci: "https://hcii.cmu.edu/",
    physicalComputing:
      "https://ideate.cmu.edu/undergraduate-programs/physical-computing/index.html",
    doordash: "https://doordash.com",
  },
};

export type ProjectCategory = "product" | "experience";

export type Project = {
  title: string;
  tags: string;
  href?: string;
  locked?: boolean;
  /** Shown in the local preview only. Omitted from the production site. */
  previewOnly?: boolean;
  category: ProjectCategory;
  media: {
    type: "video" | "image";
    src: string;
    poster?: string;
    scale?: number;
  };
};

const allProjects: Project[] = [
  {
    title: "Dasher: Building better delivery experiences",
    tags: "Mobile, Product, Shipped",
    href: "/projects/dasher",
    category: "product",
    media: { type: "image", src: "/media/dasher/hero.png" },
  },
  {
    title: "BUZZ Signal",
    tags: "Product, Interaction Design,  iOS",
    href: "/projects/bumble",
    category: "product",
    media: {
      type: "video",
      src: "/media/buzz.mp4",
      poster: "/media/buzz-poster.jpg",
    },
  },
  {
    title: "CMU Out Loud",
    tags: "Experience Design, Public Installation, Visual Identity",
    category: "experience",
    previewOnly: true,
    media: { type: "image", src: "/media/cmu-out-loud/thumbnail.jpg" },
  },
  {
    title: "Turning Toward",
    tags: "Spatial Experience, Creative Tech",
    href: "/projects/turning-toward",
    category: "experience",
    media: { type: "image", src: "/media/turning-toward.png" },
  },
  {
    title: "CMUsed: A Student-to-Student Marketplace at Carnegie Mellon University",
    tags: "Product Design, Web",
    href: "/projects/cmused",
    category: "product",
    media: { type: "image", src: "/media/cmused/project-thumbnail.png" },
  },
  {
    title: "TOM: On-the-Go Food Management",
    tags: "Product Design, User Research",
    href: "/projects/tom",
    category: "product",
    media: { type: "image", src: "/media/tom/thumbnail.png" },
  },
  {
    title: "Crimson: From payouts to everyday banking",
    tags: "Product, Fintech, Shipped",
    href: "/projects/crimson",
    category: "product",
    locked: true,
    previewOnly: true,
    media: { type: "image", src: "/media/crimson/cover2.png" },
  },
  {
    title: "Hybrid Exhibition: James Jean x Hunt Institute",
    tags: "Exhibition Design, XR",
    href: "/projects/hybrid-exhibition-james-jean",
    category: "experience",
    media: { type: "image", src: "/media/james-jean/cover.png" },
  },
];

export const projects = allProjects.filter(
  (project) => process.env.NODE_ENV === "development" || !project.previewOnly,
);
