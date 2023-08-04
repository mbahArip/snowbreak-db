import { IOperativeDetail } from "types/database/operatives";
import base from "./base";
import deiwosAlignment from "./deiwos";
import manifests from "./manifests";
import outfit from "./outfit";
import skills from "./skills";

const data: IOperativeDetail = {
  key: "",
  fullName: "",
  name: "",
  title: "",
  weapon: "smg",
  rarity: 3,
  images: {
    icon: "",
    portrait: "",
  },
  description: "",
  outfit: outfit,
  baseStory: base.baseStory,
  baseGift: base.baseGift,
  skills,
  manifests,
  deiwosAlignment,
};

export default data;
