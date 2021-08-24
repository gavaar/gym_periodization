import { BlocksContextProvider } from "home/blocks/blocks.context";
import React, { Dispatch, useContext, useEffect, useState } from "react";

function useSelectedBlockId(blocks: { id: number }[]) {
    const [selectedBlock, setSelectedBlock] = useState<number>();
    
    useEffect(() => {
        if (blocks.length) {
            const selectedBlockId = blocks[blocks.length - 1]?.id;
            setSelectedBlock(selectedBlockId);
        }
    }, [blocks]);

    return [selectedBlock, setSelectedBlock] as [number, Dispatch<number>];
}

export const SelectedBlockProvider = React.createContext<[number, Dispatch<number>]>([-1, () => {}]);
export function SelectedBlock({ children }: JSX.ElementChildrenAttribute): JSX.Element {
    const blocks = useContext(BlocksContextProvider);
    const [selectedBlock, setSelectedBlock] = useSelectedBlockId(blocks);

    return (
        <SelectedBlockProvider.Provider value={[selectedBlock, setSelectedBlock]}>
            {children}
        </SelectedBlockProvider.Provider>
    );
}