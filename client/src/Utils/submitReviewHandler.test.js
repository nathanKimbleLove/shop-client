import submitReviewHandler from './submitReviewHandler.js';

let body = {rating: null, body: '', summary: '', name: '', email: ''}

it ('returns all props back if all are empty/null', () => {
  expect(submitReviewHandler(body)).toEqual(['#rating', '#body', '#summary', '#name', '#email'])
})


it ('returns all but rating if rating is defined', () => {
  body.rating = 1;
  expect(submitReviewHandler(body)).toEqual(['#body', '#summary', '#name', '#email'])
})

it ('returns body if body.length is less than 50', () => {
  body.body = '1234567891113151719212325272931333537394143454749';
  expect(submitReviewHandler(body)).toEqual(['#body', '#summary', '#name', '#email'])
})

it ('returns body if body.length is greater than 1000', () => {
  body.body = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Na';
  expect(submitReviewHandler(body)).toEqual(['#body', '#summary', '#name', '#email'])
})

it ('returns all but body if body.length is between 50 and 1000', () => {
  body.body = '123456789111315171921232527293133353739414345474951';
  expect(submitReviewHandler(body)).toEqual(['#summary', '#name', '#email'])
})

it ('returns summary if summary.length is greater than 60', () => {
  body.summary = '1234567891113151719212325272931333537394143454749515355575961';
  expect(submitReviewHandler(body)).toEqual(['#summary', '#name', '#email'])
})

it ('returns all but summary if sumary.length is between 0 and 60', () => {
  body.summary = '123456789111315171921232527293133353739414345474951';
  expect(submitReviewHandler(body)).toEqual(['#name', '#email'])
})

it ('returns all but name if name.length is more than 0', () => {
  body.name = '1';
  expect(submitReviewHandler(body)).toEqual(['#email'])
})

it ('returns email if it doesnt have an @ symbol', () => {
  body.email = 'a.asdf';
  expect(submitReviewHandler(body)).toEqual(['#email'])
})

it ('returns email if it doesnt have a .suffix', () => {
  body.email = 'a@a';
  expect(submitReviewHandler(body)).toEqual(['#email'])
})

it ('returns email if there is no text btw the @ and .sufix', () => {
  body.email = 'a@.suffix';
  expect(submitReviewHandler(body)).toEqual(['#email'])
})

it ('returns email if it has a space', () => {
  body.email = 'a @a.net';
  expect(submitReviewHandler(body)).toEqual(['#email'])
})

it ('returns email if it starts with an @', () => {
  body.email = '@a.gov';
  expect(submitReviewHandler(body)).toEqual(['#email'])
})

it('returns email if . finishes the str', () => {
  body.email = 'asdf@asdf.'
  expect(submitReviewHandler(body)).toEqual(['#email'])
})

it('returns true if all criteria are met', () => {
  body.email = 'asdf@asdf.asdf'
  expect(submitReviewHandler(body)).toEqual(true)
})