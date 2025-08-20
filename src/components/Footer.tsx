const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} Prosongo. All rights reserved.</p>
        <p className="text-sm">Research for Change | Data for Development</p>
      </div>
    </footer>
  );
};

export default Footer;
