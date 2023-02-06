export default function submitReviewHandler(body) {
  let arr = [];

  if(!body.rating) arr.push('rating');
  if(!(body.summary.length > 49) || !(body.summary.length < 1000)) arr.push('summary');
  if (!body.name) arr.push('name');
  let at = body.email.indexOf('@');
  let com = body.email.indexOf('.com');
  if (at === -1 || at === 0 || com === -1 || !(com > at + 1)) arr.push('email');

  if (arr.length > 0) {
    return arr;
  }
  return true;
}