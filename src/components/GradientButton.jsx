import { Button } from '@mui/material';
import { IoDiamondOutline } from 'react-icons/io5';
import { useTheme } from '../styles/theme';
import buttonGif from './Button/button.gif'; // Import the GIF

const GradientButton = () => {
  const { mode } = useTheme();
  const textColor = mode === 'dark' ? 'white' : 'gray';

  return (
    <div className="button-container rounded-lg">
{/* 
      <Button
        onClick={() => {
          window.open('https://store.clikkle.com/subscription/esign/purchase', '_blank');
        }}
        variant="outlined"
        sx={{
          height: '32px',
          width: '125px',
          display: 'flex',
          alignItems: 'center',
          padding: '8px 14px',
          borderRadius: '8px',
          background: 'white',
          transition: 'background 0.5s, transform 0.3s',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            background: 'white',
            transform: 'scale(1.05)',
          },
        }}
      >
         <div className="sparkle-container">
          <IoDiamondOutline
            style={{
              fontSize: '12px',
              marginRight: '8px',
              transition: 'transform 0.6s',
              position: 'relative',
            }}
            className="diamond-icon"
          />
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
        </div> 

        <img
          src={buttonGif}
          alt="Upgrade Button"
          style={{
            height: '30px',
            width: '95px',
          }}
        />
      </Button> 
      
      */}
<Button
        onClick={() => {
          window.open('https://store.clikkle.com/subscription/campaigns/purchase', '_blank');
        }}
                    style={{
                        borderRadius: '8px',
                        // marginRight: '10px',
                        width:"135px"
                    }}
                    >
                        <img src={buttonGif} alt="upgradeimg" width={120} height={35}  />
                    </Button>

    </div>
  );
};

export default GradientButton;
