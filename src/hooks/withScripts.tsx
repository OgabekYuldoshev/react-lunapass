import React from 'react';

import Loading from '../components/Loading';
import { LUNA_PASS_RENDER_SCRIPT_URL, LUNA_PASS_SCRIPT_URL } from '../constants';
import { useScript } from '../hooks';
import { ReactLunaPassProps } from '../types';

const withScript = (Component: React.ComponentType<ReactLunaPassProps>) => {
    return (props: ReactLunaPassProps) => {
        const lunaStatus = useScript(LUNA_PASS_SCRIPT_URL);
        const lunaRenderStatus = useScript(LUNA_PASS_RENDER_SCRIPT_URL);

        if (lunaStatus === 'loading' || lunaRenderStatus === 'loading') {
            return <Loading />;
        }

        return <Component {...props} />;
    };
};

export default withScript;
