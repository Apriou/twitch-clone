import React, { useState, useEffect } from 'react'
import { getTopGames } from '../../api';
import { Link } from 'react-router-dom'

function Games() {
    const [games, setGames] = useState([]);
    //const [userToken, setUserToken] = useState(''); 

    useEffect(() => {
        const fetchData = async () => {

            // if(document.location.hash ==='') { //Redirection de l'appli vers la connection twitch de l'utilisateur
            //     console.log('apiConnection')
            //     apiConnection();                  
            // } else { //L'utilisateur a autorisé le site a se connecter à l'API en son nom
            //     //On récupère le jeton utilisateur dans l'URI
            //     console.log('document.location.hash', document.location.hash.split('&')[0].split('=')[1])

            //     localStorage.setItem("access_token", document.location.hash.split('&')[0].split('=')[1])
                
                const result = await getTopGames()
                //console.log(result);   

                let dataArray = result.data.data;
                let finalArray = dataArray.map(game => { //On va formater l'URL
                    let newUrl = game.box_art_url
                        .replace("{width}", "250")
                        .replace("{height}", "300")
                    game.box_art_url = newUrl
                    return game
                });
                setGames(finalArray);
            //}                     
                   
        }
        fetchData();
    }, [])

    //console.log(games);   

    return(
        <div>
            <h1 className='titreGames'>Jeux les plus populaires</h1>
            <div className='flexAccueil'>
                {games.map((game,index) => (
                    <div key={index} className="carteGames">
                        <img src={game.box_art_url} alt="jeu profil pic" className="imgCarte" />
                        <div className="cardBodyGames">
                            <h5 className="titreCarteGames">{game.name}</h5>
                            <Link className="lien" 
                                to={{
                                    pathname: "/game/" + game.name,
                                    state: {
                                        gameID: game.id
                                    }
                                }}
                            >
                               <div className="btnCarte">Regarder {game.name}</div>
                            </Link>
                          
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Games