import React, { Component } from 'react';
import * as firebase from 'firebase';

class Stats extends Component {

 config = {
      apiKey: "AIzaSyAb-cMk3KUsRQcB2sEElEhcKwRvvHS6ofQ",
      authDomain: "pill-me-up.firebaseapp.com",
      databaseURL: "https://pill-me-up.firebaseio.com",
      projectId: "pill-me-up",
      storageBucket: "pill-me-up.appspot.com",
      messagingSenderId: "181007061958",
      appId: "1:181007061958:web:dc177a016b186f6ef518c7"
  };

   constructor(props) { 
      super(props); 
      firebase.initializeApp(this.config);
      const rootRef = firebase.database().ref();
      this.messagesRef = rootRef.child('visitors');
      this.state = {
         age: 27,
         visitors: 0
      }; 
   } 

   tick = () => {
      const divisor = 1000 * 60 * 60 * 24 * 365.2421897; // ms in an average year
      const birthTime = new Date('1992-02-26T00:00:00');
      this.setState({
        age: {
          label: 'Age actuel',
          value: ((Date.now() - birthTime) / divisor).toFixed(11),
        },
      });
    };

    componentDidMount() { 
      this.messagesRef.once('value', snapshot => {
         let visitors;
         visitors = snapshot.val()
         let updates = {};
         updates['/visitors/'] = visitors + 1;
         firebase.database().ref().update(updates);
         this.setState({visitors : visitors + 1});
     })
      this.timerID = setInterval(
         () => this.tick(), 
            100 
         ); 
      } 
  
      componentWillUnmount() { 
         clearInterval(this.timerID); 
         this.messagesRef.on('value').off();
      } 


  render() {
    return (
      <section id="testimonials">
      <div className="text-container">
         <div className="row">


            <h1>Quelques statistiques</h1>

            <div className="ten columns flex-container text-white">
                  <ul className="slides">
                  <li key={this.state.age.label}>
                     <p>{this.state.age.label} : {this.state.age.value} ans</p>
                  </li>
                  <li key={'country'}>
                     <p>Nombre de pays visité : <a href='#'>12</a></p>
                  </li>
                  <li key={'current'}>
                     <p>Ville actuelle : Lyon</p> {//to do : relier à l'api
                     }
                  </li>
                  <li key={'update'}>
                     <p>Dernière mise à jour le : 10/01/2020</p>
                  </li>
                  <li key={'visitor'}>
                     <p>Nombre de visiteur total : {this.state.visitors}</p>
                  </li>
                  </ul>
               </div>
            </div>
         </div>
   </section>
    );
  }
}

export default Stats;
