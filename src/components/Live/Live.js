import React, { useState, useEffect } from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import { useParams } from 'react-router-dom'
import { getStreamByUserLogin, getGames } from '../../api'

function Live() {

    let {slug} = useParams();
    //console.log(slug);

    const [infoStream, setInfoStream] = useState([]) 
    const [infoGame, setInfoGame] = useState([]) 

    useEffect(() => {

        const fetchData = async () => {

            //infoStream
            const result = await getStreamByUserLogin(slug)
            //console.log(result);

            //on gère le cas ou le streamer est offline
            if(result.data.data.length === 0) {
                setInfoStream(false)
            } else {
                //info game
                let gameID = result.data.data.map(game => {
                    return game.game_id
                })

                const resultNomGame = await getGames(`id=${gameID}`);
                //console.log(resultNomGame);
                
                let nomGame = resultNomGame.data.data.map(game => {
                    return game.name
                })
                setInfoGame(nomGame)
                setInfoStream(result.data.data[0])
            }         
        }
        fetchData();

    }, [slug])

    return(

        !infoStream ?

        <div className="containerDecale">
            <ReactTwitchEmbedVideo 
                height="754px"
                width="100%"
                channel={slug}
            />
            <div className="contInfo">
                <div className="titreStream">Le streamer est offline!</div>
            </div>
        </div>
        :
        <div className="containerDecale">
            <ReactTwitchEmbedVideo 
                height="754px"
                width="100%"
                channel={slug}
            />
            <div className="contInfo">
                <div className="titreStream">{infoStream.title}</div>
                <div className="viewer">Viewers : {infoStream.viewer_count}</div>
                <div className="infoGame">Streamer : {infoStream.user_name} ,&nbsp; Langue : {infoStream.language} </div>
                <div className="infoJeu">{infoGame}</div>
            </div>                
        </div>
    )
}

export default Live