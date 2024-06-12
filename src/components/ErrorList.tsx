import { FC } from "react";
import { IErrorList } from "../interfaces/ErrorMssg";
import ErrorInfo from "./ErrorInfo";

const ErrorList: FC<IErrorList> = ({ errors }) => {

    return (
        <div>
            {errors.map((error: string, index: number) => (
                <ErrorInfo key={index} error={error} />
            ))}
        </div>
    );
}

export default ErrorList;