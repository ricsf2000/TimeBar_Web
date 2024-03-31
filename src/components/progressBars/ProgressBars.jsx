import './progressBars.css';

const ProgressBars = (props) => {
  const { bgcolor, completed } = props;

  const progressStyle = {
    width: `${completed}%`,
    height: "100%",
    borderRadius: "1px",
    backgroundColor: bgcolor,
    textAlign: "right",
    transition: "width 1s ease-in-out",
  }
  return (
    <div className="container">
      <div style={progressStyle}>
        <span className='progressBar' ></span>
      </div>
    </div>
  );
};

export default ProgressBars