const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERR_CODE = 500;

const DEV_SECRET = 'f2578d238f6921375e31bb5fc4fba54f0eebca8d74e275b11c770c8f9ed268a0';

const ALLOWED_CORS = [
  'localhost:3000',
  'http://weeks6.nomoredomains.monster',
  'https://weeks6.nomoredomains.monster',
];

module.exports = {
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERR_CODE,
  DEV_SECRET,
  ALLOWED_CORS,
};
