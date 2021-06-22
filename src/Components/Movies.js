import React, { Component } from 'react'
// here getmovies is not a default file it is present in array from so we have to import it in below way
import { getMovies } from './getmovies'
import axios from 'axios'
export default class movies extends Component {
    // here by using props object we catch the object form parent to child
    constructor(props) {
        super(props);
        this.state={
            movies:[], 
            currentsearch:'',
            currentPage:1,
            limit:4
            // we set current page number=1 and limit of movies will be displayed=4
        }
    }
    // here we are fetching the movies data from api with the help of axios through async await
    async componentDidMount(){
        let promise=axios.get('https://backend-react-movie.herokuapp.com/movies');
        let data=await promise;
        this.setState({
            movies: data.data.movies
        })
    }

    // here in ondelete function we are just passing an argument as id which comes from movies array which was present in getmovies 
    //here for filtering we are checking if that id of movies is not equal to the id we are passing we are  filtering this 
    onDelete =(id)=>{
          let filtermovies= this.state.movies.filter(moviesobj=>{
              return moviesobj._id!=id
          })
          this.setState({
              movies:filtermovies
          })         
    }

    // here when user will type anything then this will be assigned to task and currentsearch will be updated to task which is typed by user 
    handleChange=(e)=>{
                  let task = e.target.value;
                  this.setState({currentsearch:task});
    }
    // sortbystock and sortbyrating is two functions where we just check whether the items are in ascending order or desecnding order and
    // we calculate classname to use as acondition for the button which is pressed
    sortbyrating=(e)=>{
        let className=e.target.className;
        let sortedarr=[];
        if(className=="fas fa-sort-up"){
          //ascending order
          sortedarr=this.state.movies.sort((movieA,movieB)=>{
              return movieA.dailyRentalRate-movieB.dailyRentalRate
          })

        }
        else{
           //desecnding order
           sortedarr=this.state.movies.sort((movieA,movieB)=>{
            return movieB.dailyRentalRate-movieA.dailyRentalRate
        })
        }
        this.setState({
            movies: sortedarr
        })
    }

    sortbystock=(e)=>{
        let className = e.target.className
        let sortedarr=[];
        if(className=="fas fa-sort-up"){
          //ascending order
          sortedarr=this.state.movies.sort((movieA,movieB)=>{
              return movieA.numberInStock-movieB.numberInStock
          })

        }
        else{
           //desecnding order
           sortedarr=this.state.movies.sort((movieA,movieB)=>{
            return movieB.numberInStock-movieA.numberInStock
        })
        }
        this.setState({
            movies: sortedarr
        })

    }
    // in this function we assign num to target value and set the num as limit num will come when we click on number input box
    handleLimit=(e)=>{
        let num = Number(e.target.value);
        this.setState({limit:num })
    }
    // here we pass the parameter as the pagenumber and set the currentpage is equal as pagenumber that weare passsing

    handlepagechange=(pagenumber)=>{
     this.setState({currentPage:pagenumber})
    }
    
