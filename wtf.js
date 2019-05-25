var axios = require("axios");

axios.get("https://api.themoviedb.org/3/movie/popular?api_key=5e6f5259879b4cb3056ce178a213916e&language=en-US&page=1")
.then(function(res) {
    var results = res.results;
    console.log(res);
});
