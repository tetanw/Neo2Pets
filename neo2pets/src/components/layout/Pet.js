import React, {Component} from 'react';


class Pet extends Component {
  render() {
    return (
      <div className="pet">
        {this.props.pet !== undefined ? (
          <div>
            <h3>{this.props.pet.nickName}</h3>
            <h3>{this.props.pet.race.name}</h3>
            <h3>{this.props.pet.name}</h3>
          </div>
        ) : ""}
      </div>
    )
  }
}

export default Pet;
