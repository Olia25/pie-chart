import React, {useState} from 'react';
import './App.css';

function App() {
     const [array, setArray] = useState([])
     const [amount, setAmount] = useState('')
     const [name, setName] = useState('')

     const getRandomColor = () => {
         const getRandomNumber = () => Math.floor(Math.random() * 256)
         return `rgb(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`
     }

     const addData = () => {
         setArray([...array, {name, number:Number(amount), color: getRandomColor()}])
         setAmount('')
         setName('')
     }

     const size = 300
     const center = size / 2
     const radius = size / 2

     const sum = array.reduce((result, n) => result + n.number, 0)

     const sectors = array.reduce((result, item) => {
         const previousEndAngle = result.length ? result[result.length - 1].endAngle : -Math.PI / 2
         const endAngle = (2 * Math.PI * item.number) / sum + previousEndAngle
         return [...result, {number: item.number, color: item.color, startAngle: previousEndAngle, endAngle}]
     }, [])

     const getCoordinates = angle => ({
         x: center + radius * Math.cos(angle),
         y: center + radius * Math.sin(angle)
     })

     const getPath = (startAngle, endAngle) => {
         const startPoint = getCoordinates(endAngle)
         const endPoint = getCoordinates(startAngle)
         const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1'
         return `
            M ${center} ${center}
            L ${startPoint.x} ${startPoint.y}
            A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endPoint.x} ${endPoint.y}
            L ${center} ${center}
       `
     }
      return (
          <div className="chart">
              <div>
                  <svg height={size} width={size} viewBox={`0 0 ${size} ${size}`} >
                      <circle cx={center} cy={center} r={radius} fill="yellow"/>
                      {sectors.map((sector, index) => (
                          <path
                              key={index}
                              fill={sector.color}
                              d={getPath(sector.startAngle, sector.endAngle)}
                          />
                      ))}
                  </svg>
              </div>
              <div>
                  <input
                      className="inputMargin"
                      placeholder="name"
                      value={name}
                      onChange={({target: {value}}) => setName(value)}
                  />
                  <input
                      className="inputMargin"
                      placeholder="amount"
                      value={amount}
                      onChange={({target: {value}}) => setAmount(value)}
                  />
                  <button onClick={addData}>
                      Add
                  </button>
                  {array.map((item, index) => {
                      const percent= Math.ceil(item.number/sum*100)
                      return <p key={index}> {item.name}: {item.number} - percent: {percent}%</p>
                  })}
              </div>
          </div>
      );
}

export default App;
