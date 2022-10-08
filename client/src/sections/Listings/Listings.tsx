import React from "react";
import { useQuery, useMutation } from "../../lib/api";
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
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListings,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariable>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListings({ id });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => handleDeleteListing(listing.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Uh oh! something went wrong - Please tr again later :(</h2>;
  }

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Delete in Progress</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>Uh oh! Something went wrong with deleteing :(</h4>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
