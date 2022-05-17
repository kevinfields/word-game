export default async function ADD_COMPLETED (userRef) {

  let data;
  await userRef.get().then(doc => {
    data = doc.data();
  });
  data.completed++;
  userRef.set({
    ...data
  })
  return data.completed;
}