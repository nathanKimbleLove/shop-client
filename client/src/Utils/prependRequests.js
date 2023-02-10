export default function prependRequests(){
  return process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';
}