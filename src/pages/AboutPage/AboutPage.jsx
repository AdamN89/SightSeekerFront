import './AboutPage.css';
import TopMenu from '../../components/TopMenu/TopMenu';
import ButtonHallow from '../../components/ButtonHallow';
import LogoVertical from '../../components/LogoVertical';
import { useNavigate } from 'react-router';
import CloseIcon from '../../components/CloseIcon';

export default function About() {
  const navigate = useNavigate();

  const handleCloseAbout = () => {
    navigate('/home');
  };

  return (
    <>
      <button className='about_page_close_btn'>
        <CloseIcon func={handleCloseAbout} />
      </button>
      <div className='about_page'>
        {/* <TopMenu /> */}
        <div className='credits'>
          <LogoVertical />
          <div>
            <p>authors</p>
            <h2>Stephan Ullmann</h2>
            <h2>Puritama Toro Benavides</h2>
            <h2>Adam Nagy</h2>
            <h2>Miroslav Ljubičić</h2>
          </div>
          <div>
            <p>tech stack</p>
            <h2>react</h2>
            <h2>express</h2>
            <h2>node.js</h2>
            <h2>mongo db</h2>
            <h2>css3</h2>
          </div>
          <div>
            <p>final project</p>
            <h2>full-stack developer</h2>
            <h2>wbs coding school</h2>
            <h2>#WD 038</h2>
          </div>
          <div>
            <p>thanks to</p>
            <h2>
              Reagan Sasan<p>best instructor</p>
            </h2>
            <h2>mapbox</h2>
            <h2>open street map</h2>
          </div>
          <div>
            <h3>THE END</h3>
            <ButtonHallow
              txt={'go back'}
              func={() => navigate('/home')}
              key='signup'
            />
          </div>
        </div>
      </div>
    </>
  );
}
