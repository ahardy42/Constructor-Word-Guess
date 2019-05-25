var axios = require("axios");

var Movies = function() {
    this.movieSearch = function() {
        var moviesList = [];
        var url = "https://api.themoviedb.org/3/movie/popular?api_key=5e6f5259879b4cb3056ce178a213916e&language=en-US&page=1"
        axios.get(url)
        .then(function(response) {
            var results = response.data.results;
            // console.log(results[0]);
            results.forEach(function(result){
                var movieObj = {title: result.title, overview: result.overview};
                // this.moviesList.push(movieObj);
                // console.log(movieObj);
            });
            return moviesList;
        }).catch(function(err) {
            console.log(err);
        });
    };
};

module.exports = Movies;