import React from 'react';

export class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCountry: '...',
      insertedCapital: '',
      isAnswerCorrect: '',
      output: '',
      counter: -1,
      points: 0,
    };
    this.inputValue = this.state.insertedCapital;

    this.getNewCountry = this.getNewCountry.bind(this);
    this.insertCapital = this.insertCapital.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.resetScore = this.resetScore.bind(this);
    this.getRandomCountry = this.getRandomCountry.bind(this);
  }
  componentDidMount() {
    if(this.props.countries.length) {
      this.getNewCountry(this.props);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.countries.length) {
      this.getNewCountry(nextProps);
    }
  }
  getNewCountry(props) {
    let newCountry = this.getRandomCountry(props.countries);
    if(newCountry.capital !== '') {
      this.setState({
        currentCountry: newCountry,
        insertedCapital: '',
        output: '',
        counter: this.state.counter+1,
        isAnswerCorrect: '',
      });
    } else {
      this.getNewCountry(props);
    }
  }
  getRandomCountry(countries) {
    return countries[Math.floor(Math.random()*countries.length)];
  }
  insertCapital(e) {
    this.inputValue = e.target.value;
    this.setState({
      insertedCapital: this.inputValue,
    });
  }
  checkAnswer() {
    this.state.currentCountry.capital === this.state.insertedCapital ? this.setState({isAnswerCorrect: true, output: "Bravo, you're right!", points: this.state.points+1, counter: this.state.counter+1}) : this.setState({isAnswerCorrect: false, output: `Oops, the correct answer is ${this.state.currentCountry.capital}!`, counter: this.state.counter+1})
  }
  resetScore() {
    this.setState({
      counter: 0,
      points: 0,
      insertedCapital: '',
      isAnswerCorrect: '',
    });
  }

  render() {
    if(!this.props.countries) return <p>Loading...</p>;
    const {currentCountry, isAnswerCorrect} = this.state;
    return <div className='quiz'>
      <div className='quiz-text'>
        <h1>What is the capital of {currentCountry.name || '...'} ?</h1>
        <input onChange={this.insertCapital} className='capitalInput' value={this.state.insertedCapital}></input>
        <div className='output'>{this.state.output}</div>
        {isAnswerCorrect==='' ? <div className='checkAnswer' onClick={this.checkAnswer}>Check your answer!</div> : <div className='checkAnswer-disabled'>Check your answer!</div>}
        <div onClick={() => this.getNewCountry(this.props)} className='getCountry'>Get new country</div>
        <div className='score'>Your score: {this.state.points} / {this.state.counter} <span onClick={this.resetScore} className='score-reset'>Reset score</span></div>
      </div>
    </div>
  }
}

export default Quiz;
