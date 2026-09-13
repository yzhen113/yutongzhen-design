export const site = {
  name: "Yutong Zhen",
  title: "Yutong Zhen",
  description:
    "Yutong is a visual and experience designer studying Design, Human-Computer Interaction, Physical Computing @ Carnegie Mellon University. ",
  email: "yzhen2@andrew.cmu.edu",
  resume:
    "https://drive.google.com/file/d/1SWEvkSK80eU-qulyfyO_OIq9V4M31EA0/view?usp=sharing",
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

export type Project = {
  title: string;
  tags: string;
  href?: string;
  locked?: boolean;
  media: {
    type: "video" | "image";
    src: string;
    poster?: string;
  };
};

export const projects: Project[] = [
  {
    title: "BUZZ Signal",
    tags: "Product, Interaction Design,  iOS",
    href: "/projects/bumble",
    media: {
      type: "video",
      src: "/media/buzz.mp4",
      poster: "/media/buzz-poster.jpg",
    },
  },
  {
    title: "TOM: On-the-Go Food Management",
    tags: "Product Design, User Research",
    href: "/projects/tom",
    media: {
      type: "video",
      src: "/media/tom.mp4",
      poster: "/media/tom-poster.jpg",
    },
  },
  {
    title: "Dasher: Building better delivery experiences",
    tags: "Mobile, Product Design, B2C",
    href: "/projects/dasher",
    locked: true,
    media: { type: "image", src: "/media/doordash/thumbnail.png" },
  },
  {
    title: "CMUsed: A Student-to-Student Marketplace at Carnegie Mellon University",
    tags: "Product Design, Web Design",
    href: "/projects/cmused",
    media: { type: "image", src: "/media/cmused/thumbnail.png" },
  },
  {
    title: "Turning Toward",
    tags: "Spatial Experience, Creative Tech",
    href: "/projects/turning-toward",
    media: { type: "image", src: "/media/turning-toward.png" },
  },
  {
    title: "Hybrid Exhibition: James Jean x Hunt Institute",
    tags: "Exhibition Design, Creative Tech",
    href: "/projects/hybrid-exhibition-james-jean",
    media: { type: "image", src: "/media/james-jean/cover.png" },
  },
];
