import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      totCases: [],
      newCases: [],
      totDeaths: [],
      newDeaths: [],
      current: ''
    }
    this.newCases = this.newCases.bind(this)
    this.totCases = this.totCases.bind(this)
    this.newDeaths = this.newDeaths.bind(this)
    this.totDeaths = this.totDeaths.bind(this)
  }

  componentDidMount(){
    fetch('https://api.covidtracking.com/v1/us/daily.json')
      .then(res => res.json())
      .then(json => {
        var data = json

        var totCases = []
        var newCases = []
        var totDeaths = []
        var newDeaths = []


        data.forEach(i => {
          totCases.unshift(i.positive)
          totDeaths.unshift(i.death)
        })
console.log(totCases)
        //cases and death arrays are same length so they'll be run together
        for(let i = 1; i < totCases.length; i++){
          newCases.push(totCases[i] - totCases[i - 1])
          newDeaths.push(totDeaths[i] - totDeaths[i - 1])
        }

        this.setState({
          data: data,
          totCases: totCases,
          newCases: newCases,
          totDeaths: totDeaths,
          newDeaths: newDeaths,
          current: 'newCases'
        })
      })
  }

  newCases(){
    this.setState({
      current: 'newCases'
    })
  }

  totCases(){
    this.setState({
      current: 'totCases'
    })
  }

  newDeaths(){
    this.setState({
      current: 'newDeaths'
    })
  }

  totDeaths(){
    this.setState({
      current: 'totDeaths'
    })
  }


  render(){
    var displayData = []
    var scale

    if(this.state.current === 'totCases'){
      displayData = this.state.totCases
      scale = 500000
    } else if(this.state.current === 'newCases'){
      displayData = this.state.newCases
      scale = 5000
    } else if(this.state.current === 'totDeaths'){
      displayData = this.state.totDeaths
      scale = 10000
    } else if(this.state.current === 'newDeaths'){
      displayData = this.state.newDeaths
      scale = 100
    }

    return(
      <div id='main'>
      <button onClick={this.newCases}>Daily Cases</button>
      <button onClick={this.totCases}>Total Cases</button>
      <button onClick={this.newDeaths}>Daily Deaths</button>
      <button onClick={this.totDeaths}>Total Deaths</button>
      <div id='bars'>
        {
          displayData.map((i,idx) => {
            return(
              <div
                className="bar"
                style={{
                    height: `${i/scale}vh`
                  }}/>
          )
          })
        }
        </div>
        <div id='x-axis'/>
        <div className='tickx' id='tickx1'/>
        <p class='date' id='date1'>Feb 2020</p>
        <div className='tickx' id='tickx2'/>
        <p class='date' id='date2'>Apr 2020</p>
        <div className='tickx' id='tickx3'/>
        <p class='date' id='date3'>Jun 2020</p>
        <div className='tickx' id='tickx4'/>
        <p class='date' id='date4'>Aug 2020</p>
        <div className='tickx' id='tickx5'/>
        <p class='date' id='date5'>Oct 2020</p>
        <div className='tickx' id='tickx6'/>
        <p class='date' id='date6'>Dec 2020</p>
        <div className='tickx' id='tickx7'/>
        <p class='date' id='date7'>Feb 2021</p>
        <div className='tickx' id='tickx8'/>
        <p class='date' id='date8'>Apr 2021</p>
        <div id='y-axis'/>
        <div className='ticky' id='ticky1'/>
        <p class='count' id='count1'>{10*scale}</p>
        <div className='ticky' id='ticky2'/>
        <p class='count' id='count2'>{20*scale}</p>
        <div className='ticky' id='ticky3'/>
        <p class='count' id='count3'>{30*scale}</p>
        <div className='ticky' id='ticky4'/>
        <p class='count' id='count4'>{40*scale}</p>
        <div className='ticky' id='ticky5'/>
        <p class='count' id='count5'>{50*scale}</p>
        <div className='ticky' id='ticky6'/>
        <p class='count' id='count6'>{60*scale}</p>

      </div>
    )
  }
}

export default Main;
