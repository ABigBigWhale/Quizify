class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showContent: false}

        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleClick() {
        if (!Spotify.auth.accessToken) {
            Spotify.auth.login(() => {
                Spotify.client.get(this.props.url, (response) => {
                    ReactDOM.render(<Game playlist={response} />, 
                                    document.querySelector('#results'));
                });
            });
        } else {
            Spotify.client.get(this.props.url, (response) => {
                console.log(response);
                ReactDOM.render(<Game playlist={response} />, 
                                document.querySelector('#results'));
            });
        }
    }

    handleMouseEnter() {
        this.setState({showContent: true});
    }

    handleMouseLeave() {
        this.setState({showContent: false});
    }

    render() {
        return (
            <TransitionGroup
                transitionName="slide-in"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>

                <div className='playlist-card col s12 m6'>
                    <div className="card horizontal">
                        <div className="card-image">
                            <img src={this.props.imgsrc} />
                        </div>
                        <div className="card-stacked"
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}>

                            <div ref='hoverContent' 
                                className="card-content-hover"
                                style={{opacity: this.state.showContent ? 1 : 0}}
                                onClick={this.handleClick}>

                                <p><b>{this.props.name}</b></p>
                                <p>Owner: <i>{this.props.owner}</i></p>
                                <p><i className="material-icons">playlist_play</i>×{this.props.cnt}</p>
                            </div>

                            <div className="card-content">
                                <p>{this.props.name}</p>
                            </div>


                            <div className="card-action">
                                <a className='card-link' href="#" onClick={this.handleClick}>Start</a>
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionGroup>
        );
    }
}