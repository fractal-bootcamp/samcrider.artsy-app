import type { UserOutputDto } from "./types";

export interface UserApi {
  createUser: (
    email: string,
  ) => Promise<any>;
  getSelf: () => Promise<any>;
  updateUser: (
   email: string,
   id: string,
  ) => Promise<any>;
}

type UserController = () => UserApi;

/**
 * User Controller
 * @returns UserController object
 */
export const userController: UserController = () => ({
  createUser: async (
    email,
  ): Promise<any> => {
    // hit db
  },
  getSelf: async (): Promise<any> => {
    // hit db
  },
  updateUser: async (
    email,
    id,
  ): Promise<any> => {
   // hit db
  },
});
