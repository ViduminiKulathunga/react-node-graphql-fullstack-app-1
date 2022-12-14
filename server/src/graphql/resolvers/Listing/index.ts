import { ObjectId } from 'mongodb';
import { IResolvers } from '@graphql-tools/utils';
import { Database, Listing } from '../../../lib/types';

export const listingResolver: IResolvers = {
  Query: {
    listings: async (
      _root: undefined, 
      _args: {}, 
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      //throw new Error("Error!");
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined, 
      { id }: { id: string }, 
      { db }: { db: Database }
    ) => {
      //throw new Error("Failed to delete Listing");
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deleteRes.value) {
        throw new Error('Failed to delete listing');
      }
      return deleteRes.value;
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
};
