class Card extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        console.log('id: ' + this.props.snapshotId);
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
                                <a className='card-link' href="#" onClick={this.handleClick}>Start</a>
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionGroup>
        );
    }
}