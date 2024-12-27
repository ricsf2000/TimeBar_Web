import './progressBars.css';

const ProgressBars = (props) => {
  const { bgcolor, completed, breakPeriods } = props;

  const containerStyles = {
    position: "relative",
    height: "100%",
    width: "100%",
    borderRadius: "1px",
  };

  const progressStyle = {
    width: `${completed}%`,
    height: "100%",
    borderRadius: "1px",
    backgroundColor: bgcolor,
    textAlign: "right",
    transition: "all 0.3s ease-in-out",  // Smoother transition
  };

  const breakStyle = {
    position: "absolute",
    height: "100%",
    backgroundColor: "#00508d",
    top: 0,
    transition: "all 0.3s ease-in-out",  // Add transition to break segments
  };

  return (
    <div className="container">
      <div style={containerStyles}>
        {/* Base progress bar */}
        <div style={progressStyle}>
          <span className="progressBar"></span>
        </div>
        
        {/* Break periods overlay */}
        {breakPeriods?.map((period, index) => (
          <div
            key={index}
            style={{
              ...breakStyle,
              left: `${period.start}%`,
              width: `${period.duration}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBars;