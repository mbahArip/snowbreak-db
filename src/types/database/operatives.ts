import {
  EnumCharacterSkillCategory,
  EnumCharacterSkillType,
  EnumRarity,
  EnumWeaponType,
} from "./enum";

export interface IOperatives {
  key: string;
  isReleased?: boolean;
  fullName: string;
  name: string;
  title: string;
  weapon: EnumWeaponType;
  rarity: EnumRarity;
  description: string;
  images: {
    icon: string;
    portrait: string;
  };
}

export interface IOperativeDetail {
  key: string;
  isReleased?: boolean;
  fullName: string;
  name: string;
  title: string;
  weapon: EnumWeaponType;
  rarity: EnumRarity;
  description: string;
  images: {
    icon: string;
    portrait: string;
  };
  outfit: IOperativeOutfit[];
  baseStory?: IOperativeBaseStory[];
  baseGift?: IOperativeBaseGift[];
  skills: IOperativeSkill[];
  manifests: IOperativeManifest[];
  deiwosAlignment: IOperativeDeiwosAlignment[];
}

export interface IOperativeOutfit {
  key: string;
  name: string;
  description: string;
  default: boolean;
  images: {
    icon: string;
    portrait: string;
  };
  price: number;
  obtainMethod: string;
  isReleased?: boolean;
}
export interface IOperativeBase {
  baseStory: IOperativeBaseStory[];
  baseGift: IOperativeBaseGift[];
}
export interface IOperativeBaseGift {
  key: string;
  name: string;
  description: string;
  images: {
    icon: string;
  };
  rarity?: EnumRarity; // Need to assign this manually
  price?: number;
  trust?: number;
}
export interface IOperativeBaseStory {
  number: number;
  name: string;
  summary: string;
  trustLevel: number;
}
export interface IOperativeSkill {
  key: string;
  category: EnumCharacterSkillCategory;
  type?: EnumCharacterSkillType;
  name: string;
  description: string;
  rawDescription?: string;
  images: {
    icon: string;
  };
  charge?: number;
  neuralUpgrade?: {
    name: string;
    icon?: string;
    description: string;
    rawDescription?: string;
  }[];
  cooldown: number;
  sEnergyCost: number;
  uEnergyCost: number;
  effects?: string[];
  rawEffects?: string[];
}
export interface IOperativeManifest {
  name: string;
  icon: string;
  description: string;
  extractNeeded: number;
}
export interface IOperativeDeiwosAlignment {
  tier: number;
  name: string;
  icon: string;
  description: string;
}
