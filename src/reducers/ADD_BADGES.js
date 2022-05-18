export default async function ADD_BADGES(userRef, ...badges) {

  console.log('badges: ' + badges)

  let data;
  await userRef.get().then(doc => {
    data = doc.data();
  })

  let badgeList = [];

  for (const badge of badges) {
    if (!data.badges.includes(badge)) {
      badgeList.push(badge);
    }   
  }
  await userRef.set({
    ...data,
    badges: data.badges.concat(badgeList),
  })
}