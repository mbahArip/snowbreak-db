import { IOperativeBase } from "types/database/operatives";

const data: IOperativeBase = {
  baseStory: [
    {
      number: 1,
      name: "Form a Society!?",
      summary:
        "Caroline wanted Acacia to join a club, but Acacia found she didn't fit the requirements for any of the clubs. Therefore, she decided to start a new one herself.",
      trustLevel: 10,
    },
    {
      number: 2,
      name: "Eulogy of Youth",
      summary:
        "Acacia wanted the Adjutant to join her club, but she didn't even prepare any applications for people to sign. After the Adjutant helped her to arrange these forms, he found that he had somehow become the deputy club president...",
      trustLevel: 20,
    },
    {
      number: 3,
      name: "Disband Our Society!? Emergency!",
      summary:
        'The new club "Requiem of the End" has been around for a while, but it has yet to run any events. Faced with having to disband the club, Acacia took up the Adjutant\'s suggestion and decided to run a film-viewing event—',
      trustLevel: 30,
    },
    {
      number: 4,
      name: "Getting Ready for the Cultural Festival",
      summary:
        "The company's culture festival asked every club to host an event. Acacia decided to hold a retro exhibit of anime, manga, and games, with the exhibition items being her personal collection. Now, the Adjutant just had to worry about finding a venue for it.",
      trustLevel: 40,
    },
    {
      number: 5,
      name: "Her World",
      summary:
        "The Adjutant and Acacia worked together and finally managed to complete the exhibition the day before the culture festival. It was tough work, but the Adjutant also felt what it was like to be young. Besides, he was getting deeper and deeper into Acacia's world -",
      trustLevel: 50,
    },
  ],
  baseGift: [
    {
      name: "Simple Bookcase",
      description:
        "In an era when paper books are dying out, it may only function as a decoration.",
      images: { icon: "/img/gift/acacia/simple-bookcase.png" },
      price: 200,
      trust: 0,
    },
    {
      name: "Fujwara Retro Arcade",
      description:
        "A product celebrating Fujwara's anniversary. Only 100 units were produced worldwide. It has the same features as an ordinary arcade machine.",
      images: { icon: "/img/gift/acacia/fujwara-retro-arcade.png" },
      price: 300,
      trust: 0,
    },
    // {
    //   name: "Weapon Display Case",
    //   description:
    //     "Collecting weapons can be romantic too, so questioning its practicality would be impolite.",
    //   images: { icon: "/img/gift/acacia/weapon-display-case.png" },
    //   price: 0,
    //   trust: 0,
    // },
    {
      name: "Audio Kit",
      description: "Expert-grade antique audio equipment. Worth every penny.",
      images: { icon: "/img/gift/acacia/audio-kit.png" },
      price: 200,
      trust: 0,
    },
    {
      name: "Homebody Essentials Kit",
      description: "Fast food is every couch potato's best friend.",
      images: { icon: "/img/gift/acacia/homebody-essentials-kit.png" },
      price: 300,
      trust: 0,
    },
    {
      name: "Knife Block",
      description:
        "Combining modern materials with a traditional design, this knife block is both practical and decorative.",
      images: { icon: "/img/gift/acacia/knife-block.png" },
      price: 200,
      trust: 0,
    },
    {
      name: "Vintage Home Theater",
      description:
        "While a rarity today, this combination of broad and heavy household appliances once symbolized a family's wealth.",
      images: { icon: "/img/gift/acacia/vintage-home-theater.png" },
      price: 300,
      trust: 0,
    },
    {
      name: "Game Poster",
      description:
        "A Fujwara membership poster signifying distinguished and advanced players.",
      images: { icon: "/img/gift/acacia/game-poster.png" },
      price: 100,
      trust: 0,
    },
    {
      name: "Sword Expo Ticket Set",
      description:
        "Used to check out a sword exhibition. Melee weapon lovers can't miss this.",
      images: { icon: "/img/gift/acacia/sword-expo-ticket-set.png" },
      price: 100,
      trust: 0,
    },
    {
      name: '"Ye Gan" Mask',
      description:
        "Once a Fujwara e-sports competition prize, it is no longer in production.",
      images: { icon: "/img/gift/acacia/ye-gan-mask.png" },
      price: 100,
      trust: 0,
    },
  ],
};

export default data;
