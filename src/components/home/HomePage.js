import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import { connect } from 'react-redux'
import { removeCharacterAction, addFavoritesAction } from '../../redux/charsDuck'

function Home({ chars,  removeCharacterAction, addFavoritesAction }) {

    function renderCharacter() {
        let char = chars[0]
        return (
            <Card 
                rightClick={ addFav }
                leftClick={ nextCharacter } 
                { ...char } 
            />
        )
    }

    function nextCharacter() {
        removeCharacterAction()
    }

    function addFav() {
        addFavoritesAction()
    }

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <p className="home-p">Toca la imagen del <font color="red">Lado Derecho</font> para pasar al <b>Siguiente</b></p>
            <p className="home-p">O del <font color="green">Lado Izquierdo</font> para agregar al personaje a <b>Favoritos</b></p>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}

function mapState(state){
    return {
        chars: state.characters.array
    }
}

export default connect(mapState, { removeCharacterAction, addFavoritesAction })(Home)