import image from "../../assets/images/Logo.png";

console.log(image);

const NavLogo = () => (
  <div className="p-4 flex justify-center">
    <img
      src={`${image}`}
      alt="Logo"
      className="w-auto"
    />
  </div>
);

export default NavLogo;


