import { IPageProps } from "../interfaces/PageProp";

const Room: React.FC<IPageProps> = ({socket}) => {

    return (
        <div>
            <h1>Room</h1>
            <div>
                {socket ? <h2>Connected to room </h2> : <h2>Waiting to connect</h2>}
            </div>
        </div>
    );
}

export default Room;