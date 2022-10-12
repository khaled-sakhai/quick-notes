export const baseUrl =
  "https://cors-everywhere-me.herokuapp.com/http://quicknotes-env.eba-eipmtg4c.us-east-2.elasticbeanstalk.com/";

// the server is : http://quicknotes-env.eba-eipmtg4c.us-east-2.elasticbeanstalk.com/ im using and
// it doesnt behave correctly because its only http and the front end is hosted in a https,
//so as a quick fix i'm using this trick to solve it
// (adding https://cors-everywhere-me.herokuapp.com before the original url to get an https link)
