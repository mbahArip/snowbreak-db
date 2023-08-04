import { IOperativeBase } from "types/database/operatives";

const data: IOperativeBase = {
  baseStory: [
    {
      number: 1,
      name: "",
      summary: "",
      trustLevel: 10,
    },
  ],
  baseGift: [
    {
      name: "",
      description: "",
      images: { icon: "/img/gift/:name/:gift.png" },
      price: 0,
      trust: 0,
    },
  ],
};

export default data;
