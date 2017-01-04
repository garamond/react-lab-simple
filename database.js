const users = {
  1: { uid: 1, name: "A", friendIDs: [3,4,5] },
  2: { uid: 2, name: "B", friendIDs: [6,7] },
  3: { uid: 3, name: "C", friendIDs: [1,2] },
  4: { uid: 4, name: "D", friendIDs: [1,3,7] },
  5: { uid: 5, name: "E", friendIDs: [1,3,6] },
  6: { uid: 6, name: "F", friendIDs: [2,4,7] },
  7: { uid: 7, name: "G", friendIDs: [3,6] },
}

export const getUser = (uid) => users[uid]

export const getFriends = (uid) => getUser(uid).friendIDs.map(getUser)
