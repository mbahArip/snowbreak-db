import { IOperativeDetail } from "types/database/operatives";
import base from "./base";
import deiwosAlignment from "./deiwos";
import manifests from "./manifests";
import neuronics from "./neuronics";
import outfit from "./outfit";
import skills from "./skills";

const data: IOperativeDetail = {
  key: "girl01_1",
  fullName: "Acacia",
  name: "Acacia",
  title: "[Redacted]",
  weapon: "pistol",
  rarity: 4,
  images: {
    icon: "/img/operatives/icons/girl011.png",
    portrait: "/img/operatives/poses/girl011.png",
  },
  description:
    "Awoken from thirty years in cryostasis, her past deeply ambiguous, little to no reliable information is available about her background. \nHer excellent combat abilities would seem to imply special forces experience.",
  outfit: outfit,
  baseStory: base.baseStory,
  baseGift: base.baseGift,
  skills,
  neuronics,
  manifests,
  deiwosAlignment,
};

export default data;
