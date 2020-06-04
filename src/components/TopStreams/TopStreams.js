import React, { useState, useEffect } from 'react'
import { getTopStreams, getGames, getUsers } from '../../api'
import { Link } from 'react-router-dom'

const TopStreams = () => {
    const [channels, setChannels] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getTopStreams();

            let dataArray = result.data.data;
            //console.log(dataArray);            

            //On a besoin de l'id du game pour avoir son nom dans une 2eme requête API
            let gameIDs = dataArray.map(stream => {
                return stream.game_id;
            })

             //On a besoin de l'id du userr pour avoir son nom dans une 3eme requête API
            let userIDs = dataArray.map(stream => {
                return stream.user_id;
            })

            let queryParamsGames = '';
            let queryParamsUsers = '';

            gameIDs.map(id => {
                return (queryParamsGames = queryParamsGames + `id=${id}&`)
            })
            userIDs.map(id => {
                return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
            })

            //Appels API
            let gamesNames = await getGames(queryParamsGames);
            let myUsers = await getUsers(queryParamsUsers);

            let gamesNameArray = gamesNames.data.data;
            let arrayUsers = myUsers.data.data;

            //console.log(arrayUsers, gamesNameArray)

            const finalArray = dataArray.map(stream => {
                //on ajoute des variables au stream
                stream.gameName = "";
                stream.login = "";

                gamesNameArray.forEach(name => {
                    arrayUsers.forEach(user => {
                        if(stream.user_id === user.id && stream.game_id === name.id) {
                            stream.login = user.login;
                            stream.gameName = name.name;                           
                        }
                    })
                });

                //on formate l'image 
                let newUrl = stream.thumbnail_url
                    .replace("{width}","320")
                    .replace("{height}","180")
                
                stream.thumbnail_url = newUrl;

                return stream;
            }) 
          
            setChannels(finalArray);
        }
        fetchData();
    }, []);

    return ( 
        <div>
            <h1 className="titreGames" > Streams les plus populaires</h1>
            <div className="flexAccueil">
                {channels.map((channel, index) => (
                    <div key={index} className="carteStream" >
                        <img src={channel.thumbnail_url} className="imgCarte" alt="jeu" />
                        <div className="cardBodyStream" >
                            <h5 className="titreCarteStream">{channel.user_name}</h5>
                            <p className="textStream" >{channel.gameName}</p>
                            <p className="textStream viewers" >Viewers :{channel.viewer_count}</p>

                            <Link 
                            className="lien"
                            to={{
                                pathname:`/live/${channel.login}`
                            }}>
                                 <div className="btnCarte">{channel.user_name}</div>
                            </Link>
                           
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )

}

export default TopStreams