import {getUniqueID} from "@utils";

export enum OfferType {
  OFFER = `offer`,
  SALE = `sale`
}

export type Offer = {
  id: string;
  type: OfferType;
  title: string;
  picture: string;
  description: string;
  sum: number;
  category: string[];
}

export const makeOffer = (offerData: Omit<Offer, 'id'>): Offer => ({
  id: getUniqueID(`Offer`),
  ...offerData
});

export const offer = {
  make: makeOffer
};
