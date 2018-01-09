import React, {Component} from 'react';
import ImagePicker from 'react-image-picker';
import Neopet1 from '../assets/images/neopets/Neopet1.png';
import Neopet2 from '../assets/images/neopets/Neopet2.png';
import Neopet3 from '../assets/images/neopets/Neopet3.png';
import Neopet4 from '../assets/images/neopets/Neopet4.png';
import Neopet5 from '../assets/images/neopets/Neopet5.png';
import Neopet6 from '../assets/images/neopets/Neopet6.png';
import Neopet7 from '../assets/images/neopets/Neopet7.png';
import Neopet8 from '../assets/images/neopets/Neopet8.png';

const imageList = [Neopet1, Neopet2, Neopet3, Neopet4, Neopet5, Neopet6, Neopet7, Neopet8];

class ImagePick extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null
    }
    this.onPick = this.onPick.bind(this)
  }

  onPick(image) {
    this.setState({image})
  }

  render() {
    return (
      <div>
        <ImagePicker
          images={imageList.map((image, i) => ({src: image, value: i}))}
          onPick={this.onPick}
        />
        <button type="button" onClick={() => console.log(this.state.image)}>OK</button>
      </div>
    )
  }
}

export default ImagePick
