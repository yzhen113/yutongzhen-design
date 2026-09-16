import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata = {
  title: "Yutong Zhen - Experience",
  description:
    "Selected experience design work by Yutong Zhen, including Turning Toward and Hybrid Exhibition.",
};

export default function ExperiencePage() {
  return (
    <main>
      <ProjectGrid filter="experience" />
    </main>
  );
}
