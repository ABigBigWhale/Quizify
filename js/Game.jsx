class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trackList: this.props.playlist.tracks.items.slice(),
            progress: "",
            trackUrl: "",
            optionList: [],
            answerIndex: 0,
        }

        console.log("construct: ");
        console.log(this.state);

        this.handleOptionClick = this.handleOptionClick.bind(this);
    }

    componentWillMount() {
        console.log("prep: ");

        var trackList = this.state.trackList.slice();
        trackList.forEach((track, i) => {
            if (track.track.preview_url == null) {
                trackList.splice(i, 1);
            }
            console.log(track.track.preview_url);
        });

        this.setState({trackList: trackList});
        console.log(this.state);

        this.generateLevel();
    }

    generateLevel() {
        console.log("gen level: ");
        var answerIndex = Math.floor(Math.random() * 4);
        console.log("ans: " + answerIndex);

        var trackList = this.state.trackList.slice();
        var candidates = this.randomSubarray(trackList.slice(), 4);

        // Remove the answer track from the pool
        trackList.splice(
            trackList.indexOf(candidates[answerIndex]), 1
        );

        var optionList = [];
        candidates.forEach((trackObj, i) => {
            optionList.push({
                name: trackObj.track.name, 
                artist: trackObj.track.artists[0].name
            });
        });

        this.setState({
            trackList: trackList,
            optionList: optionList,
            answerIndex: answerIndex,
            trackUrl: candidates[answerIndex].track.preview_url,
        });

    }

    handleOptionClick(event) {
        console.log("click: " + event.currentTarget.id + "\tans: " + this.state.answerIndex);
        console.log(event.currentTarget);
        event.preventDefault();
        
        var selected = event.currentTarget.id;
        selected = selected.replace("quiz-option-", "");
        var selectIndex = parseInt(selected);
        var currProgress = this.state.progress;
        
        if (selectIndex == this.state.answerIndex) {
            this.setState({progress: currProgress + 'g'}, this.generateLevel);
        } else {
            this.setState({progress: currProgress + 'r'}, this.generateLevel);
        }
        
        
    }

    randomSubarray(arr, size) {
        var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    render() {
        console.log(this.state.optionList);
        return (
            <div className="game-panel">
                <SongCover
                    imgUrl="img/question-mark.png"
                    trackUrl={this.state.trackUrl} />
                <QuizOptionPanel 
                    list={this.state.optionList}
                    clickHandler={this.handleOptionClick} />
                <ProgressRibbon progress={this.state.progress}/>
            </div>
        );
    }
}

class SongCover extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="song-cover-container">
                <img className="song-cover-img" 
                    src={this.props.imgUrl}
                    onClick={() => {this.audio.play()}} />
                <audio 
                    src={this.props.trackUrl}
                    autoPlay
                    ref={c => { this.audio = c }}/>
            </div>
        );
    }
}

class QuizOptionPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("Option panel");
        console.log(this.props);
        return (
            <div>
                <h2 className="quiz-title">What's this song?</h2>
                <div className="row quiz-panel">
                    {this.props.list.map(
                        (value, id) => 
                        <QuizOption 
                            key={id}
                            quizId={id} 
                            trackAttr={value}
                            clickHandler={this.props.clickHandler}/>
                    )}
                </div>
            </div>
        );
    }
}

class QuizOption extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col s6 m3">
                <div id={"quiz-option-" + this.props.quizId}
                    className="card-panel quiz-option"
                    onClick={this.props.clickHandler} >
                    <p className="black-text">
                        {this.props.trackAttr.name}
                    </p>
                    <p className="grey-text">
                        {this.props.trackAttr.artist}
                    </p>
                </div> 
            </div>
        );
    }
}

class ProgressRibbon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var list = this.props.progress.split('', 12);
        while (list.length < 12) {
            list.push('n');
        }
        console.log(list.length + list);

        return (
            <div className='row'>
                { list.map((val, i) => <ProgressBulb key={i} color={val} />) }
            </div>
        );
    }
}

class ProgressBulb extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={'bulb ' + this.props.color + ' col s1'}></div>
    }
}


