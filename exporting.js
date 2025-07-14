const exported = require("./importing");  // use ./ to import your own file

exported.privateFunc();

console.log(exported.greet("Tejaswini"));  // wrap string in quotes

console.log(exported.product(15, 23));
