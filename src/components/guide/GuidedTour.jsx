import React from 'react';
//import Tour from 'reactour';

const GuidedTour = ({ steps ,open=false}) => {
  //   const {palette} = useTheme()

  // const [isTourOpen, setIsTourOpen] = useState(open);

  // const closeTour = () => {
  //   localStorage.setItem('tourOpen',false)
  //   console.log("request------closed called---->")
  //   setIsTourOpen(false);
  // };

  // const customStyles = {
  //   content: {
  //     borderRadius: '8px',
  //     padding: '20px',
  //     backgroundColor: palette.background.default,
  //     color:palette.text.primary,
  //     boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  //     fontSize: '16px',
  //     maxWidth: '400px',
  //   },
  // };

  return (
    <div>
      {/* <Button onClick={() => setIsTourOpen(true)}>Start Tour</Button> */}
      {/* <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={closeTour}
        styles={customStyles}
      /> */}
    </div>
  );
};

export default GuidedTour;
