export const site = {
  name: "Yutong Zhen",
  title: "Yutong Zhen",
  description:
    "Yutong is a visual and experience designer studying Design, Human-Computer Interaction, Physical Computing @ Carnegie Mellon University. ",
  email: "yzhen2@andrew.cmu.edu",
  resume:
    "https://drive.google.com/file/d/1ucO8GMIKP4RDT9NRAOfxRfugVELq3msC/view?usp=sharing",
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
  category: ProjectCategory;
  media: {
    type: "video" | "image";
    src: string;
    poster?: string;
    scale?: number;
  };
};

export const projects: Project[] = [
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
    title: "Dasher: Building better delivery experiences",
    tags: "Mobile, Product, Shipped",
    href: "/projects/dasher",
    category: "product",
    locked: true,
    media: { type: "image", src: "/media/doordash/thumbnail.png" },
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
    title: "Hybrid Exhibition: James Jean x Hunt Institute",
    tags: "Exhibition Design, XR",
    href: "/projects/hybrid-exhibition-james-jean",
    category: "experience",
    media: { type: "image", src: "/media/james-jean/cover.png" },
  },
];
