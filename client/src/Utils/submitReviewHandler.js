export default function submitReviewHandler(body) {
  let arr = [];

  if(!body.rating) arr.push('#rating');
  if(!(body.body.length > 49) || !(body.body.length < 1000)) arr.push('#body');
  if(!(body.summary.length > 0) || !(body.summary.length < 61)) arr.push('#summary');
  if (!body.name) arr.push('#name');
  let at = body.email.indexOf('@');
  let com = body.email.indexOf('.com');
  if (at === -1 || at === 0 || com === -1 || !(com > at + 1) || body.email.indexOf(' ') !== -1) arr.push('#email');

  if (arr.length > 0) {
    return arr;
  }
  return true;
}