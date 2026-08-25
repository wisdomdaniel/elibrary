import unibenLogoImg from '../assets/uniben_logo.png';

export const UNIBENLogo = ({ className = "h-10 w-10" }) => (
  <img
    src={unibenLogoImg}
    alt="UNIBEN Seal Logo"
    className={`${className} object-contain`}
  />
);
