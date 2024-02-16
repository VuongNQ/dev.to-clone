import { PlanType } from "@swift/types/planPricing";
import { IDataFQASnippet } from "@swift/types/snippetSEO";
import { generateRandomInteger } from "@swift/utils/funcNumber";

export const ACCEPT_PLANS_RICH_SNIPPET = [
  PlanType.premium,
  PlanType.premium_plus,
  PlanType.expert_care,
];
export const ACCEPT_PLANS_FQA = [
  PlanType.basic,
  PlanType.premium,
  PlanType.premium_plus,
  PlanType.expert_care,
];

export const NUMBER_FQA_PLAN = {
  [PlanType.free]: 0,
  [PlanType.swift_experts]: 0,
  [PlanType.basic]: 5,
  [PlanType.premium]: 10,
  [PlanType.premium_plus]: 30,
  [PlanType.expert_care]: 30,
};

export const INIT_FQA: IDataFQASnippet = {
  id: generateRandomInteger(1000),
  answer: "",
  question: "",
};

export const TABS_SETTING_SNIPPET = {
  store_profile: {
    key: "store_profile",
    title: "smartSEO.snippet.tabs.0",
  },
  rich_snippets: {
    key: "rich_snippets",
    title: "smartSEO.snippet.tabs.1",
  },
  collection: {
    key: "collection",
    title: "smartSEO.snippet.tabs.2",
  },
  faq: {
    key: "faq",
    title: "smartSEO.snippet.tabs.3",
  },
};

export const OPTION_APP_REVIEW = [
  {
    label: "Auto Detect",
    value: "auto",
  },
  {
    label: "Kudobuzz",
    value: "kudobuzz",
  },
  {
    label: "ALi Reviews",
    value: "alireviews",
  },
  {
    label: "Okendo.io",
    value: "okendo",
  },
  {
    label: "Opinew",
    value: "opinew",
  },
  {
    label: "Judge.me",
    value: "judge.me",
  },
  {
    label: "Review.io",
    value: "reviews.io",
  },
  {
    label: "Loox",
    value: "loox",
  },
  {
    label: "Ryviu",
    value: "ryviu",
  },
  {
    label: "Yotpo",
    value: "yotpo",
  },
  {
    label: "Shopify Product Reviews",
    value: "spr",
  },
  {
    label: "Rivo",
    value: "rivo",
  },
  {
    label: "Rivyo",
    value: "rivyo",
  },
  {
    label: "Stamped.io",
    value: "stamped",
  },
  {
    label: "Dadao",
    value: "dadao",
  },
];

export const OPTION_INDUSTRY = [
  {
    label: "Select industry",
    value: "",
  },
  {
    label: "Bike Store",
    value: "BikeStore ",
  },
  {
    label: "Book Store",
    value: "BookStore",
  },
  {
    label: "Clothing Store",
    value: "ClothingStore",
  },
  {
    label: "Computer Store",
    value: "ComputerStore",
  },
  {
    label: "Convenience Store",
    value: "ConvenienceStore",
  },
  {
    label: "Department Store",
    value: "DepartmentStore",
  },
  {
    label: "Electronics Store",
    value: "ElectronicsStore",
  },
  {
    label: "Florist",
    value: "Florist",
  },
  {
    label: "Furniture Store",
    value: "FurnitureStore",
  },
  {
    label: "GardenStore",
    value: "GardenStore",
  },
  {
    label: "Grocery Store",
    value: "GardenStore",
  },
  {
    label: "Hardware Store",
    value: "HardwareStore",
  },
  {
    label: "Hobby Shop",
    value: "HobbyShop",
  },
  {
    label: "Home Goods Store",
    value: "HomeGoodsStore",
  },
  {
    label: "Jewelry Store",
    value: "JewelryStore",
  },
  {
    label: "Liquor Store",
    value: "LiquorStore",
  },
  {
    label: "Mens Clothing Store",
    value: "MensClothingStore",
  },
  {
    label: "Mobile Phone Store",
    value: "MobilePhoneStore",
  },
  {
    label: "Movie Rental Store",
    value: "MovieRentalStore",
  },
  {
    label: "Music Store",
    value: "MusicStore",
  },
  {
    label: "Office Equipment Store",
    value: "OfficeEquipmentStore",
  },
  {
    label: "Outlet Store",
    value: "OutletStore",
  },
  {
    label: "Pawn Shop",
    value: "PawnShop",
  },
  {
    label: "Pet Store",
    value: "PetStore",
  },
  {
    label: "Shoe Store",
    value: "ShoeStore",
  },
  {
    label: "Sporting Goods Store",
    value: "SportingGoodsStore",
  },
  {
    label: "Tire Shop",
    value: "TireShop",
  },
  {
    label: "Toy Store",
    value: "ToyStore",
  },
  {
    label: "Wholesale Store",
    value: "WholesaleStore",
  },
];
