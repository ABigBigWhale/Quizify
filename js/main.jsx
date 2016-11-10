var Spotify = Spotify || {};
var TransitionGroup = React.addons.CSSTransitionGroup;

Spotify.addr = 'https://api.spotify.com/v1/';

Spotify.auth = {
    clientId: "c0dce3be8fcf44bca854a6407965ba8c",
    clienSecret: "0b5e934ca37a40dabcaf33987a3cde69",
    redirectUrl: "http://localhost:8080/callback"
}

Spotify.client = {
    fetch: function(type, id, callback) {
        $.ajax({
            url: Spotify.addr + type + '/' + id,
            success: function(response) {
                callback(response);
            }
        });
    },

    search: function(query, type, callback) {
        $.ajax({
            url: Spotify.addr + 'search',
            data: {
                q: query,
                type: type,
                limit: 50
            },
            success: function(response) {
                callback(response);
            }
        });
    }
}

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.type = this.props.type;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        Spotify.client.search(this.state.value, 'playlist', function(response) {
            var items = response.playlists.items;
            ReactDOM.render(
                <div className='row'>
                    {items.map(item => {
                        var name = item.name;
                        if ('images' in item) {
                            var imgUrl = item.images[0].url;
                            var snapshotId = item.snapshot_id;

                            return <Card key={snapshotId} text={name} imgsrc={imgUrl} />;
                        }
                    })}
                </div>,

                document.querySelector('#results')
            );
        });

        $('.container-search').addClass('activated');
        event.preventDefault();
    }

    render() {
        return (
            <TransitionGroup
                transitionName="fade-in"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>

                <div className="container container-search center z-depth-4">
                    <form className="center" onSubmit={this.handleSubmit}>
                        <input className="search" placeholder="Search for playlist" 
                            value={this.state.value} onChange={this.handleChange} type="text" />
                        <input className="btn btn-primary" type="submit" value="Search" />
                    </form>
                </div>
            </TransitionGroup>
        );
    }
}

class Card extends React.Component {
    constructor(props) {
        super(props);
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
                        <div className="card-stacked">
                            <div className="card-content">
                                <p>{this.props.text}</p>
                            </div>
                            <div className="card-action">
                                <a className='card-link' href="#">Start</a>
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionGroup>
        );
    }
}

ReactDOM.render(<SearchBox type='playlist' />, document.querySelector('#content'));
console.log('hello world!');