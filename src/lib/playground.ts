export type PlaygroundItem = {
  title?: string;
  caption?: string;
  alt: string;
  media: {
    type: "image" | "video";
    src: string;
    width: number;
    height: number;
  };
};

export const playgroundColumns: PlaygroundItem[][] = [
  [
    {
      title: "Map of Moving",
      alt: "Open sketchbook with colorful threads stretched across the pages",
      media: {
        type: "image",
        src: "/media/playground/map-of-moving.jpg",
        width: 2048,
        height: 1365,
      },
    },
    {
      title: "Sky Animation",
      caption: "Blender",
      alt: "Time-lapse animation of clouds in a blue sky",
      media: {
        type: "video",
        src: "/media/playground/sky-animation.mp4",
        width: 1920,
        height: 1080,
      },
    },
    {
      alt: "Pencil sketches of stacked sculptural forms",
      media: {
        type: "image",
        src: "/media/playground/sketches-forms.jpg",
        width: 2048,
        height: 1475,
      },
    },
    {
      title: "Crochet Hobo Bag",
      caption: "crochet with size 4 medium yarn",
      alt: "Person wearing a striped crochet hobo bag in a forest",
      media: {
        type: "image",
        src: "/media/playground/crochet-hobo-bag.jpg",
        width: 1365,
        height: 2048,
      },
    },
    {
      title: "Oil on Wood",
      alt: "Surreal oil painting of figures, houses, and butterflies",
      media: {
        type: "image",
        src: "/media/playground/oil-on-wood.jpg",
        width: 2048,
        height: 1404,
      },
    },
    {
      title: "Pudding",
      caption: "modeled and rendered in blender",
      alt: "3D render of a pudding dessert",
      media: {
        type: "image",
        src: "/media/playground/pudding.png",
        width: 1920,
        height: 1080,
      },
    },
  ],
  [
    {
      title: "Typography Design",
      caption: "Adobe After Effects",
      alt: "Pixel typography animation",
      media: {
        type: "video",
        src: "/media/playground/typography.mp4",
        width: 1920,
        height: 1080,
      },
    },
    {
      alt: "Sketches of a windmill-like structure and lily pad forms",
      media: {
        type: "image",
        src: "/media/playground/sketches-windmill.jpg",
        width: 2048,
        height: 1363,
      },
    },
    {
      title: "Educational Play Experience",
      caption:
        "Designed in collaboration with the Margret Morrison Children’s School",
      alt: "Children working on a tabletop play experience with a notebook and green pieces",
      media: {
        type: "image",
        src: "/media/playground/educational-play.png",
        width: 1800,
        height: 1286,
      },
    },
    {
      title: "Sunset Receipt Printer interior",
      alt: "Interior of a wooden electronics box with an Arduino and wiring",
      media: {
        type: "image",
        src: "/media/playground/sunset-receipt-interior.jpg",
        width: 2048,
        height: 1365,
      },
    },
    {
      title: "Jellyfish",
      caption: "Modeled and rendered in Blender",
      alt: "3D render of translucent jellyfish forms",
      media: {
        type: "image",
        src: "/media/playground/jellyfish.png",
        width: 1080,
        height: 1500,
      },
    },
    {
      title: "Shadyside",
      caption: "Mixed media painting",
      alt: "Mixed media painting of a cafe street scene in Shadyside",
      media: {
        type: "image",
        src: "/media/playground/shadyside.png",
        width: 1800,
        height: 1070,
      },
    },
  ],
  [
    {
      title: "Flower",
      caption: "Modeled and rendered in Blender",
      alt: "3D render of crystalline flower forms",
      media: {
        type: "image",
        src: "/media/playground/flower.png",
        width: 1200,
        height: 1600,
      },
    },
    {
      alt: "Sketches of hands holding a phone-like device with notes",
      media: {
        type: "image",
        src: "/media/playground/sketches-device.jpg",
        width: 2048,
        height: 1328,
      },
    },
    {
      title: "Sunset Receipt Printer",
      caption: "Arduino Uno, LED, Laser Cutting",
      alt: "Laser-cut wooden box printing a receipt with a glowing base",
      media: {
        type: "image",
        src: "/media/playground/sunset-receipt-printer.jpg",
        width: 2048,
        height: 1325,
      },
    },
    {
      title: "Reveilar",
      caption: "Blender",
      alt: "Blender animation of a cloud-like form",
      media: {
        type: "video",
        src: "/media/playground/reveilar.mp4",
        width: 1920,
        height: 1080,
      },
    },
    {
      title: "Mindful Hearing Device",
      caption: "Cardboard prototype",
      alt: "Cardboard prototype of a mindful hearing device worn over the ears",
      media: {
        type: "image",
        src: "/media/playground/mindful-hearing.jpg",
        width: 2048,
        height: 1365,
      },
    },
    {
      title: "Mixed Media Installation",
      alt: "Hanging mixed-media sculpture with translucent forms, drawing, and wood",
      media: {
        type: "image",
        src: "/media/playground/mixed-media-installation.jpg",
        width: 1440,
        height: 1800,
      },
    },
  ],
];
