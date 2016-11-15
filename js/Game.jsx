class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trackList: this.props.playlist.tracks.items.slice(),
            progress: "",
            trackUrl: "",
            optionList: [],
            answerIndex: 0,
            titleText: "What's the song?",
            displayOptions: true,
            ongoingClick: false
        }

        console.log("construct: ");
        console.log(this.state);

        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.generateLevel = this.generateLevel.bind(this);
    }

    componentWillMount() {
        console.log("prep: ");

        var trackList = this.state.trackList.slice();
        trackList.forEach((track, i) => {
            if (track.track == null 
                || track.track.preview_url == null 
                || !track.track.preview_url) {

                trackList.splice(i, 1);
            }
        });

        this.setState({trackList: trackList});
        this.generateLevel();
    }

    generateLevel() {
        if (this.state.progress.length < 12) {

            var answerIndex = Math.floor(Math.random() * 4);
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

            if (!candidates[answerIndex].track.preview_url) {
                this.generateLevel();
            } else {
                this.setState({
                    trackList: trackList,
                    optionList: optionList,
                    answerIndex: answerIndex,
                    trackUrl: candidates[answerIndex].track.preview_url,
                    ongoingClick: false,
                });
            }
            console.log(this.state.trackUrl);
            console.log(this.state);

        } else {
            this.setState({
                titleText: "Quiz complete. Your grade: " + (
                    ((this.state.progress.match(/g/g) || []).length / 3.0).toFixed(1)
                ) + "/4.0",
                displayOptions: false,
            });
        }
    }

    handleOptionClick(event) {
        if (this.state.ongoingClick) return;
        
        this.setState({ongoingClick: true});
        event.stopPropagation();
        event.preventDefault();
        
        event.currentTarget.setAttribute;
        this.panel.revealAnswer(this.state.answerIndex, this.generateLevel);

        var selected = event.currentTarget.id;
        selected = selected.replace("quiz-option-", "");
        var selectIndex = parseInt(selected);
        var currProgress = this.state.progress;

        if (selectIndex == this.state.answerIndex) {
            this.setState({progress: currProgress + 'g'});
        } else {
            this.setState({progress: currProgress + 'r'});
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
        return (
            <div className="game-panel">
                <SongCover
                    imgUrl="img/question-mark.png"
                    trackUrl={this.state.trackUrl} />
                <QuizOptionPanel 
                    text={this.state.titleText}
                    ref={q => {this.panel = q}}
                    list={this.state.optionList}
                    options={this.state.displayOptions}
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

    revealAnswer(answerIndex, callback) {
        for (var i = 0; i < 4; i++) {
            $('#quiz-option-' + i).off("click");
            if (i == answerIndex) {
                $('#quiz-option-' + i).addClass('correct');
            } else {
                $('#quiz-option-' + i).addClass('wrong');
            }
        }

        setTimeout(function() {
            for (var i = 0; i < 4; i++) {
                if (i == answerIndex) {
                    $('#quiz-option-' + i).removeClass('correct');
                } else {
                    $('#quiz-option-' + i).removeClass('wrong');
                }
            }

            callback();

        }, 1000)
    }

    render() {
        if (this.props.options) {
            return (
                <div>
                    <h2 className="quiz-title">{this.props.text}</h2>
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
        } else {
            return (
                <div>
                    <h2 className="quiz-title">{this.props.text}</h2>
                </div>
            );
        }
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


