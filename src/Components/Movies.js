import React, { Component } from 'react'
// here getmovies is not a default file it is present in array from so we have to import it in below way
import { getMovies } from './getmovies'
export default class movies extends Component {
    // here by using props object we catch the object form parent to child
    constructor(props) {
        super(props);
        this.state={
            movies:getMovies(), 
            currentsearch:'',
        }
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
    
    render() {
        let {movies,currentsearch} = this.state;
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
        // here we just have to divide into parts so we divide whole page into two paerts (here we make it a row)
        // every page contain 12 colum so we make a part of 3 coulom and other 9 coloum size
        return (
            <div className='row'>
                <div className='col-3'>
                    hello
                </div>
                <div className='col-9'>
                    <input type="text" placeholder=" Enter your movies here " value={this.state.currentsearch} onChange={this.handleChange}></input>
                    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">gener</th>
      <th scope="col">
          <i className="fas fa-sort-up"></i>
          Stock
          <i className="fas fa-sort-down"></i>
          
          </th>
      <th scope="col">
      <i className="fas fa-sort-up"></i> 
          Rate
      <i className="fas fa-sort-down"></i>   
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
                </div>
               
            </div>
        )
    }
}








//---------------------------------extra way----------------------------------------------------------------------------------------//

// here when a user type anything in task bar we just catch the task through e.target.value next we check if task is empty
    // means user didnt type anything then we update the filtermovies list as original movies and currentserach = empty
    // if user type anything  then we have to check if any title matches on it or not so 
    // first  1--> we find title of every movies by filter function movies array and trim it to lower to remove extraspaces and convert it to lower-case
    // second 2--> we just check if the title includes any task that user typed or not 
    //  now we have to update the state of filtermovies as newfliterdmovies that we got and the currentsearch as the task left in the input box
    // for example if we typed th then it will serach th named film but we delete h then it will not able to serach from whole movies array so we have to update the currentsearch ==task at  last
//     handleChange=(e) => {
//          //this.setState({ currentsearch  : e.target.value }) 
//          let task= e.target.value;
//          if(task=="")
//          {
//              this.setState({
//                  filtermovies:this.state.movies,
//                  currentsearch:''
//              })
//              return;
//          }
//          let newfilteredmovies = this.state.movies.filter(moviesobj=>{
//              let title = moviesobj.title.trim().toLowerCase();
//              console.log(title);
//              return title.includes(task.toLowerCase())
         
//     })
//     this.setState({
//         filtermovies:newfilteredmovies,
//         currentsearch:task
//     })
// }