import React, { useEffect, useState } from 'react'
import { getTopStreams, getGames, getUsers } from '../../api'
import { Link } from 'react-router-dom'

function Sidebar() {

    const [topStreams, setTopStreams] = useState([]);

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
                stream.truePic = "";
                stream.login = "";

                gamesNameArray.forEach(name => {
                    arrayUsers.forEach(user => {
                        if(stream.user_id === user.id && stream.game_id === name.id) {
                            stream.login = user.login;
                            stream.truePic = user.profile_image_url;
                            stream.gameName = name.name;
                           
                        }
                    })
                });

                return stream;
            }) 
            //On ne voudra afficher que les 6 premiers tops streams
            setTopStreams(finalArray.slice(0,6));
        }
        fetchData();
    }, []);
    
    //console.log(topStreams);    

    return(
        <div className='sidebar'>
            <h2 className='titreSidebar' >Chaînes recommandées</h2>
            <ul className='listeStream'>
                {topStreams.map((stream,index) => (
                    <Link key={index}
                    className="lien"
                    to={{
                        pathname: `/live/${stream.login}`
                    }}
                    >  
                      <li key={index} className="containerFlexSidebar">
                        <img src={stream.truePic} alt="user pic" className="profilePicRonde" />
                        <div className="streamUser">{stream.user_name}</div>
                        <div className="viewerRight">
                            <div className="pointRouge"></div>
                            <div>{stream.viewer_count}</div>
                        </div>
                        <div className="gameNameSidebar">{stream.gameName}</div>     
                      </li>
                    </Link>                
                ))}
            </ul>
        </div>
    )
}

export default Sidebar