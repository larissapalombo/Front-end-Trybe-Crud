/* exemplo do site
https://imasters.com.br/front-end/entendendo-estado-de-componentes-com-react-na-pratica
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
// import React from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: undefined,
      loading: true,
    };
  }

  componentDidMount() {
    movieAPI.getMovies().then((data) => this.setState({ movies: data, loading: false }));
  }

  render() {
    const { movies, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="movie-list">
        {movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)}
        <Link to={'/movies/new'}>ADICIONAR CARTÃO</Link>
      </div>
    );
  }
}

export default MovieList;
