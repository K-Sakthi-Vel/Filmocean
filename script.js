// Fetching the search box div

const getInput=document.querySelector(".search-box");

// Api key from OMDB

var apiKey="58b535af";

// URL for fetching desired movie from database

var url="https://www.omdbapi.com/?apikey="+apiKey;

// Favorite movies array/list 

let favoriteMovies=JSON.parse(localStorage.getItem("favoriteMovies")) || [];

let currentMovie = JSON.parse(localStorage.getItem("currentMovie"));

// This function for making API calls

function showCurrentMovie(){


	if(currentMovie !== null){

		document.querySelector(".movie-details").classList.add("space");
		// Fetching the space div, where movie info will be shown
		const InfoSpace=document.querySelector(".space");

		// checking the oncoming response object whether it is success response with data or error object
		if(Object.keys(currentMovie).length > 2){
			InfoSpace.innerHTML=`
				    <div class="poster-and-movie-deltails">
					    <img class="movie-poster" src="${currentMovie.Poster}" alt="Image not available">
					    <div class="clear">
						    X
					    </div>
				        <img class="add-to-fav-button" src="like.svg">
					    <ul>
					        <li>
					            <div class="category">Movie</div>
					            <div class="category-detail"> ${currentMovie.Title}</div>
					        </li>
					        <li>
					            <div class="category">Director</div>
					            <div class="category-detail"> ${currentMovie.Director}</div>
					        </li>
					        <li>
					            <div class="category">Actors</div>
					            <div class="category-detail"> ${currentMovie.Actors}</div>
					        </li>
					        <li>
					            <div class="category">Year</div>
					            <div class="category-detail">${currentMovie.Year}</div>
					        </li>
					        <li>
					            <div class="category">Genre</div>
					            <div class="category-detail"> ${currentMovie.Genre}</div>
					        </li>
					        <li>
					            <div class="category">Rating</div>
					            <div class="category-detail"> ${currentMovie.Ratings.length===1?currentMovie.Ratings[0].Value:"No Ratings"}</div>
					        </li>
					    </ul>
				    </div>
				    <div class="movie-story">
					    <div>${currentMovie.Plot}</div>
				    <div>

				    `
		}
		else{
			// Will be filled when error message comes
			InfoSpace.innerHTML=`<div class="error-msg">Movie Not Found :( </div>`

		}
	    
    }
    else{
    	console.log("SCUNDDD")
    	document.querySelector(".movie-details").innerHTML="";
    	document.querySelector(".movie-details").classList.remove("space")
    }

}

showCurrentMovie();

function showFavoriteMovie(){

	document.querySelector(".dropdown-menu").innerHTML='';

	if(favoriteMovies.length !== 0){
 
		for(let movie of favoriteMovies){ 

			var div=document.createElement("div");

			div.innerHTML=`<div class="item">
	            	<a class="dropdown-item" style="text-decoration:capitalize; " href="#">${movie.Title}</a>
			        <img src="trash.png" class="delete-from-fav" id="${movie.Title}">
			    </div>`

		    document.querySelector(".dropdown-menu").appendChild(div);

		    document.querySelector(".dropdown").classList.add("dropdown-div-anim");

		    function removeClass() {
		    	document.querySelector(".dropdown").classList.remove("dropdown-div-anim")
		    };
		    setTimeout(removeClass,1000);

		}
	}else{

		var div=document.createElement("h6");

		div.innerHTML=`No Favorites`;

		div.classList.add("no-favs");

		document.querySelector(".dropdown-menu");

		document.querySelector(".dropdown-menu").appendChild(div);

    };
	
};

showFavoriteMovie();

function apiCall(call){

	const request=new XMLHttpRequest();

	request.open("GET",`${url}&t=${call}`);

	request.send();

	request.onload=function(){

		if(request.status===200){

			var data=JSON.parse(request.responseText);

			currentMovie = data;

			localStorage.setItem("currentMovie",JSON.stringify(data));
			
			showCurrentMovie();
			
				
		};
	};
};

function removeFromFav(movie){

	// let currentFav = JSON.parse(localStorage.getItem("favoriteMovies"));
	console.log(movie,"eeeeeeeeeee")

	let filteredNewFavMov = favoriteMovies.filter((item,i)=>item.Title !== movie)

	favoriteMovies = filteredNewFavMov

	localStorage.setItem("favoriteMovies",JSON.stringify(favoriteMovies))

	showFavoriteMovie();
}

function keyPressHandler(presses) {
	if(presses.key==="Enter"){
		var movieName=presses.target.value;
		apiCall(movieName)
    }
};

function clicksHandler(clicks){
    const target=clicks.target;
	if(target.className==="search-button"){
		var movieName=getInput.value
		apiCall(movieName)
		return;
	}


	else if(target.className==="add-to-fav-button"){
		
		document.querySelector(".dropdown-menu").innerHTML='';

		let addFav = JSON.parse(localStorage.getItem("favoriteMovies")) || []

		addFav.push(currentMovie);

		localStorage.setItem("favoriteMovies",JSON.stringify(addFav));

		favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
		
		showFavoriteMovie();
		
		
	}


	else if(target.className==="delete-from-fav"){


		removeFromFav(target.id);
		return;
	}

	else if(target.className === "clear"){
		currentMovie = null
		localStorage.setItem("currentMovie",JSON.stringify(null))
		showCurrentMovie();
	}
};


getInput.addEventListener("keyup",keyPressHandler);


document.addEventListener("click",clicksHandler);
