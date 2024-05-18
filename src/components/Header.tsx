const Header = () => {
    return (
        <header className="flex justify-between items-center w-full px-[1rem] p-6  border-b border-slate-500 bg-black text-white">
            <a href="/">
                <h1 className="text-2xl font-bold">Shaed</h1>
            </a>
            <ul className="flex gap-2 font-light text-[1rem]">
                <li> <a href="/signup">Sign Up</a></li>
                <li> <a href="/chat">Chat</a></li>
            </ul>
        </header>

    );
}

export default Header;