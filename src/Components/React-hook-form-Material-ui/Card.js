import { Button, Typography } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const FirstCard = (props) => {
    const { titleVariant, titleColor, titleText, description, isButton, buttonText, linkTo, linkData, children } = props
    return (
        <div style={{ boxShadow: '2px 2px 10px black', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <Typography variant={titleVariant} color={titleColor}>{titleText}</Typography>
                <Link to={`/${linkTo}`}><Typography>{linkData}</Typography></Link>
            </div>
            <Typography style={{ margin: '30px 0px 70px 0px' }} variant="body2">{description}</Typography>
            {
                isButton && <Button
                    color="primary"
                    style={{ textAlign: 'center' }}
                    startIcon={
                        <AddCircle />
                    }
                    variant="outlined"
                >{buttonText}</Button>
            }
            {children}
        </div>
    )
}
export default FirstCard;