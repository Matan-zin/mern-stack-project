import projector from '../assets/Projector.svg'
import '../styles/welcome.css';
export default function Welcome({ username }) {
    return <div className="welcome-page-wrraper film-bg">
           <h1>Welcome { username } </h1>
           <img src={projector} alt="projector" />
           </div>
}