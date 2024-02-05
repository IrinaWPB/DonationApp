export type UserType = {
  isLoggedIn: boolean;
  profileImage: string;
  displayName?: string;
  token?: string;
  email?: string;
};

export type CategoryType = {
  name: string;
  categoryId: number;
};

export type ItemType = {
  name: string;
  description: string;
  image: string;
  donationItemId: number;
  categoryIds: number[];
  price: string;
};
