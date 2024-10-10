export const deleteMany = async =>{
    User.deleteMany({ condition })
  .then((result) => {
    console.log(result.deletedCount + " documents deleted");
  })
  .catch((error) => {
    console.error(error);
  });

}