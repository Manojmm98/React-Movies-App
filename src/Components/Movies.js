import React, { Component } from 'react'
// here getmovies is not a default file it is present in array from so we have to import it in below way
import { getMovies } from './getmovies'
export default class movies extends Component {
    constructor(props) {
        super(props);
        this.state={
            movies:getMovies(), 
            currentsearch:'',
            filtermovies:getMovies()
        }
    }

    onDelete =(id)=>{
          let filtermovies= this.state.movies.filter(moviesobj=>{
              return moviesobj._id!=id
          })
          this.setState({
              movies:filtermovies
          })
    }
    handleChange=(e) => {
         //this.setState({ currentsearch  : e.target.value })
         let task= e.target.value;
         if(task=="")
         {
             this.setState({
                 filtermovies:this.state.movies,
                 currentsearch:''
             })
             return;
         }
         let newfilteredmovies = this.state.movies.filter(moviesobj=>{
             let title = moviesobj.title.trim().toLowerCase();
             console.log(title);
             return title.includes(task.toLowerCase())
         
    })
    this.setState({
        filtermovies:newfilteredmovies,
        currentsearch:task
    })
}
    render() {
        let {movies,filtermovies} = this.state;
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
      <th scope="col">id</th>
      <th scope="col">title</th>
      <th scope="col">gener</th>
      <th scope="col">Stock</th>
    </tr>
  </thead>
  <tbody>
    {
    filtermovies.map(moviesobj => (
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










