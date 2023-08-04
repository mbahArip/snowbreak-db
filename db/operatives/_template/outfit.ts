import { IOperativeOutfit } from "types/database/operatives";

const data: IOperativeOutfit[] = [
  {
    name: "",
    description: "",
    default: true,
    images: {
      icon: "/img/operatives/icon/:key.png",
      portrait: "/img/operatives/portrait/:key.png",
    },
    price: 0,
    obtainMethod: "Default",
  },
];

export default data;