    render() {
        
        let {movies,currentsearch,currentPage,limit} = this.state;
        let filteredmovies = [];
        // if currentsearch is empty they movies will remain as previous
        if(currentsearch==""){
            filteredmovies=movies;
        }
        else{
            // if user will type anything then this will be serached with title of movies and will return if currentsearch include any letter what match will title that user typed
          filteredmovies=movies.filter(moviesobj=>{
           let title = moviesobj.title.trim().toLowerCase();
           // here we are converting into tolowers case because includes method is case sensitive dont work on capital letter
           return title.includes(currentsearch.toLowerCase());
          })
        }
        
        //--------pagination--------
        
        // here we have to calculate the current a page number first and the page number will be filtermovies.length/limit 
        // we have to opreate map function on pagination li button to we find numberofpages which will be as per limit of
        // let filtermovies length 9 and limit is 3 the page number will be 4 (3+3+3+1)  so here pushing i+1 because 10/3=3.33==3 and 
        // we have to push 10 element 1 element left so we took i+1 
        let numberofPages = Math.ceil(filteredmovies.length/limit); 
        let numberofpagearray = [];
        for(let i=0;i<numberofPages;i++){
            numberofpagearray.push(i+1);
        }
        //------------------start index and end index of limit page ----------------


        // let for 1st page si= 1-1*4=0 so si=0, ei = 0+4-1=3 so ei=3 but we have to display from 0 to 3 means 0,1,2,3 so 
        //for slice method we will take ei+1= si+limit-1+1= si+limit 
        // if apage start at si =0 then its ei=0+limit==4 (bcz limit given 4) now movie will be shown in 
        //that page=0th,1th,2th,3rd movies == slice(0,4)==slice(si,ei)
        let si = (currentPage-1)*limit;
        let ei = si +limit;
        filteredmovies=filteredmovies.slice(si, ei);
        // here we just have to divide into parts so we divide whole page into two paerts (here we make it a row)
        // every page contain 12 colum so we make a part of 3 coulom and other 9 coloum size
        // if movies array is empty then give loader otherwise display it
        return (
            <>
            {
                this.state.movies==""?
    
                <div class="d-flex justify-content-center">
     <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
       </div>
       </div>
            :<div className='row'  style={{backgroundColor: "#dfe4ea"}}>
                <div className='col-3'>
                   <h1>hello</h1> 
                </div>
                <div className='col-9'>
                    <h1 style={{color: "black"}}>MM MOVIES STORE</h1>
                    <br></br>
                    <input type="text" placeholder=" Enter your movies here " value={this.state.currentsearch} onChange={this.handleChange}></input>
                     {/* here we just added and input box for the number of movies limit we want see in a single page and get the value=4 from it  */}
                   <input type ="number" value={this.state.limit > filteredmovies.length ? filteredmovies.length:this.state.limit} min="1"limit={filteredmovies.length} max={this.state.movies.length} onChange={this.handleLimit}></input> 
                    <table className="table" style={{backgroundColor: "#1B9CFC"}}  >
  <thead>
    <tr  >
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">gener</th>
      <th scope="col">
          <i className="fas fa-sort-up" onClick={this.sortbystock}></i>
          Stock
          <i className="fas fa-sort-down" onClick={this.sortbystock}></i>
          
          </th>
      <th scope="col">
      <i className="fas fa-sort-up" onClick={this.sortbyrating}></i> 
          Rate
      <i className="fas fa-sort-down" onClick={this.sortbyrating}></i>   
          </th>
    </tr>
  </thead>
  <tbody>
    {
    filteredmovies.map(moviesobj => (
        <tr scope="row" key={moviesobj._id}>
                <td></td>
                <td>{moviesobj.title}</td>
                <td>{moviesobj.genre.name}</td>
                <td>{moviesobj.numberInStock}</td>
                <td>{moviesobj.dailyRentalRate}</td>
                <td><button type="button" class="btn btn-danger" onClick={()=>this.onDelete(moviesobj._id)}>delete</button></td>

            </tr>
        
            
    ))
}
  </tbody>
</table>
<nav aria-label="...">
  <ul class="pagination">
{/*     
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item ">
      <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
    </li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    >
    </li> */}

    {   
    // here we give the blue mark to currentactive class 1st we calculate pagenumber from numberofpagearray create a variable pagestyle
    // if pagenumber is current page then give active class to it
        numberofpagearray.map(pagenumber=>{
         let pagestyle =pagenumber;
         if(pagenumber==currentPage){
             pagestyle= 'page-item active'
         }
         else{
             pagestyle ='page item'
         }
            return(
              // here if we click on any pagenumber then it will take to that pagenumber we give class as pagestyle mean the active class and key as pagenumber
              // we created a function handlechange when a click will be done on the pagenumber then it will call that function
              // lastly we assign class pagelink to all pagenumber to display it
              <li onClick={()=>this.handlepagechange(pagenumber)} className={pagestyle} key={pagenumber}>
                   <span class="page-link">{pagenumber}</span>

                </li>
            )
        })
    }
  </ul>
</nav>
                </div>
               
            </div>
    }
            </>

        )
    }
}








