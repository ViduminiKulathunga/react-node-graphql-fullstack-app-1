import React from "react";
import { server, useQuery } from "../../lib/api";
import {
  ListingsData,
  Listing,
  DeleteListingData,
  DeleteListingVariable,
} from "./types";

const LISTINGS = `{
  listings{
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      rating
  }
}`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!){
    deleteListing(id: $id){
      id
    }
}`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const { data } = useQuery<ListingsData>(LISTINGS);
  
  const deleteListings = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariable>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => deleteListings(listing.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
    </div>
  );
};
