import React, {Component} from 'react';
import {
  Panel,
} from 'react-bootstrap';
import Item from '../../layout/Item'

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          _id: "5a54ca186a2bf405681677b2",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca2ad3258235a0f39cd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851",
        },
        {
          _id: "5a54ca3521e9a40914ce4bd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851",
        },
        {
          _id: "5a54ca186a2b405681677b2",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca2ad358235a0f39cd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851",
        },
        {
          _id: "554ca3521e9a40914ce4bd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851",
        },
        {
          _id: "5a54c186a2bf405681677b2",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54caad3258235a0f39cd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851",
        },
        {
          _id: "5a54ca3521e9a40914ce4bd",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851",
        },
        {
          _id: "5a54ca186a2bf05681677b2",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca2ad325235a0f39cd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851",
        },
        {
          _id: "5a54ca3521e9a40914ce4b4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851",
        },
        {
          _id: "5a54ca186a2bf4056816772",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca2ad3258235a0f39c4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851",
        },
        {
          _id: "5a54ca3521e9a40914e4bd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: [
              "TOY"
            ]
          },
          owner: "5a54c6a9d406a8270823c851",
        },
      ]
    };
  }


  render() {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            Inventory
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div style={{display: "grid", gridAutoFlow: "row", gridTemplateColumns: "repeat(10, 100px)", gridGap: "10px"}}>
            {this.state.items.map(item =>
              <Item key={item._id} type={item.type}/>
            )}
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

export default Inventory;
