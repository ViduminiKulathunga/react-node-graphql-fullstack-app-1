import React, { useState, useEffect } from "react";
import { server } from "../../lib/api";
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
  const [listings, setListings] = useState<Listing[] | null>(null);

  useEffect(()=> {
    fetchListings();

    // if(listings && listings.length){
    //   console.log("Listings exist!!")
    // }

    return () => {
      console.log("Effect is cleaned up!");
    }
  },[]);

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    setListings(data.listings);
  };

  const deleteListings = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariable>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });
    fetchListings();
  };

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
