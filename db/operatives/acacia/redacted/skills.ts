import { IOperativeSkill } from "types/database/operatives";

const data: IOperativeSkill[] = [
  {
    category: "standard",
    type: "damage",
    name: "Spokes of the Wheel",
    description:
      "Acacia throws a dagger at the target dealing <span data-important>Chaos DMG</span>. After hit, the dagger ricochets towards other surrounding targets or back towards the original target. DMG of the dagger dealth decreases by 10% each time it hits, to the lowest of 30% DMG.",
    rawDescription:
      "Acacia throws a dagger at the target dealing Chaos DMG. After hit, the dagger ricochets towards other surrounding targets or back towards the original target. DMG of the dagger dealth decreases by 10% each time it hits, to the lowest of 30% DMG.",
    icon: "/img/operatives/011/skills/standard.png",
    neuralUpgrade: [
      {
        name: "Cluster 1",
        description:
          "Reduces the cooldown of Spokes of the Wheel by <span data-important>1</span>s.",
        rawDescription: "Reduces the cooldown of Spokes of the Wheel by 1s.",
        icon: "/img/operatives/011/neuronics/c1.png",
      },
      {
        name: "Cluster 2",
        description:
          "When Acacia or other operatives dealt control effect to enemy target, Acacia recovers <span data-important>1</span> S-Energy.",
        rawDescription:
          "When Acacia or other operatives dealt control effect to enemy target, Acacia recovers 1 S-Energy.",
        icon: "/img/operatives/011/neuronics/c2.png",
      },
    ],
    cooldown: 4,
    sEnergyCost: 4,
    uEnergyCost: 0,
    charge: 3,
    effects: [
      "Dagger Ricochet DMG: <span data-important>25%</span> of ATK +<span data-important>50</span>",
      "Hits per Target: <span data-important>3</span>",
      "Total Hits: <span data-important>6</span>",
    ],
    rawEffects: [
      "Dagger Ricochet DMG: 25% of ATK +50",
      "Hits per Target: 3",
      "Total Hits: 6",
    ],
  },
  {
    category: "support",
    type: "control",
    name: "Out of the Flow",
    description:
      "Acacia throws a small dagger, dealing <span data-important>Chaos DMG</span> and slows the target for 5s.",
    rawDescription:
      "Acacia throws a small dagger, dealing Chaos DMG and slows the target for 5s.",
    icon: "/img/operatives/011/skills/support.png",
    neuralUpgrade: [
      {
        name: "Cluster 3",
        description:
          "Out of the flow will deal DMG and Slow targets in the area.",
        rawDescription:
          "Out of the flow will deal DMG and Slow targets in the area.",
        icon: "/img/operatives/011/neuronics/c3.png",
      },
      {
        name: "Cluster 4",
        description:
          "Out of the flow deals additional <span data-important>Chaos DMG</span> equal to <span data-important>50%</span> of Acacia's ATK to hit targets.",
        rawDescription:
          "Out of the flow deals additional Chaos DMG equal to 50% of Acacia's ATK to hit targets.",
        icon: "/img/operatives/011/neuronics/c4.png",
      },
    ],
    cooldown: 25,
    sEnergyCost: 25,
    uEnergyCost: 0,
    effects: [
      "Small Dagger DMG: <span data-important>108%</span> of ATK +<span data-important>15</span>",
    ],
    rawEffects: ["Small Dagger DMG: 108% of ATK +15"],
  },
  {
    category: "ultimate",
    type: "control",
    name: "Moonlit Sky",
    description:
      "Acacia creates a Nightmare Zone domain around herself: All enemies and projectiles inside the zone will be Slowed.",
    rawDescription:
      "Acacia creates a Nightmare Zone domain around herself: All enemies and projectiles inside the zone will be Slowed.",
    icon: "/img/operatives/011/skills/ultimate.png",
    neuralUpgrade: [
      {
        name: "Cluster 5",
        description:
          "When within range of Nightmare Zone, Spokes of the Wheel has no cooldown.",
        rawDescription:
          "When within range of Nightmare Zone, Spokes of the Wheel has no cooldown.",
        icon: "/img/operatives/011/neuronics/c5.png",
      },
      {
        name: "Cluster 6",
        description:
          "When within the range of Nightmare Zone, increases all operatives' ATK by <span data-important>10%</span>.",
        rawDescription:
          "When within the range of Nightmare Zone, increases all operatives' ATK by 10%.",
        icon: "/img/operatives/011/neuronics/c6.png",
      },
    ],
    cooldown: 100,
    sEnergyCost: 0,
    uEnergyCost: 100,
    effects: ["Duration of Nightmare Zone: <span data-important>10</span>s"],
    rawEffects: ["Duration of Nightmare Zone: 10s"],
  },
];

export default data;
