class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        Spotify.client.search(this.state.value, this.props.searchFor, function(response) {
            var items = response.playlists.items;
            ReactDOM.render(
                <div className='row'>
                    {items.map(item => {
                        var name = item.name;
                        var owner = item.owner.id;
                        var trackCnt = item.tracks.total;
                        var url = item.href;
                        if ('images' in item) {
                            var imgUrl = item.images[0].url;
                        }
                        var snapshotId = item.snapshot_id;

                        return <Card key={snapshotId} 
                                   snapshotId={snapshotId} 
                                   name={name} 
                                   owner={owner}
                                   cnt={trackCnt}
                                   imgsrc={imgUrl}
                                   url={url} />;
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
            <form className="center" onSubmit={this.handleSubmit}>
                <input className="search" placeholder="Search for playlist" 
                    value={this.state.value} onChange={this.handleChange} type="text" />
                <input className="btn btn-primary" type="submit" value="Search" />
            </form>
        );
    }
}

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.type = this.props.type;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
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
                    <Search searchFor="playlist"/>    
                </div>
            </TransitionGroup>
        );
    }
}