import { BaseButton, Inverted, GoogleSignIn } from './button.styles'

export const BUTTON_TYPE_CLASSES = {
  baseButton: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.baseButton) =>{
  return {
    [BUTTON_TYPE_CLASSES.baseButton] : BaseButton,
    [BUTTON_TYPE_CLASSES.google] : GoogleSignIn,
    [BUTTON_TYPE_CLASSES.inverted]: Inverted
  }[buttonType]
}

const Button = ({ children, buttonType, ...otherProps }) => {

  const ButtonType = getButton(buttonType)
  
  return (
    <ButtonType
      {...otherProps}
    >
      {children}
    </ButtonType>
  );
};

export default Button