const users = {
  1: { uid: 1, name: "Alice", friendIDs: [3,4,5] },
  2: { uid: 2, name: "Bob", friendIDs: [6,7] },
  3: { uid: 3, name: "Zaphod", friendIDs: [1,2] },
  4: { uid: 4, name: "Leeloo", friendIDs: [1,3,7] },
  5: { uid: 5, name: "Homer", friendIDs: [1,3,6] },
  6: { uid: 6, name: "Bart", friendIDs: [2,4,7] },
  7: { uid: 7, name: "Donald", friendIDs: [3,6] },
}

export const getUser = (uid) => users[uid]

export const getUsers = () => Object.values(users)

export const getFriends = (uid) => getUser(uid).friendIDs.map(getUser)
