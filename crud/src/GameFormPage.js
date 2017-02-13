import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveGame, fetchGame, updateGame } from './actions';
import GameForm from './GameForm';

class GameFormPage extends React.Component {

    state = {
        redirect: false
    }

    componentDidMount = () => {
        //ony do this if the id is provided by the route
        const { match } = this.props;
        if (match.params._id) {
            this.props.fetchGame(match.params._id);
        }
    }

    saveGame = ({_id, title, cover }) => {
        if (_id) {
            return this.props.updateGame({ _id, title, cover }).then(
                () => { this.setState({ redirect: true })},
            );
        } else {
            return this.props.saveGame({ title, cover }).then(
                () => { this.setState({ redirect: true })},
            );
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.redirect ? 
                    <Redirect to="/games" /> :
                    <GameForm
                        game={this.props.game}
                        saveGame={this.saveGame}
                    />
                }
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    const { match } = props;
    // check if this GameForm has been passed a parameter for an existing game from the router
    if (match.params._id) {
        return {
            game: state.games.find(item => item._id === match.params._id)
        }
    }

    // otherwise the form will start with an empty game 
    return { game: null };
}

export default connect(mapStateToProps, { saveGame, fetchGame, updateGame })(GameFormPage);