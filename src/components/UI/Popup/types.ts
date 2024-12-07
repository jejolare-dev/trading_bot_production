import { FC } from "react";

interface PopupProps<T extends {} = {}> {
    Content: FC<{ close: () => void } & T>;
    settings: T;
    close: () => void;
    scroll?: boolean;
    blur?: boolean;
    noPointer?: boolean;
    classList?: string[];
}

export default PopupProps;