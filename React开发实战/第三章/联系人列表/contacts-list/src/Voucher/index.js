import React, { Component } from 'react'

class Voucher extends Component {
  constructor () {
    super()
    this.state = {
      passengers: [
        'Simmon, Robert A',
        'Taylor, Kathleen R'
      ],
      ticket: {
        company: 'Dalta',
        filghtNo: '0990',
        departure: {
          airport: 'LAS',
          time: '2016-08-27'
        },
        arrival: {
          airport: 'MIA1',
          time: '2016-08-21'
        },
        codeshare: [
          {
            company: 'GL',
            filghtNo: '9840'
          },
          {
            company: 'TM',
            filghtNo: '5010'
          }
        ]
      }
    }
  }
  render () {
    return (
      <div>

      </div>
    )
  }
}


export default Voucher

