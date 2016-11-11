class Game extends React.Component {
    constructor(props) {
        super(props);
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
