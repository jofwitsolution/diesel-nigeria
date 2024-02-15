import { UserRole } from "@prisma/client";
const emailVerified = new Date();

export const sellers = [
  {
    name: "Amazon Diesel",
    email: "jofwitsolution@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Amazon Incorporation",
    rcNumber: "077234",
    address: "House 21 Balogun street, Ikoyi",
    phoneNumber: "08034672389",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "eBay Petrol",
    email: "ebay@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "eBay Incorporation",
    rcNumber: "091234",
    address: "House 34 Allen Avenue, Ikeja",
    phoneNumber: "08123456789",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "Walmart Gasoline",
    email: "walmart@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Walmart Inc.",
    rcNumber: "057812",
    address: "123 Main Street, Anytown",
    phoneNumber: "07098765432",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "Target Oil",
    email: "target@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Target Corporation",
    rcNumber: "034512",
    address: "456 Oak Street, Somewhere",
    phoneNumber: "09011223344",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "Best Buy Energy",
    email: "bestbuy@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Best Buy Co., Inc.",
    rcNumber: "045623",
    address: "789 Maple Avenue, Anywhere",
    phoneNumber: "08099887766",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "Tesla Power",
    email: "tesla@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Tesla, Inc.",
    rcNumber: "031232",
    address: "321 Elm Street, Everywhere",
    phoneNumber: "07011223344",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "Google Gas",
    email: "google@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Google LLC",
    rcNumber: "022312",
    address: "567 Pine Street, Nowhere",
    phoneNumber: "09022334455",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "Microsoft Petroleum",
    email: "microsoft@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Microsoft Corporation",
    rcNumber: "039988",
    address: "901 Cedar Street, Elsewhere",
    phoneNumber: "08133445566",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "Apple Fuel",
    email: "apple@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Apple Inc.",
    rcNumber: "012345",
    address: "234 Oak Street, Nowhere",
    phoneNumber: "08044556677",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "Facebook Energy",
    email: "facebook@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Facebook, Inc.",
    rcNumber: "099877",
    address: "345 Maple Street, Everywhere",
    phoneNumber: "09055667788",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "Twitter Oil",
    email: "twitter@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Twitter, Inc.",
    rcNumber: "011223",
    address: "456 Pine Street, Anytown",
    phoneNumber: "07066778899",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "Instagram Gasoline",
    email: "instagram@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Instagram, Inc.",
    rcNumber: "065533",
    address: "567 Cedar Street, Somewhere",
    phoneNumber: "08077889900",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "LinkedIn Energy",
    email: "linkedin@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "LinkedIn Corporation",
    rcNumber: "098765",
    address: "678 Elm Street, Anytown",
    phoneNumber: "09088990011",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "Snapchat Petroleum",
    email: "snapchat@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Snap Inc.",
    rcNumber: "034567",
    address: "789 Pine Street, Somewhere",
    phoneNumber: "07099001122",
    role: UserRole.seller,
    emailVerified,
  },
  {
    name: "Reddit Fuel",
    email: "reddit@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Reddit, Inc.",
    rcNumber: "012378",
    address: "890 Cedar Street, Anywhere",
    phoneNumber: "08001112233",
    role: UserRole.seller,
    emailVerified,
  },
];

export const users = [
  {
    name: "Jong Doe",
    email: "alagbarason@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Admin",
    address: "House 21 Balogun street, Ikoyi",
    phoneNumber: "08034672072",
    role: UserRole.admin,
    emailVerified,
  },
  {
    name: "Bolt Services",
    email: "bolt@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Bolt, Inc.",
    rcNumber: "012312",
    address: "890 Cedar Street, Anywhere",
    phoneNumber: "08201112233",
    role: UserRole.buyer,
    emailVerified,
  },
  {
    name: "Zec Services",
    email: "zec@gmail.com",
    password: "$2a$10$.HA5mYNAyGkNQQI0iCmM0OdJyTfstxV9OhlDlPcZgy9PlCAASuK96",
    businessName: "Zec, Inc.",
    rcNumber: "012009",
    address: "890 Cedar Street, Anywhere",
    phoneNumber: "08201112000",
    role: UserRole.buyer,
    emailVerified,
  },
];