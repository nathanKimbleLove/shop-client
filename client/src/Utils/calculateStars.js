export default function calculateStars(ratings) {
  //takes in ratings object

 let keys = Object.keys(ratings);
 let total = 0;
 let sum = 0;

 for (let i = 0; i < keys.length; i++) {
   let num = parseInt(ratings[keys[i]])
   total += num;
   sum += keys[i] * num;
 }
 let returnVal = Math.round(10 * sum/total) / 10;
 return returnVal;

  //spits out average score to the nearest half
}