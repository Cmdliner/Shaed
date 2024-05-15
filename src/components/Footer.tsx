const Footer = () => {
    return (
        <footer className="bg-black text-white text-center p-4">
            <h1 className="text-xl md:text-3xl"> <span>&copy;</span> Shaed {new Date().getFullYear()} | All rights reserved</h1>
            <p className="font-extralight">Developed by Adeyemi Abiade</p>
        </footer>
    );
}

export default Footer;