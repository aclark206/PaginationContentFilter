/* This program dynamically divides the list of students on the html 
   page into 10 subsets and allows the user to page through each
   section using numbered buttons at the bottom of the page. As the user pressed different page numbers, the corresponding subset of students is displayed.  
   
   When the page opens, the first 10 students are shown.  
   If Javascript is disabled, all students will be shown.  
   
    
*/


/* * * * * * * * * * * * * * *    Functions      * * * * * * * * * * * * */

/* * * * *    paginate (List, pageNum)        * * * * 
  Divides the content of the html page into 10 subsections 
  which can be navigated through with buttons at the bottom of the page.
  List is a collection of content to be divided. 
  pageNum is the page number (or subsection )to be displayed. 
*/
function paginate (List, pageNum){
	
	// find number of pages needed
	let num = List.length;
	let pages = Math.ceil(num/10);
	
	//find subset to display
	let subSetStart = (pageNum - 1) * 10;
	let subSetEnd = subSetStart + 9; 

	// iterate through the collection, hiding all but the correct subset
	for(let i = 0; i < List.length; i++){
		//hide all student records that are outside the subSet range for this page
		if ((i < subSetStart) || (i > subSetEnd)){
			List[i].style.display = "none";
		}
		else {
			List[i].style.display = "block";
		}
	} // end for loop
	
	
		const page = document.querySelector('.page');
		let buttons = document.querySelector('.pagination');
		
		// if the page has just been loaded, the buttons won't exist yet
		// if the div doesn't exist yet, create the div that will hold the buttons
			if (typeof(buttons) == 'undefined' || buttons == null){		
				page.insertAdjacentHTML('beforeend', ' <div class="pagination"></div>');
			}
	
	let htmlString = '';
	if (pages > 1) {
		// display navigation numbers on bottom of page
		// create the html for the buttons, marking the active one
		htmlString = '<ul> ';	
		for (let i = 1; i <= pages; i++){
			htmlString += "<li> ";
			 
			if (i == pageNum) {
				htmlString += '<a class="active" href="#">' + i + '</a>';
			}
			else{
				htmlString += '<a href="#">' + i + '</a>';
			}
			htmlString += "</li> ";
		}
		
		htmlString +=  '</ul>';
	}
	
		 
	//add buttons to the page
	buttons = document.querySelector('.pagination');
	buttons.innerHTML = htmlString;
};



/* * * * *    addSearch()        * * * * 
  Adds a search bar to the top of the page 
*/
function addSearch(){
	const pageHeader = document.querySelector(".page-header");
	let htmlString = '<div class="student-search"> ' +
          '<input placeholder="Search for students...">' +
          '<button>Search</button>' +
          '</div>';
	pageHeader.insertAdjacentHTML('beforeend', htmlString);
};

/* * * * *    clearPage()        * * * * 
  Renders all student records hidden
*/
function clearPage(){
	const List = document.querySelectorAll('.student-item');
	for(let i = 0; i < List.length; i++){
			List[i].style.display = "none";	
	}
}

/* * * * *    clearSearchList()        * * * * 
  clears all elements out of searchList
*/
function clearSearchList() {
	
	while (searchResults.length > 0) {
		searchResults.pop();
	}
}



/* * * * * * * * * * * * * * *    Main     * * * * * * * * * * * * */
const studentList = document.querySelectorAll('.student-item'); 
var criteria = '';
var searchResults = [];

paginate(studentList, 1); // paginate the student List & add navigation buttons
addSearch();  // add the search bar




/* * * * * * * * * * * * * * *    Listeners     * * * * * * * * * * * * */


// listens to the buttons on the bottom of the page
const buttons = document.querySelector('.pagination');
buttons.addEventListener('click', (event) => {
	// if criteria is empty, display whole list otherwise, paginate from the searchResults
	if (searchResults.length < 1)
		paginate(studentList, event.target.text);
	else
		paginate(searchResults, event.target.text);
});



// listens to the search bar button
const searchBar = document.querySelector('.student-search button');
searchBar.addEventListener('click', (event) => {
	
	// get the search criteria
	let criteria = event.target.previousElementSibling.value;
	clearSearchList(); // clear searchResults array
	
	if (criteria != ''){
				
		// search greater List for matches and create a collection of that subset
		//let searchResults = [];
		const studentList = document.querySelectorAll('.student-item'); 
		for(let i = 0; i < studentList.length; i++){
			//compare search string with the name in the <h3> tag 
			let name = studentList[i].querySelector('h3');
			if (name.textContent.search(criteria) != -1){
				searchResults.push(studentList[i]); //add student to the results collection
			}
		}
		
		if (searchResults.length == 0){ // no results were found
			alert("No results matched: " + criteria);
			paginate(studentList, 1);
		}
		else {
		// call paginate on the subset that matches the criteria
			clearPage();
			paginate(searchResults, 1);
		}
	}// end if
	else {	
		paginate(studentList, 1); 
	}
	
});


