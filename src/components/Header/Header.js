import React, { useState, useEffect } from 'react'
import logo from './IconeTwitch.svg'
import search from './Search.svg'
import menuIco from './MenuIco.svg'
import croix from './Croix.svg'
import { Link } from 'react-router-dom'

function Header() {
    const [menu, showMenu] = useState(false)
    const [smallScreen, setSmallScreen] = useState(false)
    const [searchInput, setSearch] = useState("")

    useEffect(()=>{
        const mediaQuery = window.matchMedia("(max-width:900px)")
        //addListener c'est comme addEventListener pour les media queries en JS
        mediaQuery.addListener(handleMediaQueryChange);//on va regarder si le media est en dessus ou en dessous de max-width
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        }
    
    })

    const handleMediaQueryChange = mediaQuery => {
        if(mediaQuery.matches) {//vrai si c'est en dessous de max-width
            setSmallScreen(true);
        } else {
            setSmallScreen(false);
        }
    }

    const toggleNavRes = () => {//on montre ou pas le menu a partir de l'icone burger
        showMenu(!menu);
    }

    const hideMenu = () => { //on ferme le menu si on clique sur un lien du menu
        if(menu === true) {
            showMenu(false)
        }
    }

    //Partie search

    const handleSubmit = (e) => { 
        console.log("handleSubmit");   
        e.preventDefault() //on prévient le comportement par défaut du submit qu'on envoie rien??
    }

    const handleKeyPress = (e) => {
        console.log("setSearch");        
        setSearch(e.target.value);
    }

    return(
        <div>
            <nav className='headerTop'>
            {(menu || !smallScreen) && (
                <ul className='listeMenu'>
                    <li onClick={hideMenu} className='liensNav'>
                        <Link className="lien" to="/">
                            <img src={logo} alt="logo Twitch" className='logo' />
                        </Link>                      
                    </li>
                    <li onClick={hideMenu} className='liensNav'>
                        <Link className="lien" to="/">
                            Top Games
                        </Link>                        
                    </li>
                    <li onClick={hideMenu} className='liensNav'>
                        <Link className="lien" to="/top-streams">
                            Top Streams
                        </Link>    
                    </li>
                    <li className='liensNav'>
                        <form className='formSubmit' onSubmit={handleSubmit}>
                            <input 
                                value={searchInput}
                                onChange={(e) => handleKeyPress(e)}
                                type='text' 
                                className='inputRecherche' 
                            />
                            <Link 
                            className="lien"
                            to={{
                                pathname: `/resultats/${searchInput}`
                            }}>
                               <button type='submit'>
                                    <img src={search} alt='icone loupe' className='logoLoupe' />
                                </button>
                            </Link>
                         
                        </form>
                    </li>
                </ul>
            )}
            </nav>
            <div onClick={toggleNavRes} className='menuResBtn'>
                <img src={!menu ? menuIco : croix} alt='menu icone responsive' className='menuIco' />
            </div>
        </div>
    )

}

export default Header