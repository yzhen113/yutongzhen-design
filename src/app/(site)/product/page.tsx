import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata = {
  title: "Yutong Zhen - Product",
  description:
    "Selected product design work by Yutong Zhen, including BUZZ Signal, Dasher, CMUsed, and TOM.",
};

export default function ProductPage() {
  return (
    <main>
      <ProjectGrid filter="product" />
    </main>
  );
}
