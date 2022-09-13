
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

// Registration:
  // 1. receiving input from user on the Registration component.
  // 2. Sending request to API with user input.
  // 3. updating user information with loadUser().
  // 4. re-routing state variable route to Signin.

// Loading initial iformation:
  // 1. From Signin, sending input values to signin API to check user in database.
  // 2. Loading state variables with response from API.
  // 3. re-routing state variable route to Home.
  // 3. Passing the user information to the Rank component (displaying name and entries).

// face-recognition:
  // from ImageLinkForm:
  // 1. receiving user input.
  // 2. Updating state variable input from input form and onInputChange().

  // onSubmittButton:
  // 1. updating the state variable imageURL from the input state variable.
  // 2. calling the API's method with the state variable input.
  // 5. receiving the face image dimensions from face-recognition API.
  // 6. updating state variable user.entries if response from face-recognition API.
  // 7. passing user.entries to the Rank component to display on screen.
  // 6. storing the face image dimension from the API in the clarifaiFace constant through the calculateFaceLocation function.
  // 7. calculating the face-box from the clarifaiFace values.
  // 8. update the state variable box with the clarifaiFace values.
  // 9. passing the face-box values to the FaceRecognition component for display.

  // ---- //
  

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
        isSignedIn: false,
        user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
        }
      }
    }

    //updating user information for display
    loadUser = (data) =>{
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        join: data.join
      }})
    }

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

    // updating the state variable input from the input tag in the ImageLink component.
    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }

    // updating the state variable imageUrl from the button in the ImageLink component.
    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input})
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL, // calling API's method with our input state variable.
          this.state.input)
        .then(response => {

          // fetch the image API to update the state variable count when user submits an image:
          if (response){
            fetch('http://localhost:3000/image', {
              method:'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  id: this.state.user.id
              })
          })
          // receiving variable entries (as count) from API, and updating state variable user.entries;
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          }
           this.displayFaceBox(this.calculateFaceLocation(response))}) // passing both functions.
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
    // user state variable will be passed to the rank component directly
    // and to the signing and registration via loadUser():
    const {isSignedIn, box, imageUrl, input, route, user } = this.state;
    
    return (
      <div className="App">
    
        <Navigation 
          onRouteChange={this.onRouteChange} 
          isSignedIn={isSignedIn}
         />
        <Logo />
      
        {route === 'home' 
        ? <div> 
            <Rank name={user.name} entries={user.entries}/>

            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}/>

            <FaceRecognition 
              box={box} 
              imageUrl={imageUrl}/>
          </div>
        
        :  (
            route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Registration loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
          
      </div>
    );  
  }
}

export default App;
