import "./Design.css";
import '../Content/Content.css';

const Design = () => {
  return (
    <div>
      <h1 className="section-title" id="design-title">
        Design
      </h1>
      <div className="design-content group33">
        <div className="design-picture"></div>
        <div className="design-text">
          <div className="design-text-content">
            <p className='section-title' id='design-big-text'>Lorem ipsum dolor sit amet consectetur.</p>
            <p id='design-small-text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam ut
            venenatis tellus in metus vulputate. Urna nec tincidunt praesent
            semper feugiat nibh sed pulvinar.
            </p>
            <button className='design-button'>This is a Button</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;
