import React, { useEffect, useRef } from 'react';

import { NAMESPACE } from './constants';
import withScript from './hooks/withScripts';
import { killProcess, startDetecting } from './luna';
import { ReactLunaPassProps } from './types';

const ReactLunaPass = ({ closeBtnTitle = "close", ...props }: ReactLunaPassProps) => {
    const rootNode = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (rootNode.current) {
            startDetecting({
                rootNode: rootNode.current,
                ...props,
            });
        }
    }, [rootNode]);

    function stopDetecting() {
        killProcess().then(props.onClose)
    }

    return (
        <div className={`${NAMESPACE}__luna`}>
            <div className={`${NAMESPACE}__luna--content`}>
                <div ref={rootNode} />
                <button className={`${NAMESPACE}__luna--close-button`} onClick={stopDetecting}>
                    {closeBtnTitle}
                </button>
            </div>
        </div>
    );
};

export default withScript(ReactLunaPass);
