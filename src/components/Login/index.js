import Api from '../../Api'
import './Login.css'

export const Login = ({onReceive}) => {

    const facebookLogin = async () => {
        let result = await Api.fbPopup();
        if(result) {
            onReceive(result.user)
        }else {
            alert('Erro!')
        }
    }
    const googleLogin = async () => {
        let result = await Api.googlePopup();
        if(result) {
            onReceive(result.user)
        }else {
            alert('Erro!')
        }
    }

    return (
        <div className='login'>
            <button onClick={facebookLogin}>Logar com o Facebook</button>
            <button onClick={googleLogin} >Logar com o Google</button>
        </div>
    )
}