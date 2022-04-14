import Design from "../Design/index";
import Interaction from "../Interaction";
import './Content.css';

const Content = () => {
  return (
    <div className='main-content-holder'>
      <div className='main-content'>
      <Design />
      <Interaction />
      </div>
    </div>
  );
};

export default Content;
