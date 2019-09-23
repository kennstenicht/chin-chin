export default function() {
  this.get('/scenes');
  this.get('/scenes/:id');
  this.get('/drinks');
  this.get('/drinks/:id');

  this.passthrough('/assets/**');
}
