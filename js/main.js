/* This program dynamically divides the list of students on the html 
   page into 10 subsets and allows the user to page through each
   section using numbered buttons at the bottom of the page. As the user pressed different page numbers, the corresponding subset of students is displayed.  
   
   When the page opens, the first 10 students are shown.  
   If Javascript is disabled, all students will be shown.  
   
    
*/

const studentList = document.querySelectorAll('.student-item'); 
var pageNumber = 1; // Global variable that keeps track of which page number to show
					// initial value is set to the first page


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
	}
	
	//remove navigation numbers if they already exist
	const page = document.querySelector('.page');
	let buttons = document.querySelector('.pagination');
	
	// if the page has just been loaded, the buttons won't exist yet
	// if the div doesn't exist yet, create the div that will hold the buttons
		if (typeof(buttons) == 'undefined' || buttons == null){		
			page.insertAdjacentHTML('beforeend', ' <div class="pagination"></div>');
		}
		
	//create the html string
	// add the html string to the page

	
	// display navigation numbers on bottom of page
	// create the html for the buttons, marking the active one
	let htmlString = '<ul> ';	
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
	 
	//add buttons to the page
	buttons = document.querySelector('.pagination');
	buttons.innerHTML = htmlString;
	
};

paginate(studentList, 1);

const buttons = document.querySelector('.pagination');
buttons.addEventListener('click', (event) => {
//	alert(event.target.text);
	paginate(studentList, event.target.text);
});
