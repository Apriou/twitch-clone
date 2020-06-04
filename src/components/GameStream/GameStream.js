import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getStreamsByGameId, getUsers } from '../../api'
import { Link } from 'react-router-dom'

function GameStream() {
    const [streamData, setStreamData] = useState([]);
    const [viewers, setViewers] = useState(0)

    let location = useLocation();
    let {slug} = useParams(); //{} destucturing 
    //console.log(location);    

    useEffect(() => {
        const fetchData = async () => {
            //On recup l'ensemble des streams du jeux 
            const result = await getStreamsByGameId(location.state.gameID)
            let dataArray = result.data.data;

            //Formatage de l'url pour l'image
            let finalArray = dataArray.map(stream => {
                let newURL = stream.thumbnail_url
                    .replace("{width}", 320)
                    .replace("{height}", 180);
                stream.thumbnail_url = newURL;
                return stream;
            })

            //Calcul des viewers
            let totalViewers = finalArray.reduce((acc, val) => {
                return acc + val.viewer_count
            }, 0);

            //Récup du login des users pour pouvoir les afficher
            let userIDs = dataArray.map(stream => {
                return stream.user_id
            })

            let queryParamsUsers = ""
            userIDs.map(userID => {
                return (queryParamsUsers = queryParamsUsers + `id=${userID}&`); 
            })

            let getUserslogin = await getUsers(queryParamsUsers); 
            let userLoginArray = getUserslogin.data.data;//(contient login et id du user)

            //Ajout des logins au resultat final (ensemble de stream)
            finalArray = dataArray.map(stream => {
                stream.login = ""
                userLoginArray.forEach(user => {
                    if(stream.user_id === user.id) {
                        stream.login = user.login
                    }
                });
                return stream;
            })
            setViewers(totalViewers);
            setStreamData(finalArray);
        }
        fetchData(); 
    }, [location.state.gameID])

    //console.log(viewers);
    //console.log(streamData);
    
    return(
        <div>
           <h1 className="titreGamesStreams">Streams : {slug}</h1>
           <h3 className="sousTitreGameStreams">
                <strong className="textColored">{viewers}</strong> personnes regardent {slug}
           </h3>
           <div className="flexAccueil">
               {streamData.map((stream, index) => (
                    <div 
                    key={index}
                    className="carteGameStreams">
                        <img src={stream.thumbnail_url} alt="jeu carte img" className="imgCarte" />
                        <div className="cardBodyGameStreams">
                            <h5 className="titreCartesStream">{stream.user_name}</h5>
                            <p className="textStream">Nombre de viewers : {stream.viewer_count}</p>
                            <Link
                                className="lien"
                                to={{
                                    pathname: `/live/${stream.login}`
                                }}
                            >
                                <div className="btnCarte">Reagarder {stream.user_name}</div>
                            </Link>
                        </div>
                    </div>
               ))}
           </div>
        </div>

    )
}

export default GameStream