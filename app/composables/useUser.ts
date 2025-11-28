// export const useUser = () =>
//   useState("user", () => ({
//     id: null,
//     name: null,
//     email: null,
//     role: null
//   }));
export const useUser = () =>
  useState<any>("user", () => null);