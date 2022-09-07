
import React, {Component} from 'react';
import Clarifai, { COLOR_MODEL } from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Registration from './components/Registration/Registration';
import './App.css';


// the general process is:
// 1. receiving the input from user inside the input tag.
// 2. updating the state variable input when clicking on the button.
// 3. updating the state variable imageURL from the input state variable.
// 4. calling the API's method with the input provided.
// 5. receiving the face image dimensions from the API.
// 6. storing the face image dimension from the API in the clarifaiFace constant through the calculateFaceLocation function.
// 7. calculating the face-box from the clarifaiFace values.
// 8. update the state variable box with the clarifaiFace values.
// 9. passing the face-box values to the FaceRecognition component for display.

// variable required to access the API
const app = new Clarifai.App({
  apiKey: '01c95e27a4744b719ca49c09bf1760bf'
});


class App extends Component {

  // state to update the value of input and pass it to the API.
  // the box variable will store the response from the API to draw the box around the face.
    constructor() {
      super();
      this.state = {
        input: '',
        imageUrl: '',
        box:{},
        route: 'signin', // when the app starts it does so in signin
        isSignedIn: false
      }
    }
    // i'm just testing the git branch way of working

    // storing the array of values from the API;
    calculateFaceLocation = (data) => {
       const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
       
       // selecting the HTML element where the face-box will be rendered.
       const image = document.getElementById('inputimage');
       const width = Number(image.width);
       const height = Number(image.height);
       
       // calculating the dimensions of the face-box.
       return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
       }
    }

    // updating the state variable box.
    displayFaceBox = (box) => {
      this.setState({box: box});
      
    }

    // updating the state variable input from the input tag in the FaceRecongnition component.
    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }

    // updating the state variable imageUrl from the button in the FaceRecognition component.
    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input})
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL, // calling API's method with our input state variable.
          this.state.input)
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response))) // passing both functions.
        .catch(err => console.log(err));
    }

      // update state variable route to display the web content.
      // This function goes to the SignIn form onclick Sign In.
    onRouteChange = (route) => {
      this.setState({route: route});
      if(route === 'signout'){
        this.setState({isSignedIn:false});
      } else if (route === 'home'){
        this.setState({isSignedIn:true})
      }
      
    }
    

  render(){

    //destructuring:
    const {isSignedIn, box, imageUrl, input, route} = this.state;
    
    return (
      <div className="App">
    
        <Navigation 
          onRouteChange={this.onRouteChange} 
          isSignedIn={isSignedIn}
         />
        <Logo />
      
        {route === 'home' 
        ? <div> 
            <Rank />

            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}/>

            <FaceRecognition 
              box={box} 
              imageUrl={imageUrl}/>
          </div>
        
        :  (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Registration onRouteChange={this.onRouteChange} />
          )
        }
          
      </div>
    );  
  }
}

export default App;
