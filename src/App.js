import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Games from './components/Games/Games'
import TopStreams from './components/TopStreams/TopStreams'
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom'
import Live from './components/Live/Live'
import GameStream from './components/GameStream/GameStream';
import Resultats from './components/Resultats/Resultats'
import Erreur from './components/Erreur/Erreur';
import { apiConnection, getTokenValidation } from './api';

function App() {

  if(document.location.hash !=='') { //L'utilisateur a autorisé le site a se connecter à l'API en son nom
    //On récupère le jeton utilisateur dans l'URI
    console.log(" document.location.hash access_token", document.location.hash.split('&')[0].split('=')[1])
    localStorage.setItem("access_token", document.location.hash.split('&')[0].split('=')[1])
  }

    //si on n'a pas de token dans le storage
  if(localStorage.getItem("access_token") === null || localStorage.getItem("access_token") === undefined || localStorage.getItem("access_token") === "") {
    //On va chercher un token 
    //Redirection de l'appli vers la connection twitch de l'utilisateur
    //console.log('apiConnection')
    apiConnection(); 
  } else { //on a un token
    //On test sa validitée
    console.log("getTokenValidation", localStorage.getItem("access_token"))
    let timeSeconds = 0;
    getTokenValidation().then(response => { //On interroge l'api quand sur la validité du token 
      timeSeconds = response.data.expires_in //expiration en secondes
      console.log("timeSeconds", timeSeconds);
      if(timeSeconds === undefined || timeSeconds === null || timeSeconds === 0) {//Si le token est expiré
        //On va rechercher un token 
        //Redirection de l'appli vers la connection twitch de l'utilisateur
        apiConnection(); 
      }  
    }).catch(e => {});   
  }

  //remarque: on a que des compo fonctionnels
  return (
    <Router
    //Pour actualiser (relancer les useEffect des composants fonctionnels) à chaque appel sur les liens, mais j'ai préféré ne pas le mettre et relancer le useEffect de Resultats
    //forceRefresh={true} 
    >     
      <div className="App"> 
          <Header />
          <Sidebar />
          <Switch> 
            <Route exact path='/' component={Games} />
            <Route exact path='/top-streams' component={TopStreams} />
            <Route exact path='/live/:slug' component={Live} />
            <Route exact path='/game/:slug' component={GameStream} />
            <Route exact path='/resultats/:slug' component={Resultats} />
            <Route exact path='/resultats/' component={Erreur} />
          </Switch>
        </div>
    </Router>  
  );
}

export default App;
