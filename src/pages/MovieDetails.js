import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';
import movies from '../services/movieData';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      loading: true,
    };
    this.deletar = this.deletar.bind(this);
  }

  /* A match object contains information about how a <Route path>
  matched the URL. match objects contain the following properties:
  params - (object) Key/value pairs parsed from the URL corresponding
  to the dynamic segments of the path */

  componentDidMount() {
    const { id } = this.props.match.params;
    movieAPI.getMovie(id).then((i) => this.setState({ movie: i, loading: false }));
  }

  deletar() {
    const { id } = this.state.movie;
    movieAPI.deleteMovie(id);
  }

  render() {
    const { movie, loading } = this.state;
    if (loading) return <Loading />;
    const { title, storyline, imagePath, genre, subtitle, rating, id } = movie;
    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={`../${imagePath}`} />
        <p>{`Title: ${title}`}</p>
        <p>{`Subtitle: ${subtitle}`}</p>
        <p>{`Storyline: ${storyline}`}</p>
        <p>{`Genre: ${genre}`}</p>
        <p>{`Rating:${rating}`}</p>
        <Link to={`/movies/${id}/edit`}>EDITAR</Link>
        <Link to="/">VOLTAR</Link>
        <Link to={'/'} onClick={() => this.deletar()}>DELETAR</Link>
      </div>
    );
  }
}
// shape define o tipo de cada atributo do objeto
MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.any,
  }).isRequired,
};

export default MovieDetails;
