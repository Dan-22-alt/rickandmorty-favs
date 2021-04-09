import React from 'react'
import styles from './login.module.css'
import { connect } from 'react-redux'
import { doGoogleLoginAction, logOutAction } from '../../redux/userDucks'

function LoginPage({ loggedIn, fetching, doGoogleLoginAction, logOutAction }) {

    function doLogin() {
        doGoogleLoginAction()
    }

    function doLogOut() {
        logOutAction()
    }

    if (fetching) return <h2>Cargando ...</h2>
    return (
        <div className={styles.container}>
            { loggedIn ? <h1>
                Cierra tu sesión
            </h1> : <div><h1>
                Inicia Sesión con Google
            </h1>
            <p>Debes iniciar sesión para acceder al Inicio y a Favoritos</p></div>}
            
            { loggedIn ? <button onClick={doLogOut}>
                Cerrar Sesión
            </button> : <button onClick={doLogin}>
                Iniciar
            </button>}
            
        </div>
    )
}

function mapState({ user: { fetching, loggedIn } }) {
    return {
        fetching,
        loggedIn
    }
}

export default connect(mapState, { doGoogleLoginAction, logOutAction })(LoginPage)