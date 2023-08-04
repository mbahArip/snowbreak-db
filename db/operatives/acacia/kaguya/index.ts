import { IOperativeDetail } from "types/database/operatives";
import base from "./base";
import deiwosAlignment from "./deiwos";
import manifests from "./manifests";
import neuronics from "./neuronics";
import outfit from "./outfit";
import skills from "./skills";

const data: IOperativeDetail = {
  key: "girl01_2",
  fullName: "Acacia",
  name: "Acacia",
  title: "Kaguya",
  weapon: "pistol",
  rarity: 5,
  images: {
    icon: "/img/operatives/icons/girl012.png",
    portrait: "/img/operatives/poses/girl012.png",
  },
  description:
    "Data from the world before I went to sleep. It will only evoke memories that don't belong to this world. I might as well just refuse it.",
  outfit: outfit,
  baseStory: base.baseStory,
  baseGift: base.baseGift,
  skills,
  neuronics,
  manifests,
  deiwosAlignment,
};

export default data;
