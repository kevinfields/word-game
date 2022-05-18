
export default async function ADD_BADGE (userRef, badge) {

  let data;
  await userRef.get().then(doc => {
    data = doc.data();
  })
  if (!data.badges.includes(badge)) {
    data.badges.push(badge);
    await userRef.set({
      ...data
    })
  }
}