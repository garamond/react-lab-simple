const users = {
  1: { id: 1, name: "A", friendIDs: [3,4,5] },
  2: { id: 2, name: "B", friendIDs: [6,7] },
  3: { id: 3, name: "C", friendIDs: [1,2] },
  4: { id: 4, name: "D", friendIDs: [1,3,7] },
  5: { id: 5, name: "E", friendIDs: [1,3,6] },
  6: { id: 6, name: "F", friendIDs: [2,4,7] },
  7: { id: 7, name: "G", friendIDs: [3,6] },
}

export const getUser = (id) => users[id]

export const getFriends = (id) => getUser(id).friendIDs.map(getUser)
