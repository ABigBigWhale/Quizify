class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showContent: false}
        
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    
    handleClick() {
        console.log('id: ' + this.props.snapshotId);
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
                            
                            {this.state.showContent ? <HoverContent /> : null}
                            
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

class HoverContent extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <TransitionGroup
                transitionName="fade-in"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>

                <div ref='hoverContent' className="card-content-hover"></div>
            </TransitionGroup>
            );
    }
}