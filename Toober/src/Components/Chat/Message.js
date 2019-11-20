import React, {Component} from 'react';
import './Message.css';
import firebase from '../../FirebaseConfig.js';
export default class Message extends Component {

  constructor(props){
    super(props);
    this.state = {
      imageURL: "",
    }
    this.downloadImage = this.downloadImage.bind(this);
  }

  componentDidMount(){
    this.downloadImage()
  }

  async downloadImage(){
    const imageRelURL = this.props.message.image;
    const storageRef = firebase.storage().ref();
    let url = "";
    try{
      url = await storageRef.child(imageRelURL).getDownloadURL();
    } catch {

    };

    this.setState({
      imageURL: url,
    });

  } 
   
  render() {

    if (this.props.message.type === "img"){
      return (
        <div className="message">
            <span className="message__author">
                {this.props.message.userName}:
            </span>
            <img src={this.props.message.image} width={"50%"} alt="the problem" />
          
        </div>
      )
    } else {
      return (
        <div className="message">
            <span className="message__author">
                {this.props.message.userName}:
            </span>
            {this.props.message.message}         
        </div>
      )
    }
    
  }
}