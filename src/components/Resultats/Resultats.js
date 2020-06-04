import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUsers } from '../../api'
import Erreur from '../Erreur/Erreur'

function Resultats () { //resultat de la recherche d'un user (par son login)

    let {slug} = useParams();
    //console.log(slug);
    

    const [result, setResult] = useState(true)
    const [streamerInfo, setStreamerInfo] = useState([])

    //On enlève les espaces dans le login du user pour qu'il soit recherchable par twitch (qui twitch l'a enregitré sans espace)
    let cleanSearch = slug.replace(/ /g, '');

    useEffect(() => {
        const fetchdata = async () => {
            const result = await getUsers(`login=${cleanSearch}`)
            //console.log(result)

            //si la recherche a échouée (si on a tapé n'importe quoi comme login à rechercher)
            if(result.data.data.length === 0) {
                setResult(false)
            } else {
                setStreamerInfo(result.data.data)
            }           
        }
        fetchdata()
    }, [cleanSearch]) //On relance useEffect si cleanSearch a changé (si on a relancer une recherche)

    return(
        result ?
        <div className="containerDecaleResultats">
            <h4>Résultats de recherche :</h4>
            {streamerInfo.map((stream, index) => (
                <div key= {index} className="carteResultats">
                    <img src={stream.profile_image_url} alt="Résultat profil" className="imgCarte" />
                    <div className="cardBodyResults">
                        <h5 className="titreCartesStream">{stream.display_name}</h5>
                        <div className="txtResult">{stream.description}</div>

                        <Link
                        className="lien"
                        to={{
                            pathname: `/live/${stream.login}`
                        }}
                        >
                        <div className="btnCarte btnResult">Regarder {stream.display_name}</div>
                        </Link>
                    </div>
                </div>
            ))}
        
        </div> : 
        <Erreur />
    )
}

export default Resultats