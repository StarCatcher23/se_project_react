var pgp = require("pg-promise")(/* options */);
var db = pgp("postgres://username:password@host:port/database"); //connect to your local databasw

db.one("SELECT $1 AS value", 123) //create a query to pull desired data
  .then(function (data) {
    console.log("DATA:", data.value);
  })
  .catch(function (error) {
    console.log("ERROR:", error);
  });

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
