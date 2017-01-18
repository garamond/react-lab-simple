const users = {
  1: { uid: 1, name: "Alice", friendIDs: [3,4,5], petIDs: [1,2] },
  2: { uid: 2, name: "Bob", friendIDs: [6,7], petIDs: [2] },
  3: { uid: 3, name: "Zaphod", friendIDs: [1,2], petIDs: [1] },
  4: { uid: 4, name: "Leeloo", friendIDs: [1,3,7], petIDs: [2] },
  5: { uid: 5, name: "Homer", friendIDs: [1,3,6], petIDs: [1] },
  6: { uid: 6, name: "Bart", friendIDs: [2,4,7], petIDs: [2] },
  7: { uid: 7, name: "Donald", friendIDs: [3,6], petIDs: [1] },
}

const pets = {
  1: { pid:1, name: "Scoobidoo", type: "dog", pet: true },
  2: { pid:2, name: "Cheshire", type: "cat", pet: true }
}

export const getUser = (uid) => users[uid]

export const getPets = (uid) => getUser(uid).petIDs.map(pid => pets[pid])

export const getPet = (pid) => pets[pid]

export const getUsers = () => Object.values(users)

export const getFriends = (uid) => getUser(uid).friendIDs.map(getUser)

export const getViewer = () => ({ vid: 0, name: 'Hans Muster', viewer: true })
