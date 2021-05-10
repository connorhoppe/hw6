// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  // console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre
  
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Please specify year and genre!` // a string of data
    }
  }
  else {
    let returnValue = {
      numResults: 0,
      movies: []
    }

console.log(moviesFromCsv[0].startYear)
console.log(moviesFromCsv[0].genres)

    // Loop through moviesFromCsv to update returnValue
    for (let i=0; i < moviesFromCsv.length; i++) {
      
      // Check if item meets both querystring parameters
      if (moviesFromCsv[i].startYear == year && moviesFromCsv[i].genres.includes(genre)) {
        
        // Check if item has a genre
        if (moviesFromCsv[i].genre == `\\N` || moviesFromCsv[i].runtimeMinutes == `\\N`) {
          
          // Increase increment of numResults
          returnValue.numResults = returnValue.numResults + 1

          // Create "addValue" object and input relevant information
          let addValue = {
            primaryTitle: moviesFromCsv[i].primaryTitle,
            releaseYear: moviesFromCsv[i].startYear,
            genres: moviesFromCsv[i].genres
          }

          // Add "addValue" to returnValue object movies array
          returnValue.movies.push(addValue)
        }
      }
    }

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      // Set body to stringified version of return array
      body: JSON.stringify(returnValue) // a string of data
    }
  }
}