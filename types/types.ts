export type UserType = {
  firstName: string;
  lastName: string;
  userId: number;
  profileImage: string;
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
